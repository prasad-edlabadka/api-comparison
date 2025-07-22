package com.example.creditcard.ebs;

import com.example.creditcard.model.CreditCardListRequest;
import com.example.creditcard.model.CreditCardListResponse;

public interface CreditCardListBusiness {
    CreditCardListResponse getCreditCards(CreditCardListRequest request);
} 