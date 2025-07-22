package com.example.cardcontrol.egs;

import com.example.cardcontrol.model.CardControlSwitchesRequest;
import com.example.cardcontrol.model.CardControlSwitchesResponse;
import com.example.cardcontrol.ebs.CardControlSwitchesBusiness;

public class CardControlSwitchesGatewayImpl implements CardControlSwitchesGateway {
    private final CardControlSwitchesBusiness business;

    public CardControlSwitchesGatewayImpl(CardControlSwitchesBusiness business) {
        this.business = business;
    }

    @Override
    public CardControlSwitchesResponse processRequest(CardControlSwitchesRequest request) {
        // Validate and transform request (simplified)
        if (request == null || request.getCardNumber() == null || request.getSwitchType() == null) {
            throw new IllegalArgumentException("Invalid request");
        }
        // Call Business layer
        return business.updateSwitches(request);
    }
} 