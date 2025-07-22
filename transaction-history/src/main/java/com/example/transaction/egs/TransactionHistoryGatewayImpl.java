package com.example.transaction.egs;

import com.example.transaction.model.TransactionHistoryRequest;
import com.example.transaction.model.TransactionHistoryResponse;
import com.example.transaction.ebs.TransactionHistoryBusiness;

public class TransactionHistoryGatewayImpl implements TransactionHistoryGateway {
    private final TransactionHistoryBusiness business;

    public TransactionHistoryGatewayImpl(TransactionHistoryBusiness business) {
        this.business = business;
    }

    @Override
    public TransactionHistoryResponse processRequest(TransactionHistoryRequest request) {
        // Validate and transform request (simplified)
        if (request == null || request.getAccountId() == null) {
            throw new IllegalArgumentException("Invalid request");
        }
        // Call Business layer
        return business.getHistory(request);
    }
} 