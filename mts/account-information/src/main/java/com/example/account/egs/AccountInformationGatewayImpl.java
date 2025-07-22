package com.example.account.egs;

import com.example.account.model.AccountInformationRequest;
import com.example.account.model.AccountInformationResponse;
import com.example.account.ebs.AccountInformationBusiness;

public class AccountInformationGatewayImpl implements AccountInformationGateway {
    private final AccountInformationBusiness business;

    public AccountInformationGatewayImpl(AccountInformationBusiness business) {
        this.business = business;
    }

    @Override
    public AccountInformationResponse processRequest(AccountInformationRequest request) {
        // Validate and transform request (simplified)
        if (request == null || request.getAccountId() == null) {
            throw new IllegalArgumentException("Invalid request");
        }
        // Call Business layer
        return business.getAccountInformation(request);
    }
} 