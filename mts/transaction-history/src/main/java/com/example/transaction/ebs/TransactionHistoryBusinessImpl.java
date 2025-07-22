package com.example.transaction.ebs;

import com.example.transaction.model.TransactionHistoryRequest;
import com.example.transaction.model.TransactionHistoryResponse;
import com.example.transaction.model.Transaction;
import java.util.ArrayList;
import java.util.List;

public class TransactionHistoryBusinessImpl implements TransactionHistoryBusiness {
    @Override
    public TransactionHistoryResponse getHistory(TransactionHistoryRequest request) {
        // Simulate business logic and backend call
        List<Transaction> transactions = new ArrayList<>();
        Transaction txn = new Transaction();
        txn.setTransactionId("TXN123");
        txn.setDate("2024-01-01");
        txn.setAmount(100.0);
        txn.setType("DEBIT");
        txn.setDescription("Sample transaction");
        transactions.add(txn);
        TransactionHistoryResponse response = new TransactionHistoryResponse();
        response.setTransactions(transactions);
        return response;
    }
} 