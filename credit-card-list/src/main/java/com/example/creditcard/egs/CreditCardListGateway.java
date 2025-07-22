package com.example.creditcard.egs;

import com.example.creditcard.model.CreditCardListRequest;
import com.example.creditcard.model.CreditCardListResponse;

public interface CreditCardListGateway {
    CreditCardListResponse processRequest(CreditCardListRequest request);
} 