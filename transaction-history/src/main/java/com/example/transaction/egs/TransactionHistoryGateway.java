package com.example.transaction.egs;

import com.example.transaction.model.TransactionHistoryRequest;
import com.example.transaction.model.TransactionHistoryResponse;

public interface TransactionHistoryGateway {
    TransactionHistoryResponse processRequest(TransactionHistoryRequest request);
} 