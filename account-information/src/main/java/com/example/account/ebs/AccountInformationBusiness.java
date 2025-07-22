package com.example.account.ebs;

import com.example.account.model.AccountInformationRequest;
import com.example.account.model.AccountInformationResponse;

public interface AccountInformationBusiness {
    AccountInformationResponse getAccountInformation(AccountInformationRequest request);
} 