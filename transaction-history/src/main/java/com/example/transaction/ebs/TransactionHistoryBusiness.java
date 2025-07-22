package com.example.transaction.ebs;

import com.example.transaction.model.TransactionHistoryRequest;
import com.example.transaction.model.TransactionHistoryResponse;

public interface TransactionHistoryBusiness {
    TransactionHistoryResponse getHistory(TransactionHistoryRequest request);
} 