package com.example.transaction.model;

import java.util.List;

public class TransactionHistoryResponse {
    private List<Transaction> transactions;

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
} 