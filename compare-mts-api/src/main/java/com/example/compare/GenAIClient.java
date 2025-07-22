package com.example.compare;

import okhttp3.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.concurrent.TimeUnit;

public class GenAIClient {
    private static final String ENDPOINT = "http://localhost:1234/v1/chat/completions";
    private static final OkHttpClient client = new OkHttpClient.Builder()
            .readTimeout(5, TimeUnit.MINUTES)
            .build();
    private static final ObjectMapper mapper = new ObjectMapper();

    public static String buildPrompt(String interfaceSource, String oasYaml) {
        return "Given this Java interface signature:\n" + interfaceSource +
                "\nAnd this OpenAPI YAML:\n" + oasYaml +
                "\nOn a scale of 0 to 100, how closely does the OAS spec match the Java interface? " +
                "Reply with a JSON object: { score: <number>, explanation: <string> }";
    }

    public static GenAIResult compare(String interfaceSource, String oasYaml) throws Exception {
        String prompt = buildPrompt(interfaceSource, oasYaml);
        String requestBody = "{\"model\":\"default\",\"messages\":[{\"role\":\"user\",\"content\":\"" +
                prompt.replace("\"", "\\\"").replace("\n", "\\n") + "\"}]}";
        Request request = new Request.Builder()
                .url(ENDPOINT)
                .post(RequestBody.create(requestBody, MediaType.parse("application/json")))
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new RuntimeException("GenAI call failed: " + response);
            String resp = response.body().string();
            JsonNode root = mapper.readTree(resp);
            String content = root.at("/choices/0/message/content").asText();
            JsonNode result = mapper.readTree(content);
            int score = result.get("score").asInt();
            String explanation = result.get("explanation").asText();
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