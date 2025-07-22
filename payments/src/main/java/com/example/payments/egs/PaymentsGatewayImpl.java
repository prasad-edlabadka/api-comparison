package com.example.payments.egs;

import com.example.payments.model.PaymentsRequest;
import com.example.payments.model.PaymentsResponse;
import com.example.payments.ebs.PaymentsBusiness;

public class PaymentsGatewayImpl implements PaymentsGateway {
    private final PaymentsBusiness business;

    public PaymentsGatewayImpl(PaymentsBusiness business) {
        this.business = business;
    }

    @Override
    public PaymentsResponse processRequest(PaymentsRequest request) {
        // Validate and transform request (simplified)
        if (request == null || request.getFromAccountId() == null || request.getToAccountId() == null) {
            throw new IllegalArgumentException("Invalid request");
        }
        // Call Business layer
        return business.processPayment(request);
    }
} 