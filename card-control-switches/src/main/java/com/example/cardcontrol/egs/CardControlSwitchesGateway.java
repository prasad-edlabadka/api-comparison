package com.example.cardcontrol.egs;

import com.example.cardcontrol.model.CardControlSwitchesRequest;
import com.example.cardcontrol.model.CardControlSwitchesResponse;

public interface CardControlSwitchesGateway {
    CardControlSwitchesResponse processRequest(CardControlSwitchesRequest request);
} 