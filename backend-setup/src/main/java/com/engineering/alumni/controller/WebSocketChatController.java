package com.engineering.alumni.controller;
import com.engineering.alumni.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.util.Map;

@Controller
public class WebSocketChatController {
    private final SimpMessagingTemplate template;
    private final ChatService chatService;
    public WebSocketChatController(SimpMessagingTemplate template, ChatService chatService) {
        this.template = template; this.chatService = chatService;
    }
    @MessageMapping("/chat.send")
    public void sendMessage(@Payload Map<String, String> payload) {
        var msg = chatService.save(payload.get("senderEmail"), payload.get("senderName"), payload.get("receiverEmail"), payload.get("content"));
        template.convertAndSendToUser(payload.get("receiverEmail"), "/queue/messages", msg);
        template.convertAndSendToUser(payload.get("senderEmail"), "/queue/messages", msg);
    }
}