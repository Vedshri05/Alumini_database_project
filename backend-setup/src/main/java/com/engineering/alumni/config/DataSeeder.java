package com.engineering.alumni.config;

import com.engineering.alumni.entity.User;
import com.engineering.alumni.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 2) return; // already seeded

        seedStudents();
        seedAlumni();
        System.out.println(">>> Seeded 50 students and 50 alumni successfully.");
    }

    private void seedStudents() {
        String[][] students = {
            {"Aarav Sharma",      "aarav.sharma@student.com",      "CS",   "2026"},
            {"Priya Patel",       "priya.patel@student.com",       "IT",   "2026"},
            {"Rohan Mehta",       "rohan.mehta@student.com",       "ENTC", "2025"},
            {"Sneha Joshi",       "sneha.joshi@student.com",       "ECE",  "2025"},
            {"Karan Verma",       "karan.verma@student.com",       "AIDS", "2026"},
            {"Ananya Singh",      "ananya.singh@student.com",      "CS",   "2027"},
            {"Vikram Nair",       "vikram.nair@student.com",       "IT",   "2027"},
            {"Pooja Reddy",       "pooja.reddy@student.com",       "ENTC", "2026"},
            {"Arjun Kumar",       "arjun.kumar@student.com",       "ECE",  "2025"},
            {"Divya Iyer",        "divya.iyer@student.com",        "AIDS", "2027"},
            {"Rahul Gupta",       "rahul.gupta@student.com",       "CS",   "2026"},
            {"Meera Pillai",      "meera.pillai@student.com",      "IT",   "2025"},
            {"Siddharth Rao",     "siddharth.rao@student.com",     "ENTC", "2027"},
            {"Kavya Menon",       "kavya.menon@student.com",       "ECE",  "2026"},
            {"Aditya Bose",       "aditya.bose@student.com",       "AIDS", "2025"},
            {"Ishaan Chandra",    "ishaan.chandra@student.com",    "CS",   "2027"},
            {"Riya Desai",        "riya.desai@student.com",        "IT",   "2026"},
            {"Nikhil Tiwari",     "nikhil.tiwari@student.com",     "ENTC", "2025"},
            {"Tanvi Shah",        "tanvi.shah@student.com",        "ECE",  "2027"},
            {"Harsh Malhotra",    "harsh.malhotra@student.com",    "AIDS", "2026"},
            {"Shruti Kapoor",     "shruti.kapoor@student.com",     "CS",   "2025"},
            {"Yash Pandey",       "yash.pandey@student.com",       "IT",   "2027"},
            {"Nisha Saxena",      "nisha.saxena@student.com",      "ENTC", "2026"},
            {"Varun Mishra",      "varun.mishra@student.com",      "ECE",  "2025"},
            {"Aditi Bhatt",       "aditi.bhatt@student.com",       "AIDS", "2027"},
            {"Pranav Jain",       "pranav.jain@student.com",       "CS",   "2026"},
            {"Simran Kaur",       "simran.kaur@student.com",       "IT",   "2025"},
            {"Akash Yadav",       "akash.yadav@student.com",       "ENTC", "2027"},
            {"Deepika Nambiar",   "deepika.nambiar@student.com",   "ECE",  "2026"},
            {"Rohit Srivastava",  "rohit.srivastava@student.com",  "AIDS", "2025"},
            {"Anjali Dubey",      "anjali.dubey@student.com",      "CS",   "2027"},
            {"Manish Tripathi",   "manish.tripathi@student.com",   "IT",   "2026"},
            {"Pallavi Ghosh",     "pallavi.ghosh@student.com",     "ENTC", "2025"},
            {"Suresh Babu",       "suresh.babu@student.com",       "ECE",  "2027"},
            {"Kritika Agarwal",   "kritika.agarwal@student.com",   "AIDS", "2026"},
            {"Abhishek Das",      "abhishek.das@student.com",      "CS",   "2025"},
            {"Swati Kulkarni",    "swati.kulkarni@student.com",    "IT",   "2027"},
            {"Gaurav Patil",      "gaurav.patil@student.com",      "ENTC", "2026"},
            {"Neha Chatterjee",   "neha.chatterjee@student.com",   "ECE",  "2025"},
            {"Vivek Banerjee",    "vivek.banerjee@student.com",    "AIDS", "2027"},
            {"Preeti Shukla",     "preeti.shukla@student.com",     "CS",   "2026"},
            {"Sameer Wagh",       "sameer.wagh@student.com",       "IT",   "2025"},
            {"Bhavna Pawar",      "bhavna.pawar@student.com",      "ENTC", "2027"},
            {"Tarun Goel",        "tarun.goel@student.com",        "ECE",  "2026"},
            {"Shweta Thakur",     "shweta.thakur@student.com",     "AIDS", "2025"},
            {"Mohit Arora",       "mohit.arora@student.com",       "CS",   "2027"},
            {"Rekha Venkat",      "rekha.venkat@student.com",      "IT",   "2026"},
            {"Chirag Solanki",    "chirag.solanki@student.com",    "ENTC", "2025"},
            {"Jyoti Rathore",     "jyoti.rathore@student.com",     "ECE",  "2027"},
            {"student@alumni.com","student@alumni.com",            "CS",   "2026"}
        };

        for (String[] s : students) {
            if (!userRepository.existsByEmail(s[1])) {
                User u = new User();
                u.setName(s[0]);
                u.setEmail(s[1]);
                u.setRole("STUDENT");
                u.setBranch(s[2]);
                u.setGraduationYear(Integer.parseInt(s[3]));
                u.setProvider("demo");
                userRepository.save(u);
            }
        }
    }

    private void seedAlumni() {
        String[][] alumni = {
            {"Amit Sharma",       "amit.sharma@alumni.com",       "CS",   "2020"},
            {"Sunita Patel",      "sunita.patel@alumni.com",      "IT",   "2019"},
            {"Rajesh Mehta",      "rajesh.mehta@alumni.com",      "ENTC", "2018"},
            {"Priyanka Joshi",    "priyanka.joshi@alumni.com",    "ECE",  "2021"},
            {"Sunil Verma",       "sunil.verma@alumni.com",       "AIDS", "2022"},
            {"Kavitha Singh",     "kavitha.singh@alumni.com",     "CS",   "2020"},
            {"Deepak Nair",       "deepak.nair@alumni.com",       "IT",   "2019"},
            {"Anita Reddy",       "anita.reddy@alumni.com",       "ENTC", "2018"},
            {"Manoj Kumar",       "manoj.kumar@alumni.com",       "ECE",  "2021"},
            {"Lakshmi Iyer",      "lakshmi.iyer@alumni.com",      "AIDS", "2022"},
            {"Sanjay Gupta",      "sanjay.gupta@alumni.com",      "CS",   "2017"},
            {"Radha Pillai",      "radha.pillai@alumni.com",      "IT",   "2018"},
            {"Venkat Rao",        "venkat.rao@alumni.com",        "ENTC", "2019"},
            {"Usha Menon",        "usha.menon@alumni.com",        "ECE",  "2020"},
            {"Prakash Bose",      "prakash.bose@alumni.com",      "AIDS", "2021"},
            {"Ramesh Chandra",    "ramesh.chandra@alumni.com",    "CS",   "2016"},
            {"Geeta Desai",       "geeta.desai@alumni.com",       "IT",   "2017"},
            {"Suresh Tiwari",     "suresh.tiwari@alumni.com",     "ENTC", "2018"},
            {"Meena Shah",        "meena.shah@alumni.com",        "ECE",  "2019"},
            {"Arun Malhotra",     "arun.malhotra@alumni.com",     "AIDS", "2020"},
            {"Vijay Kapoor",      "vijay.kapoor@alumni.com",      "CS",   "2021"},
            {"Sarla Pandey",      "sarla.pandey@alumni.com",      "IT",   "2022"},
            {"Dinesh Saxena",     "dinesh.saxena@alumni.com",     "ENTC", "2017"},
            {"Kamla Mishra",      "kamla.mishra@alumni.com",      "ECE",  "2018"},
            {"Harish Bhatt",      "harish.bhatt@alumni.com",      "AIDS", "2019"},
            {"Mohan Jain",        "mohan.jain@alumni.com",        "CS",   "2020"},
            {"Savita Kaur",       "savita.kaur@alumni.com",       "IT",   "2021"},
            {"Ravi Yadav",        "ravi.yadav@alumni.com",        "ENTC", "2022"},
            {"Sudha Nambiar",     "sudha.nambiar@alumni.com",     "ECE",  "2016"},
            {"Ashok Srivastava",  "ashok.srivastava@alumni.com",  "AIDS", "2017"},
            {"Poonam Dubey",      "poonam.dubey@alumni.com",      "CS",   "2018"},
            {"Naresh Tripathi",   "naresh.tripathi@alumni.com",   "IT",   "2019"},
            {"Shobha Ghosh",      "shobha.ghosh@alumni.com",      "ENTC", "2020"},
            {"Girish Babu",       "girish.babu@alumni.com",       "ECE",  "2021"},
            {"Rekha Agarwal",     "rekha.agarwal@alumni.com",     "AIDS", "2022"},
            {"Santosh Das",       "santosh.das@alumni.com",       "CS",   "2016"},
            {"Padma Kulkarni",    "padma.kulkarni@alumni.com",    "IT",   "2017"},
            {"Nilesh Patil",      "nilesh.patil@alumni.com",      "ENTC", "2018"},
            {"Asha Chatterjee",   "asha.chatterjee@alumni.com",   "ECE",  "2019"},
            {"Bhaskar Banerjee",  "bhaskar.banerjee@alumni.com",  "AIDS", "2020"},
            {"Lata Shukla",       "lata.shukla@alumni.com",       "CS",   "2021"},
            {"Ganesh Wagh",       "ganesh.wagh@alumni.com",       "IT",   "2022"},
            {"Sushma Pawar",      "sushma.pawar@alumni.com",      "ENTC", "2016"},
            {"Hemant Goel",       "hemant.goel@alumni.com",       "ECE",  "2017"},
            {"Vimala Thakur",     "vimala.thakur@alumni.com",     "AIDS", "2018"},
            {"Jagdish Arora",     "jagdish.arora@alumni.com",     "CS",   "2019"},
            {"Sarita Venkat",     "sarita.venkat@alumni.com",     "IT",   "2020"},
            {"Kiran Solanki",     "kiran.solanki@alumni.com",     "ENTC", "2021"},
            {"Bharat Rathore",    "bharat.rathore@alumni.com",    "ECE",  "2022"},
            {"alumni@alumni.com", "alumni@alumni.com",            "CS",   "2020"}
        };

        for (String[] a : alumni) {
            if (!userRepository.existsByEmail(a[1])) {
                User u = new User();
                u.setName(a[0]);
                u.setEmail(a[1]);
                u.setRole("ALUMNI");
                u.setBranch(a[2]);
                u.setGraduationYear(Integer.parseInt(a[3]));
                u.setProvider("demo");
                userRepository.save(u);
            }
        }
    }
}