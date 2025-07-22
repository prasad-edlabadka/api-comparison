package com.example.compare;

import java.io.File;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;

public class CompareMain {
    private static final String[][] SERVICES = {
        {"account-information", "com/example/account/egs/AccountInformationGateway.java"},
        {"payments", "com/example/payments/egs/PaymentsGateway.java"},
        {"credit-card-list", "com/example/creditcard/egs/CreditCardListGateway.java"},
        {"card-control-switches", "com/example/cardcontrol/egs/CardControlSwitchesGateway.java"},
        {"transaction-history", "com/example/transaction/egs/TransactionHistoryGateway.java"}
    };
    private static final String OAS_DIR = "../oas";

    private static String classifyMatch(int score) {
        if (score >= 90) return "fully matched";
        if (score >= 30) return "partial match";
        return "no match";
    }

    public static void main(String[] args) throws Exception {
        System.out.println("Starting MTS API comparison...");
        List<ServiceGatewaySignature> gateways = new ArrayList<>();
        for (String[] svc : SERVICES) {
            String service = svc[0];
            String ifacePath = "../" + svc[0] + "/src/main/java/" + svc[1];
            String src = Files.readString(new File(ifacePath).toPath());
            String methodSig = src.lines().filter(l -> l.trim().endsWith(")") && l.contains("(")).findFirst().orElse("");
            String ifaceName = svc[1].substring(svc[1].lastIndexOf("/")+1, svc[1].length()-5);
            gateways.add(new ServiceGatewaySignature(service, ifaceName, methodSig, src));
        }
        List<OasSpec> oasSpecs = Files.list(new File(OAS_DIR).toPath())
                .filter(f -> f.toString().endsWith(".yaml"))
                .map(f -> {
                    try { return new OasSpec(f.getFileName().toString(), Files.readString(f)); } catch (Exception e) { throw new RuntimeException(e); }
                })
                .collect(Collectors.toList());
        MongoResultWriter writer = new MongoResultWriter();
        for (ServiceGatewaySignature gw : gateways) {
            for (OasSpec oas : oasSpecs) {
                Map<String,Object> doc = new HashMap<>();
                doc.put("javaClassFilename", gw.serviceName + "/src/main/java/" + gw.serviceName.replace("-","") + "/egs/" + gw.interfaceName + ".java");
                doc.put("javaInterfaceName", gw.interfaceName);
                doc.put("javaClassSummary", gw.fullSource.substring(0, Math.min(gw.fullSource.length(), 200)));
                doc.put("oasFilename", oas.filename);
                doc.put("oasSummary", oas.yamlContent.substring(0, Math.min(oas.yamlContent.length(), 200)));
                try {
                    GenAIClient.GenAIResult result = GenAIClient.compare(gw.fullSource, oas.yamlContent);
                    doc.put("matchClassification", classifyMatch(result.score));
                    doc.put("matchPercentage", result.score);
                    doc.put("explanation", result.explanation);
                    System.out.println("Compared " + gw.interfaceName + " vs " + oas.filename + ": " + result.score + "% (" + classifyMatch(result.score) + ")");
                } catch (Exception e) {
                    doc.put("matchClassification", "error");
                    doc.put("matchPercentage", 0);
                    doc.put("explanation", "Error: " + e.getMessage());
                    System.err.println("[ERROR] Failed to compare " + gw.interfaceName + " vs " + oas.filename + ": " + e.getMessage());
                }
                writer.writeResult(doc);
            }
        }
        System.out.println("Done.");
    }
} 