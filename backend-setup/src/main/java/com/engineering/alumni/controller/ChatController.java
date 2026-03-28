package com.engineering.alumni.controller;
import com.engineering.alumni.dto.ApiResponse;
import com.engineering.alumni.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService service;
    public ChatController(ChatService service) { this.service = service; }

    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody Map<String, String> body) {
        var msg = service.save(body.get("senderEmail"), body.get("senderName"), body.get("receiverEmail"), body.get("content"));
        return ResponseEntity.ok(ApiResponse.success("Sent", msg));
    }

    @GetMapping("/conversation")
    public ResponseEntity<?> conversation(@RequestParam String user1, @RequestParam String user2) {
        return ResponseEntity.ok(ApiResponse.success("Messages", service.getConversation(user1, user2)));
    }

    @GetMapping("/partners/{email}")
    public ResponseEntity<?> partners(@PathVariable String email) {
        return ResponseEntity.ok(ApiResponse.success("Partners", service.getChatPartners(email)));
    }

    @PutMapping("/read")
    public ResponseEntity<?> markRead(@RequestBody Map<String, String> body) {
        service.markRead(body.get("senderEmail"), body.get("receiverEmail"));
        return ResponseEntity.ok(ApiResponse.success("Marked read"));
    }
}