package com.engineering.alumni.service;
import com.engineering.alumni.entity.ChatMessage;
import com.engineering.alumni.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatService {
    private final ChatMessageRepository repo;
    public ChatService(ChatMessageRepository repo) { this.repo = repo; }
    public ChatMessage save(String senderEmail, String senderName, String receiverEmail, String content) {
        var msg = new ChatMessage();
        msg.setSenderEmail(senderEmail);
        msg.setSenderName(senderName);
        msg.setReceiverEmail(receiverEmail);
        msg.setContent(content);
        return repo.save(msg);
    }
    public List<ChatMessage> getConversation(String a, String b) { return repo.findConversation(a, b); }
    public List<String> getChatPartners(String email) { return repo.findChatPartners(email); }
    public void markRead(String senderEmail, String receiverEmail) {
        repo.findConversation(senderEmail, receiverEmail).stream()
            .filter(m -> m.getReceiverEmail().equals(receiverEmail) && !m.isRead())
            .forEach(m -> { m.setRead(true); repo.save(m); });
    }
    public long getUnreadCount(String sender, String receiver) {
        return repo.countBySenderEmailAndReceiverEmailAndReadFalse(sender, receiver);
    }
}