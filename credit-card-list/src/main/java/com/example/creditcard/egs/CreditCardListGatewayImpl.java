package com.example.creditcard.egs;

import com.example.creditcard.model.CreditCardListRequest;
import com.example.creditcard.model.CreditCardListResponse;
import com.example.creditcard.ebs.CreditCardListBusiness;

public class CreditCardListGatewayImpl implements CreditCardListGateway {
    private final CreditCardListBusiness business;

    public CreditCardListGatewayImpl(CreditCardListBusiness business) {
        this.business = business;
    }

    @Override
    public CreditCardListResponse processRequest(CreditCardListRequest request) {
        // Validate and transform request (simplified)
        if (request == null || request.getCustomerId() == null) {
            throw new IllegalArgumentException("Invalid request");
        }
        // Call Business layer
        return business.getCreditCards(request);
    }
} 