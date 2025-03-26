package com.education.transit.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendVehiculoUpdate(Object vehiculo) {
        messagingTemplate.convertAndSend("/topic/vehiculos", vehiculo);
    }

    public void sendPropietarioUpdate(Object propietario) {
        messagingTemplate.convertAndSend("/topic/propietarios", propietario);
    }

    public void sendInfraccionUpdate(Object infraccion) {
        messagingTemplate.convertAndSend("/topic/infracciones", infraccion);
    }
}

