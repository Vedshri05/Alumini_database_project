package com.engineering.alumni.controller;

import com.engineering.alumni.dto.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private static final List<Map<String, Object>> FAQS = new ArrayList<>();

    static {
        // ── ALUMNI ONLY ──
        add(List.of("accept mentorship", "mentorship request", "review request", "pending request"),
            "ALUMNI", "✅ How to Accept Mentorship Requests",
            List.of("Go to the Mentorship tab in your dashboard",
                    "You'll see all pending requests from students",
                    "Click Accept to accept or Reject to decline",
                    "You can also click Schedule to set a session date & time",
                    "Once accepted, you can chat with the student directly"));

        add(List.of("post job", "add job", "referral", "job posting", "share job"),
            "ALUMNI", "📢 How to Post a Job / Referral",
            List.of("Go to the Jobs tab in your dashboard",
                    "Click the 'Post a Job' button (top right)",
                    "Fill in: Job Title, Company, Location, Skills, Type",
                    "Add a description (optional but recommended)",
                    "Click 'Post Job ✨' — it goes live for all students instantly"));

        add(List.of("schedule session", "book session", "schedule meeting", "set time"),
            "ALUMNI", "📅 How to Schedule a Mentorship Session",
            List.of("Go to the Mentorship tab",
                    "Find a PENDING request from a student",
                    "Click the 'Schedule' button",
                    "Pick a date and time using the date-time picker",
                    "Click Confirm — the student will see the scheduled time"));

        add(List.of("view applicants", "job applicants", "who applied", "student applications"),
            "ALUMNI", "👥 How to View Job Applicants",
            List.of("Go to the Jobs tab in your dashboard",
                    "Each job card shows the number of applicants",
                    "The count updates automatically when students apply",
                    "Contact interested students via the Messages tab"));

        add(List.of("update profile", "edit profile", "change profile", "my profile"),
            "ALUMNI", "👤 How to Update Your Profile",
            List.of("Go to the Profile tab in your dashboard",
                    "View your current details: name, email, role, stats",
                    "Your profile shows Active Mentorships and Jobs Posted",
                    "For changes to alumni details, contact the admin"));

        add(List.of("chat student", "message student", "talk to student", "send message"),
            "ALUMNI", "💬 How to Chat with Students",
            List.of("Go to the Messages tab in your dashboard",
                    "You'll see all your active conversations",
                    "Click on a student to open the chat window",
                    "Type your message and press Enter or click Send",
                    "New chats appear automatically after accepting mentorship"));

        add(List.of("dashboard", "stats", "overview", "home"),
            "ALUMNI", "🏠 Your Dashboard Overview",
            List.of("Pending Requests — mentorship requests awaiting your response",
                    "Active Mentorships — students you're currently mentoring",
                    "Jobs Posted — total jobs you've shared with students",
                    "Scroll down to see pending requests and quick actions",
                    "Use the sidebar to navigate between all sections"));

        add(List.of("reject mentorship", "decline request"),
            "ALUMNI", "❌ How to Reject a Mentorship Request",
            List.of("Go to the Mentorship tab",
                    "Find the pending request you want to decline",
                    "Click the 'Reject' button",
                    "The student will see the status updated to Rejected"));

        add(List.of("delete job", "remove job"),
            "ALUMNI", "🗑️ How to Remove a Job Post",
            List.of("Go to the Jobs tab",
                    "Find the job you want to remove",
                    "Currently jobs stay active — contact admin to remove a listing",
                    "You can post new jobs anytime from the same tab"));

        add(List.of("register event", "event", "upcoming event", "attend event"),
            "ALUMNI", "📅 How to Register for Events",
            List.of("Go to the Events tab in your dashboard",
                    "Browse events created by the admin",
                    "Click 'Register Now' on any event you want to attend",
                    "The button changes to '✓ Registered' once done",
                    "Admin can see your registration in the attendance tracker"));

        add(List.of("logout", "sign out", "exit"),
            "ALUMNI", "🚪 How to Logout",
            List.of("Click the 'Logout' button at the bottom of the sidebar",
                    "You'll be redirected to the login page",
                    "Your data and conversations are saved automatically"));

        // ── STUDENT ONLY ──
        add(List.of("search alumni", "find alumni", "browse alumni", "look for alumni"),
            "STUDENT", "🔍 How to Search Alumni",
            List.of("Go to the Find Alumni tab in your dashboard",
                    "Use the search bar to search by name, branch, or email",
                    "Filter by branch: CS, IT, ENTC, ECE, AIDS",
                    "Browse alumni cards and click to interact"));

        add(List.of("request mentorship", "get mentor", "ask mentor", "mentorship"),
            "STUDENT", "🎓 How to Request Mentorship",
            List.of("Go to the Find Alumni tab",
                    "Find an alumni you'd like as a mentor",
                    "Click 'Request Mentorship' on their card",
                    "Write a message introducing yourself",
                    "Click 'Send Request ✨' and wait for approval"));

        add(List.of("apply job", "job application", "apply for job"),
            "STUDENT", "💼 How to Apply for a Job",
            List.of("Go to the Jobs tab in your dashboard",
                    "Browse job postings shared by alumni",
                    "Click 'Apply Now' on any job",
                    "Button changes to '✓ Applied' once submitted",
                    "Follow up with the alumni via chat if needed"));

        add(List.of("chat alumni", "message alumni", "talk to alumni"),
            "STUDENT", "💬 How to Chat with Alumni",
            List.of("Go to the Find Alumni tab",
                    "Click the chat icon on any alumni card",
                    "Or go directly to the Messages tab",
                    "Type your message and press Enter or Send",
                    "Chats are also available after mentorship is accepted"));

        add(List.of("mentorship status", "check mentorship", "my requests"),
            "STUDENT", "📋 Check Your Mentorship Status",
            List.of("Go to the Mentorship tab in your dashboard",
                    "PENDING = waiting for alumni response",
                    "ACCEPTED = alumni accepted, you can now chat",
                    "REJECTED = alumni declined your request",
                    "Scheduled sessions show the date & time set by alumni"));

        // ── BOTH ──
        add(List.of("login", "sign in", "how to login"),
            "BOTH", "🔐 How to Login",
            List.of("Go to the login page",
                    "Enter your email and password",
                    "Or use Google Sign-In for quick access",
                    "Students → Student Dashboard",
                    "Alumni → Alumni Dashboard"));

        add(List.of("signup", "register", "create account", "new account"),
            "BOTH", "📝 How to Sign Up",
            List.of("Go to the signup page",
                    "Enter your name, email, and password",
                    "Select your role: Student or Alumni",
                    "Fill in branch and graduation year",
                    "Click Sign Up to create your account"));
    }

    private static void add(List<String> keywords, String role, String title, List<String> steps) {
        Map<String, Object> faq = new HashMap<>();
        faq.put("keywords", keywords);
        faq.put("role", role);
        faq.put("title", title);
        faq.put("steps", steps);
        FAQS.add(faq);
    }

    @PostMapping("/query")
    public ApiResponse<?> query(@RequestBody Map<String, String> body) {
        String message = body.getOrDefault("message", "").toLowerCase().trim();
        String role = body.getOrDefault("role", "BOTH").toUpperCase();

        Map<String, Object> best = null;
        int bestScore = 0;

        for (Map<String, Object> faq : FAQS) {
            @SuppressWarnings("unchecked")
            List<String> keywords = (List<String>) faq.get("keywords");
            String faqRole = (String) faq.get("role");

            if (!faqRole.equals("BOTH") && !faqRole.equals(role)) continue;

            int score = 0;
            for (String kw : keywords) {
                String[] words = kw.split(" ");
                int matched = 0;
                for (String w : words) if (message.contains(w)) matched++;
                if (matched == words.length) score += 3;
                else score += matched;
            }
            if (score > bestScore) { bestScore = score; best = faq; }
        }

        List<String> alumniSuggestions = List.of("Post Job", "Mentorship Requests", "Schedule Session", "Chat Help", "Dashboard");
        List<String> studentSuggestions = List.of("Search Alumni", "Request Mentorship", "Apply for Job", "Register Event", "Chat");
        List<String> suggestions = role.equals("ALUMNI") ? alumniSuggestions : studentSuggestions;

        if (best == null || bestScore == 0) {
            String fallback = role.equals("ALUMNI")
                ? "Try asking about: posting jobs, mentorship requests, scheduling sessions, chatting, or your dashboard."
                : "Try asking about: searching alumni, requesting mentorship, applying for jobs, events, or chatting.";
            return ApiResponse.success("fallback", Map.of(
                "title", "🤔 I didn't understand that",
                "steps", List.of(fallback),
                "suggestions", suggestions
            ));
        }

        Map<String, Object> result = new HashMap<>(best);
        result.put("suggestions", suggestions);
        return ApiResponse.success("ok", result);
    }

    @GetMapping("/suggestions")
    public ApiResponse<?> suggestions(@RequestParam(defaultValue = "STUDENT") String role) {
        if (role.equalsIgnoreCase("ALUMNI")) {
            return ApiResponse.success("ok", List.of("Post Job", "Mentorship Requests", "Schedule Session", "Chat Help", "Dashboard", "Register Event"));
        }
        return ApiResponse.success("ok", List.of("Search Alumni", "Request Mentorship", "Apply for Job", "Register Event", "Chat", "Dashboard"));
    }
}
