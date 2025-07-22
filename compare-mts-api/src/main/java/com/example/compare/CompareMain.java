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
    private static final String OAS_DIR = "oas";

    public static void main(String[] args) throws Exception {
        System.out.println("Starting MTS API comparison...");
        List<ServiceGatewaySignature> gateways = new ArrayList<>();
        for (String[] svc : SERVICES) {
            String service = svc[0];
            String ifacePath = svc[0] + "/src/main/java/" + svc[1];
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
            int bestScore = -1;
            String bestOas = null;
            String bestExplanation = null;
            List<Map<String,Object>> allResults = new ArrayList<>();
            for (OasSpec oas : oasSpecs) {
                GenAIClient.GenAIResult result = GenAIClient.compare(gw.fullSource, oas.yamlContent);
                Map<String,Object> r = new HashMap<>();
                r.put("oasFile", oas.filename);
                r.put("score", result.score);
                r.put("explanation", result.explanation);
                allResults.add(r);
                if (result.score > bestScore) {
                    bestScore = result.score;
                    bestOas = oas.filename;
                    bestExplanation = result.explanation;
                }
            }
            Map<String,Object> doc = new HashMap<>();
            doc.put("service", gw.serviceName);
            doc.put("interfaceName", gw.interfaceName);
            doc.put("methodSignature", gw.methodSignature);
            doc.put("bestOasFile", bestOas);
            doc.put("bestScore", bestScore);
            doc.put("bestExplanation", bestExplanation);
            doc.put("allComparisons", allResults);
            writer.writeResult(doc);
            System.out.println("Compared " + gw.serviceName + ": best match is " + bestOas + " (score=" + bestScore + ")");
        }
        System.out.println("Done.");
    }
} 