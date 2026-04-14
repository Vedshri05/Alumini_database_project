-- ==========================================
-- ALUMNI DATABASE - DATA MIGRATION SCRIPT
-- ==========================================
-- Insert all 40 alumni records
-- Insert all company records  
-- Insert all employment relationships
-- Insert all higher studies records

-- ==========================================
-- 1. INSERT ALUMNI DATA (40 RECORDS)
-- ==========================================

INSERT INTO alumini (s_id, s_name, branch, graduation_year, phone_no, email, linkedin_profile, gender) VALUES
('ALM001', 'MONALI MUKUND ABDULE', '', 2012, '7709359048', 'abdulemonali123@gmail.com', '', 'F'),
('ALM002', 'VINIT SHARAD AGARWAL', '', 2012, '9028790386', 'vinit.agarwal.pict@gmail.com', '', 'M'),
('ALM003', 'GULSHEEN KAUR AHUJA', '', 2012, '9595767651', 'ahuja.gulsheen@gmail.com', '', 'F'),
('ALM004', 'ABHISHEK ANAND', '', 2012, '9960895730', 'aanand221@gmail.com', '', 'M'),
('ALM005', 'BENAZIR MEHBOOB ATTAR', '', 2012, '9763900746', 'attarbenazir09@gmail.com', '', 'F'),
('ALM006', 'VRUSHALI VALMIK AWASARE', '', 2012, '9762225901', 'vrushaliawasare1@gmail.com', '', 'F'),
('ALM007', 'SHUBHENDU AWASTHI', '', 2012, '9021870872', 'speaktoshubhendu@gmail.com', '', 'M'),
('ALM008', 'RITESH SURESH BAGMAR', '', 2012, '8956974183', 'riteshbagmar@yahoo.in', '', 'M'),
('ALM009', 'BHAKTI VILAS BAHETI', '', 2012, '9420344900', 'bahetibhakti@gmail.com', '', 'F'),
('ALM010', 'SIDDHARTHA BANGA', '', 2012, '8390050222', 'siddharthbanga@gmail.com', '', 'M'),
('ALM011', 'ANANYA SHARMA', 'CS', 2019, '9876500001', 'ananya.sharma@gmail.com', '', 'F'),
('ALM012', 'ROHAN PATIL', 'IT', 2018, '9876500002', 'rohan.patil@gmail.com', '', 'M'),
('ALM013', 'SNEHA JOSHI', 'ENTC', 2020, '9876500003', 'sneha.joshi@gmail.com', '', 'F'),
('ALM014', 'AKASH GUPTA', 'ECE', 2017, '9876500004', 'akash.gupta@gmail.com', '', 'M'),
('ALM015', 'PRIYA NAIR', 'AIDS', 2021, '9876500005', 'priya.nair@gmail.com', '', 'F'),
('ALM016', 'KARAN MEHTA', 'CS', 2019, '9876500006', 'karan.mehta@gmail.com', '', 'M'),
('ALM017', 'NEHA VERMA', 'IT', 2020, '9876500007', 'neha.verma@gmail.com', '', 'F'),
('ALM018', 'AMIT KULKARNI', 'ENTC', 2018, '9876500008', 'amit.kulkarni@gmail.com', '', 'M'),
('ALM019', 'POOJA SINGH', 'ECE', 2019, '9876500009', 'pooja.singh@gmail.com', '', 'F'),
('ALM020', 'RAHUL DESHMUKH', 'AIDS', 2020, '9876500010', 'rahul.deshmukh@gmail.com', '', 'M'),
('ALM021', 'SHREYA IYER', 'CS', 2021, '9876500011', 'shreya.iyer@gmail.com', '', 'F'),
('ALM022', 'NIKHIL JAIN', 'IT', 2017, '9876500012', 'nikhil.jain@gmail.com', '', 'M'),
('ALM023', 'TANVI CHOPRA', 'ENTC', 2019, '9876500013', 'tanvi.chopra@gmail.com', '', 'F'),
('ALM024', 'VIKAS YADAV', 'ECE', 2020, '9876500014', 'vikas.yadav@gmail.com', '', 'M'),
('ALM025', 'MANSI SHAH', 'AIDS', 2018, '9876500015', 'mansi.shah@gmail.com', '', 'F'),
('ALM026', 'ADITYA KUMAR', 'CS', 2020, '9876500016', 'aditya.kumar@gmail.com', '', 'M'),
('ALM027', 'RUTUJA PATIL', 'IT', 2021, '9876500017', 'rutuja.patil@gmail.com', '', 'F'),
('ALM028', 'SAGAR MORE', 'ENTC', 2017, '9876500018', 'sagar.more@gmail.com', '', 'M'),
('ALM029', 'KAVYA REDDY', 'ECE', 2019, '9876500019', 'kavya.reddy@gmail.com', '', 'F'),
('ALM030', 'HARSH AGARWAL', 'AIDS', 2021, '9876500020', 'harsh.agarwal@gmail.com', '', 'M'),
('ALM031', 'DIVYA MENON', 'CS', 2018, '9876500021', 'divya.menon@gmail.com', '', 'F'),
('ALM032', 'OMKAR JADHAV', 'IT', 2019, '9876500022', 'omkar.jadhav@gmail.com', '', 'M'),
('ALM033', 'PRACHI GUPTA', 'ENTC', 2020, '9876500023', 'prachi.gupta@gmail.com', '', 'F'),
('ALM034', 'YASH SINGH', 'ECE', 2017, '9876500024', 'yash.singh@gmail.com', '', 'M'),
('ALM035', 'ANJALI KULKARNI', 'AIDS', 2019, '9876500025', 'anjali.kulkarni@gmail.com', '', 'F'),
('ALM036', 'RAJAT SHARMA', 'CS', 2021, '9876500026', 'rajat.sharma@gmail.com', '', 'M'),
('ALM037', 'MEGHNA DESAI', 'IT', 2018, '9876500027', 'meghna.desai@gmail.com', '', 'F'),
('ALM038', 'TEJAS PATIL', 'ENTC', 2019, '9876500028', 'tejas.patil@gmail.com', '', 'M'),
('ALM039', 'SIMRAN KAUR', 'ECE', 2020, '9876500029', 'simran.kaur@gmail.com', '', 'F'),
('ALM040', 'ARJUN NAIR', 'AIDS', 2017, '9876500030', 'arjun.nair@gmail.com', '', 'M');

-- ==========================================
-- 2. INSERT COMPANY DATA (8 RECORDS)
-- ==========================================

INSERT INTO company (company_id, company_name, location) VALUES
(1, 'TCS', 'Mumbai'),
(2, 'Infosys', 'Pune'),
(3, 'Wipro', 'Bangalore'),
(4, 'Accenture', 'Hyderabad'),
(5, 'Google', 'Bangalore'),
(6, 'Microsoft', 'Hyderabad'),
(7, 'Amazon', 'Bangalore'),
(8, 'Capgemini', 'Pune');

-- ==========================================
-- 3. INSERT EMPLOYMENT DATA (15 RECORDS)
-- ==========================================

INSERT INTO employment (emp_id, s_id, company_id, position, start_date, end_date) VALUES
(1, 'ALM011', 5, 'Software Engineer', '2020-06-01', NULL),
(2, 'ALM012', 2, 'System Engineer', '2019-07-15', NULL),
(3, 'ALM013', 3, 'Electronics Engineer', '2021-08-01', NULL),
(4, 'ALM014', 4, 'Developer', '2018-09-10', '2022-12-31'),
(5, 'ALM015', 5, 'Data Analyst', '2022-01-01', NULL),
(6, 'ALM016', 6, 'Backend Developer', '2020-03-20', NULL),
(7, 'ALM017', 7, 'Frontend Developer', '2021-05-10', NULL),
(8, 'ALM018', 8, 'Network Engineer', '2019-11-11', NULL),
(9, 'ALM019', 1, 'Software Tester', '2020-02-02', NULL),
(10, 'ALM020', 2, 'Cloud Engineer', '2021-06-15', NULL),
(11, 'ALM021', 3, 'Embedded Engineer', '2022-07-01', NULL),
(12, 'ALM022', 4, 'Software Engineer', '2018-08-01', '2021-08-01'),
(13, 'ALM023', 5, 'ML Engineer', '2020-10-10', NULL),
(14, 'ALM024', 6, 'DevOps Engineer', '2021-12-01', NULL),
(15, 'ALM025', 7, 'Data Scientist', '2019-03-03', NULL);

-- ==========================================
-- 4. INSERT HIGHER STUDIES DATA (10 RECORDS)
-- ==========================================

INSERT INTO higher_studies (hs_id, s_id, college_name, location, domain_of_study, start_year, end_year) VALUES
(1, 'ALM011', 'IIT Bombay', 'Mumbai', 'M.Tech Computer Science', 2013, 2015),
(2, 'ALM012', 'IISc Bangalore', 'Bangalore', 'M.Tech AI', 2013, 2015),
(3, 'ALM013', 'BITS Pilani', 'Pilani', 'MBA', 2014, 2016),
(4, 'ALM014', 'Stanford University', 'USA', 'MS Computer Science', 2014, 2016),
(5, 'ALM015', 'MIT', 'USA', 'MS Data Science', 2015, 2017),
(6, 'ALM016', 'IIT Delhi', 'Delhi', 'M.Tech ECE', 2013, 2015),
(7, 'ALM017', 'Carnegie Mellon', 'USA', 'MS Software Engineering', 2014, 2016),
(8, 'ALM018', 'University of Toronto', 'Canada', 'MS AI', 2015, 2017),
(9, 'ALM019', 'IIM Ahmedabad', 'Ahmedabad', 'MBA', 2014, 2016),
(10, 'ALM020', 'Oxford University', 'UK', 'MS Data Analytics', 2015, 2017);

-- ==========================================
-- EXECUTION INSTRUCTIONS
-- ==========================================
-- Run this script in pgAdmin or psql:
-- 1. Open pgAdmin → Select Alumini_db
-- 2. Tools → Query Tool
-- 3. Copy-paste this entire script
-- 4. Click Execute (F5)
-- 5. All 40 alumni + 8 companies + 15 employments + 10 higher studies inserted
-- ==========================================
