package com.example.account.egs;

import com.example.account.model.AccountInformationRequest;
import com.example.account.model.AccountInformationResponse;

public interface AccountInformationGateway {
    AccountInformationResponse processRequest(AccountInformationRequest request);
} 