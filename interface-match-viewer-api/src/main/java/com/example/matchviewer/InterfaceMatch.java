package com.example.matchviewer;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "results")
public class InterfaceMatch {
    @Id
    private String id;
    private String javaClassFilename;
    private String javaInterfaceName;
    private String javaClassSummary;
    private String oasFilename;
    private String oasSummary;
    private String matchClassification;
    private int matchPercentage;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getJavaClassFilename() { return javaClassFilename; }
    public void setJavaClassFilename(String javaClassFilename) { this.javaClassFilename = javaClassFilename; }
    public String getJavaInterfaceName() { return javaInterfaceName; }
    public void setJavaInterfaceName(String javaInterfaceName) { this.javaInterfaceName = javaInterfaceName; }
    public String getJavaClassSummary() { return javaClassSummary; }
    public void setJavaClassSummary(String javaClassSummary) { this.javaClassSummary = javaClassSummary; }
    public String getOasFilename() { return oasFilename; }
    public void setOasFilename(String oasFilename) { this.oasFilename = oasFilename; }
    public String getOasSummary() { return oasSummary; }
    public void setOasSummary(String oasSummary) { this.oasSummary = oasSummary; }
    public String getMatchClassification() { return matchClassification; }
    public void setMatchClassification(String matchClassification) { this.matchClassification = matchClassification; }
    public int getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(int matchPercentage) { this.matchPercentage = matchPercentage; }
} 