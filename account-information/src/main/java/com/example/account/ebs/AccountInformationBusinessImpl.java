package com.example.account.ebs;

import com.example.account.model.AccountInformationRequest;
import com.example.account.model.AccountInformationResponse;

public class AccountInformationBusinessImpl implements AccountInformationBusiness {
    @Override
    public AccountInformationResponse getAccountInformation(AccountInformationRequest request) {
        // Simulate business logic and backend call
        AccountInformationResponse response = new AccountInformationResponse();
        response.setAccountId(request.getAccountId());
        response.setAccountName("Sample Account");
        response.setBalance(1000.0);
        return response;
    }
} 