package com.example.compare;

import okhttp3.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.concurrent.TimeUnit;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GenAIClient {
    private static final String ENDPOINT = "http://localhost:1234/v1/chat/completions";
    private static final OkHttpClient client = new OkHttpClient.Builder()
            .readTimeout(5, TimeUnit.MINUTES)
            .build();
    private static final ObjectMapper mapper = new ObjectMapper();

    public static String buildPrompt(String interfaceSource, String oasYaml) {
        return "You are an expert API matcher. Your ONLY output must be a single valid JSON object, no markdown, no verbose explanation, no preamble, no tags, no <think> or <json> or anything else. " +
                "Given this Java interface signature:\n" + interfaceSource +
                "\nAnd this OpenAPI YAML:\n" + oasYaml +
                "\nOn a scale of 0 to 100, how closely does the OAS spec match the Java interface? " +
                "Output a JSON object: { \"score\": <number>, \"explanation\": <string> } and nothing else. The explanation must be concise and direct, no more than one or two sentences.";
    }

    private static String extractFirstJson(String text) {
        // Only match JSON objects that contain at least one colon (key:value)
        Pattern pattern = Pattern.compile("\\{[^{}:]*:[^{}]*\\}");
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group();
        }
        System.err.println("[ERROR] No valid JSON object found in model output. Raw output: " + text);
        throw new RuntimeException("No valid JSON object found in model output");
    }

    public static GenAIResult compare(String interfaceSource, String oasYaml) throws Exception {
        String prompt = buildPrompt(interfaceSource, oasYaml);
        System.out.println("[GenAI] Prompt:\n" + prompt.substring(0, Math.min(prompt.length(), 1000)) + (prompt.length() > 1000 ? "... [truncated]" : ""));
        // Only send the current prompt as a single user message, no prior context or system message
        String requestBody = "{\"model\":\"mistralai/codestral-22b-v0.1\",\"stream\":false,\"messages\":[{\"role\":\"user\",\"content\":\""
                + prompt.replace("\"", "\\\"").replace("\n", "\\n") + "\"}]}";
        System.out.println("[GenAI] Sending request to " + ENDPOINT);
        Request request = new Request.Builder()
                .url(ENDPOINT)
                .post(RequestBody.create(requestBody, MediaType.parse("application/json")))
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new RuntimeException("GenAI call failed: " + response);
            String body = response.body().string();
            System.out.println("[GenAI] Full response: " + body.substring(0, Math.min(body.length(), 500)) + (body.length() > 500 ? "... [truncated]" : ""));
            JsonNode node = mapper.readTree(body);
            String content = node.at("/choices/0/message/content").asText("");
            String json = extractFirstJson(content);
            JsonNode result = mapper.readTree(json);
            int score = result.get("score").asInt();
            String explanation = result.get("explanation").asText();
            System.out.println("[GenAI] Parsed score: " + score + ", explanation: " + explanation.substring(0, Math.min(explanation.length(), 200)) + (explanation.length() > 200 ? "... [truncated]" : ""));
            return new GenAIResult(score, explanation);
        }
    }

    public static class GenAIResult {
        public int score;
        public String explanation;
        public GenAIResult(int score, String explanation) {
            this.score = score;
            this.explanation = explanation;
        }
    }
} 