package com.example.creditcard.ebs;

import com.example.creditcard.model.CreditCardListRequest;
import com.example.creditcard.model.CreditCardListResponse;
import com.example.creditcard.model.CreditCard;
import java.util.ArrayList;
import java.util.List;

public class CreditCardListBusinessImpl implements CreditCardListBusiness {
    @Override
    public CreditCardListResponse getCreditCards(CreditCardListRequest request) {
        // Simulate business logic and backend call
        List<CreditCard> cards = new ArrayList<>();
        CreditCard card = new CreditCard();
        card.setCardNumber("4111111111111111");
        card.setCardType("VISA");
        card.setExpiryDate("12/30");
        cards.add(card);
        CreditCardListResponse response = new CreditCardListResponse();
        response.setCards(cards);
        return response;
    }
} 