--
-- PostgreSQL database dump
--

\restrict WXsVt3FVPcVUWVSNcP329WVVfx9FtEKFsyUqUL7O4dtR6ouaex896AfGmJEn9Y9

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-02-23 11:34:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16390)
-- Name: alumni_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA alumni_schema;


ALTER SCHEMA alumni_schema OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16392)
-- Name: alumni; Type: TABLE; Schema: alumni_schema; Owner: postgres
--

CREATE TABLE alumni_schema.alumni (
    s_id integer NOT NULL,
    s_name character varying(100) NOT NULL,
    branch character varying(50),
    graduation_year integer,
    phone_no character varying(15),
    email character varying(100),
    linkedin_profile character varying(255)
);


ALTER TABLE alumni_schema.alumni OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16391)
-- Name: alumni_s_id_seq; Type: SEQUENCE; Schema: alumni_schema; Owner: postgres
--

CREATE SEQUENCE alumni_schema.alumni_s_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE alumni_schema.alumni_s_id_seq OWNER TO postgres;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 220
-- Name: alumni_s_id_seq; Type: SEQUENCE OWNED BY; Schema: alumni_schema; Owner: postgres
--

ALTER SEQUENCE alumni_schema.alumni_s_id_seq OWNED BY alumni_schema.alumni.s_id;


--
-- TOC entry 223 (class 1259 OID 16405)
-- Name: company; Type: TABLE; Schema: alumni_schema; Owner: postgres
--

CREATE TABLE alumni_schema.company (
    company_id integer NOT NULL,
    company_name character varying(100) NOT NULL,
    location character varying(100)
);


ALTER TABLE alumni_schema.company OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16404)
-- Name: company_company_id_seq; Type: SEQUENCE; Schema: alumni_schema; Owner: postgres
--

CREATE SEQUENCE alumni_schema.company_company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE alumni_schema.company_company_id_seq OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 222
-- Name: company_company_id_seq; Type: SEQUENCE OWNED BY; Schema: alumni_schema; Owner: postgres
--

ALTER SEQUENCE alumni_schema.company_company_id_seq OWNED BY alumni_schema.company.company_id;


--
-- TOC entry 225 (class 1259 OID 16414)
-- Name: employment; Type: TABLE; Schema: alumni_schema; Owner: postgres
--

CREATE TABLE alumni_schema.employment (
    emp_id integer NOT NULL,
    s_id integer,
    company_id integer,
    "position" character varying(100),
    start_date date,
    end_date date
);


ALTER TABLE alumni_schema.employment OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16413)
-- Name: employment_emp_id_seq; Type: SEQUENCE; Schema: alumni_schema; Owner: postgres
--

CREATE SEQUENCE alumni_schema.employment_emp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE alumni_schema.employment_emp_id_seq OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 224
-- Name: employment_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: alumni_schema; Owner: postgres
--

ALTER SEQUENCE alumni_schema.employment_emp_id_seq OWNED BY alumni_schema.employment.emp_id;


--
-- TOC entry 227 (class 1259 OID 16432)
-- Name: higher_studies; Type: TABLE; Schema: alumni_schema; Owner: postgres
--

CREATE TABLE alumni_schema.higher_studies (
    hs_id integer NOT NULL,
    s_id integer,
    college_name character varying(150),
    location character varying(100),
    domain_of_study character varying(100),
    start_year integer,
    end_year integer
);


ALTER TABLE alumni_schema.higher_studies OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16431)
-- Name: higher_studies_hs_id_seq; Type: SEQUENCE; Schema: alumni_schema; Owner: postgres
--

CREATE SEQUENCE alumni_schema.higher_studies_hs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE alumni_schema.higher_studies_hs_id_seq OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 226
-- Name: higher_studies_hs_id_seq; Type: SEQUENCE OWNED BY; Schema: alumni_schema; Owner: postgres
--

ALTER SEQUENCE alumni_schema.higher_studies_hs_id_seq OWNED BY alumni_schema.higher_studies.hs_id;


--
-- TOC entry 4872 (class 2604 OID 16395)
-- Name: alumni s_id; Type: DEFAULT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.alumni ALTER COLUMN s_id SET DEFAULT nextval('alumni_schema.alumni_s_id_seq'::regclass);


--
-- TOC entry 4873 (class 2604 OID 16408)
-- Name: company company_id; Type: DEFAULT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.company ALTER COLUMN company_id SET DEFAULT nextval('alumni_schema.company_company_id_seq'::regclass);


--
-- TOC entry 4874 (class 2604 OID 16417)
-- Name: employment emp_id; Type: DEFAULT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.employment ALTER COLUMN emp_id SET DEFAULT nextval('alumni_schema.employment_emp_id_seq'::regclass);


--
-- TOC entry 4875 (class 2604 OID 16435)
-- Name: higher_studies hs_id; Type: DEFAULT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.higher_studies ALTER COLUMN hs_id SET DEFAULT nextval('alumni_schema.higher_studies_hs_id_seq'::regclass);


--
-- TOC entry 5037 (class 0 OID 16392)
-- Dependencies: 221
-- Data for Name: alumni; Type: TABLE DATA; Schema: alumni_schema; Owner: postgres
--

COPY alumni_schema.alumni (s_id, s_name, branch, graduation_year, phone_no, email, linkedin_profile) FROM stdin;
1	Amit Sharma	Computer Engineering	2020	9876543210	amit@gmail.com	linkedin.com/amit
2	Priya Mehta	IT	2019	9123456780	priya@gmail.com	linkedin.com/priya
3	Rahul Verma	Electronics	2021	9988776655	rahul@gmail.com	linkedin.com/rahul
4	Sneha Patil	Mechanical	2018	\N	sneha@gmail.com	\N
\.


--
-- TOC entry 5039 (class 0 OID 16405)
-- Dependencies: 223
-- Data for Name: company; Type: TABLE DATA; Schema: alumni_schema; Owner: postgres
--

COPY alumni_schema.company (company_id, company_name, location) FROM stdin;
1	TCS	Mumbai
2	Infosys	Pune
3	Google	Bangalore
4	Accenture	Hyderabad
\.


--
-- TOC entry 5041 (class 0 OID 16414)
-- Dependencies: 225
-- Data for Name: employment; Type: TABLE DATA; Schema: alumni_schema; Owner: postgres
--

COPY alumni_schema.employment (emp_id, s_id, company_id, "position", start_date, end_date) FROM stdin;
1	1	1	Software Engineer	2020-07-01	2022-06-30
2	1	3	Senior Developer	2022-07-01	\N
3	2	2	System Analyst	2019-08-01	\N
4	4	4	Project Engineer	2022-01-01	\N
\.


--
-- TOC entry 5043 (class 0 OID 16432)
-- Dependencies: 227
-- Data for Name: higher_studies; Type: TABLE DATA; Schema: alumni_schema; Owner: postgres
--

COPY alumni_schema.higher_studies (hs_id, s_id, college_name, location, domain_of_study, start_year, end_year) FROM stdin;
1	3	IIT Delhi	Delhi	VLSI Design	2022	\N
2	4	BITS Pilani	Pilani	Thermal Engineering	2019	2021
\.


--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 220
-- Name: alumni_s_id_seq; Type: SEQUENCE SET; Schema: alumni_schema; Owner: postgres
--

SELECT pg_catalog.setval('alumni_schema.alumni_s_id_seq', 4, true);


--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 222
-- Name: company_company_id_seq; Type: SEQUENCE SET; Schema: alumni_schema; Owner: postgres
--

SELECT pg_catalog.setval('alumni_schema.company_company_id_seq', 4, true);


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 224
-- Name: employment_emp_id_seq; Type: SEQUENCE SET; Schema: alumni_schema; Owner: postgres
--

SELECT pg_catalog.setval('alumni_schema.employment_emp_id_seq', 4, true);


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 226
-- Name: higher_studies_hs_id_seq; Type: SEQUENCE SET; Schema: alumni_schema; Owner: postgres
--

SELECT pg_catalog.setval('alumni_schema.higher_studies_hs_id_seq', 2, true);


--
-- TOC entry 4877 (class 2606 OID 16403)
-- Name: alumni alumni_email_key; Type: CONSTRAINT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.alumni
    ADD CONSTRAINT alumni_email_key UNIQUE (email);


--
-- TOC entry 4879 (class 2606 OID 16401)
-- Name: alumni alumni_pkey; Type: CONSTRAINT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.alumni
    ADD CONSTRAINT alumni_pkey PRIMARY KEY (s_id);


--
-- TOC entry 4881 (class 2606 OID 16412)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (company_id);


--
-- TOC entry 4883 (class 2606 OID 16420)
-- Name: employment employment_pkey; Type: CONSTRAINT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.employment
    ADD CONSTRAINT employment_pkey PRIMARY KEY (emp_id);


--
-- TOC entry 4885 (class 2606 OID 16438)
-- Name: higher_studies higher_studies_pkey; Type: CONSTRAINT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.higher_studies
    ADD CONSTRAINT higher_studies_pkey PRIMARY KEY (hs_id);


--
-- TOC entry 4886 (class 2606 OID 16426)
-- Name: employment employment_company_id_fkey; Type: FK CONSTRAINT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.employment
    ADD CONSTRAINT employment_company_id_fkey FOREIGN KEY (company_id) REFERENCES alumni_schema.company(company_id);


--
-- TOC entry 4887 (class 2606 OID 16421)
-- Name: employment employment_s_id_fkey; Type: FK CONSTRAINT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.employment
    ADD CONSTRAINT employment_s_id_fkey FOREIGN KEY (s_id) REFERENCES alumni_schema.alumni(s_id) ON DELETE CASCADE;


--
-- TOC entry 4888 (class 2606 OID 16439)
-- Name: higher_studies higher_studies_s_id_fkey; Type: FK CONSTRAINT; Schema: alumni_schema; Owner: postgres
--

ALTER TABLE ONLY alumni_schema.higher_studies
    ADD CONSTRAINT higher_studies_s_id_fkey FOREIGN KEY (s_id) REFERENCES alumni_schema.alumni(s_id) ON DELETE CASCADE;


-- Completed on 2026-02-23 11:34:20

--
-- PostgreSQL database dump complete
--

\unrestrict WXsVt3FVPcVUWVSNcP329WVVfx9FtEKFsyUqUL7O4dtR6ouaex896AfGmJEn9Y9

