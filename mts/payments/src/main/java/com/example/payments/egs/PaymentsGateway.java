package com.example.payments.egs;

import com.example.payments.model.PaymentsRequest;
import com.example.payments.model.PaymentsResponse;

public interface PaymentsGateway {
    PaymentsResponse processRequest(PaymentsRequest request);
} 