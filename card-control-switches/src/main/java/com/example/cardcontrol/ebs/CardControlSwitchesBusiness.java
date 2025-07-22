package com.example.cardcontrol.ebs;

import com.example.cardcontrol.model.CardControlSwitchesRequest;
import com.example.cardcontrol.model.CardControlSwitchesResponse;

public interface CardControlSwitchesBusiness {
    CardControlSwitchesResponse updateSwitches(CardControlSwitchesRequest request);
} 