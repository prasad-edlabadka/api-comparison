package com.example.payments.ebs;

import com.example.payments.model.PaymentsRequest;
import com.example.payments.model.PaymentsResponse;
import java.util.UUID;

public class PaymentsBusinessImpl implements PaymentsBusiness {
    @Override
    public PaymentsResponse processPayment(PaymentsRequest request) {
        // Simulate business logic and backend call
        PaymentsResponse response = new PaymentsResponse();
        response.setTransactionId(UUID.randomUUID().toString());
        response.setStatus("SUCCESS");
        response.setMessage("Payment processed successfully");
        return response;
    }
} 