package com.example.compare;

public class ServiceGatewaySignature {
    public String serviceName;
    public String interfaceName;
    public String methodSignature;
    public String fullSource;

    public ServiceGatewaySignature(String serviceName, String interfaceName, String methodSignature, String fullSource) {
        this.serviceName = serviceName;
        this.interfaceName = interfaceName;
        this.methodSignature = methodSignature;
        this.fullSource = fullSource;
    }
} 