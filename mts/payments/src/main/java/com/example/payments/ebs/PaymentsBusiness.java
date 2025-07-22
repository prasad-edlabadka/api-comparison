package com.example.payments.ebs;

import com.example.payments.model.PaymentsRequest;
import com.example.payments.model.PaymentsResponse;

public interface PaymentsBusiness {
    PaymentsResponse processPayment(PaymentsRequest request);
} 