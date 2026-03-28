package com.engineering.alumni.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false) private String senderEmail;
    @Column(nullable = false) private String receiverEmail;
    @Column(nullable = false) private String senderName;
    @Column(nullable = false, columnDefinition = "TEXT") private String content;
    @Column(nullable = false) private boolean read = false;
    @Column(nullable = false, updatable = false) private LocalDateTime sentAt;
    @PrePersist protected void onCreate() { sentAt = LocalDateTime.now(); }
    public String getId() { return id; }
    public String getSenderEmail() { return senderEmail; }
    public void setSenderEmail(String v) { senderEmail = v; }
    public String getReceiverEmail() { return receiverEmail; }
    public void setReceiverEmail(String v) { receiverEmail = v; }
    public String getSenderName() { return senderName; }
    public void setSenderName(String v) { senderName = v; }
    public String getContent() { return content; }
    public void setContent(String v) { content = v; }
    public boolean isRead() { return read; }
    public void setRead(boolean v) { read = v; }
    public LocalDateTime getSentAt() { return sentAt; }
}