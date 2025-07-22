package com.example.cardcontrol.ebs;

import com.example.cardcontrol.model.CardControlSwitchesRequest;
import com.example.cardcontrol.model.CardControlSwitchesResponse;

public class CardControlSwitchesBusinessImpl implements CardControlSwitchesBusiness {
    @Override
    public CardControlSwitchesResponse updateSwitches(CardControlSwitchesRequest request) {
        // Simulate business logic and backend call
        CardControlSwitchesResponse response = new CardControlSwitchesResponse();
        response.setStatus("SUCCESS");
        response.setMessage("Switch updated: " + request.getSwitchType() + " set to " + request.isEnabled());
        return response;
    }
} 