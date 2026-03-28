package com.engineering.alumni.repository;
import com.engineering.alumni.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    @Query("SELECT m FROM ChatMessage m WHERE (m.senderEmail = :a AND m.receiverEmail = :b) OR (m.senderEmail = :b AND m.receiverEmail = :a) ORDER BY m.sentAt ASC")
    List<ChatMessage> findConversation(@Param("a") String a, @Param("b") String b);
    @Query("SELECT DISTINCT CASE WHEN m.senderEmail = :email THEN m.receiverEmail ELSE m.senderEmail END FROM ChatMessage m WHERE m.senderEmail = :email OR m.receiverEmail = :email")
    List<String> findChatPartners(@Param("email") String email);
    long countBySenderEmailAndReceiverEmailAndReadFalse(String sender, String receiver);
}