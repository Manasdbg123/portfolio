// Everything the site says about Kaustuk lives in this file, so updating the
// portfolio means editing text here rather than hunting through components.
// Source: the current résumé (public/Kaustuk_Raj_CV.pdf).

const GITHUB = "https://github.com/Manasdbg123";

export const profile = {
  name: "Kumar Kaustuk Raj",
  shortName: "Kaustuk Raj",
  role: "Software Developer",
  headline: "I build AI-driven backend systems, from Java and Spring Boot microservices to agentic LLM workflows and computer-vision pipelines.",
  location: "Noida, India",
  email: "rajkaustuk@gmail.com",
  resume: "/Kaustuk_Raj_CV.pdf",
  about: [
    "I'm a Software Developer at Wittybrains Software Technologies. I design agentic LLM workflows that automate enterprise ERP processes. I also built an AI-powered Learning Management System with FastAPI and PostgreSQL, and a real-time Automatic Number Plate Recognition (ANPR) pipeline.",
    "My core stack is Java, Spring Boot and Python with FastAPI. I use PostgreSQL, MySQL and Redis for data, Apache Kafka for event-driven services, and Spring Security with JWT for authentication. I focus on clean API design, reliable data flow and systems that are easy to maintain.",
    "I studied Computer Science and Engineering at NIT Andhra Pradesh (2021–2025). I'm also an active competitive programmer: Candidate Master on Codeforces and Guardian on LeetCode, with more than 2,400 problems solved.",
  ],
  facts: [
    { label: "Current role", value: "Software Developer, Wittybrains" },
    { label: "Education", value: "B.Tech CSE, NIT Andhra Pradesh" },
    { label: "Focus", value: "Backend and AI systems" },
    { label: "Based in", value: "Noida, India" },
  ],
  links: {
    github: GITHUB,
    linkedin: "https://www.linkedin.com/in/kaustuk-raj-63a240226/",
    codeforces: "https://codeforces.com/profile/manasraj123",
    leetcode: "https://leetcode.com/u/manas-12345/",
  },
};

export const stats = [
  { value: "1913", label: "Codeforces rating", note: "Candidate Master" },
  { value: "2183", label: "LeetCode rating", note: "Guardian" },
  { value: "2400+", label: "Problems solved", note: "Across 4 platforms" },
];

export const experience = [
  {
    role: "Software Developer",
    company: "Wittybrains Software Technologies Pvt. Ltd.",
    location: "Noida, India",
    period: "Jul 2026 – Present",
    highlights: [
      {
        title: "Agentic ERP automation",
        text: "Architected an ERP module driven by role-aligned LLM agents (planner, executor and reflector) connected to the existing ERP APIs, with a risk-tiered human review step. It automates inventory and order-processing workflows across 3+ business modules and cut manual intervention by 35%.",
      },
      {
        title: "AI-powered Learning Management System",
        text: "Built an LMS from scratch with FastAPI and PostgreSQL: adaptive learning paths, AI-generated quizzes and a RAG-based tutor chatbot, backed by 20+ REST APIs serving 500+ learners across 40+ courses.",
      },
      {
        title: "ANPR computer-vision pipeline",
        text: "Developed number-plate recognition with YOLO-based detection and OCR (EasyOCR, PaddleOCR), plus vehicle make, model and colour classification. Image preprocessing keeps OCR accurate in poor lighting, and the pipeline serves real-time inference on live and recorded video through FastAPI.",
      },
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "LLM Agents", "RAG", "YOLO", "OpenCV", "EasyOCR", "PaddleOCR"],
  },
];

// Newest first. Marks are from the official mark sheets.
export const education = [
  {
    level: "Graduation",
    degree: "B.Tech in Computer Science and Engineering",
    school: "National Institute of Technology, Andhra Pradesh",
    period: "Dec 2021 – Apr 2025",
    score: null,
    points: ["Organising team, NIT AP Tech Fest", "Member, Praayatnam NIT AP"],
  },
  {
    level: "Class XII",
    degree: "Intermediate (Science): Physics, Chemistry, Mathematics",
    school: "Thakur Vindrshwari Higher Secondary School, Barhampur, Darbhanga",
    board: "Bihar School Examination Board",
    period: "2020",
    score: { value: "81%", detail: "405 / 500 · First Division" },
    points: ["Mathematics: 93 / 100 (distinction)", "Chemistry: 83 / 100 (distinction)"],
  },
  {
    level: "Class X",
    degree: "Secondary School Examination",
    school: "T. B. S. High School, Brahampur, Darbhanga",
    board: "Bihar School Examination Board",
    period: "2018",
    score: { value: "74.8%", detail: "374 / 500 · First Division" },
    points: ["Mathematics: 89 / 100", "Science: 84 / 100"],
  },
];

// The two projects on the résumé, shown in full.
export const featuredProjects = [
  {
    name: "Food Delivery Platform",
    period: "Jan 2025 – May 2025",
    summary: "An event-driven microservices backend for ordering food, with a React storefront.",
    highlights: [
      "Java and Spring Boot services communicating asynchronously through Apache Kafka",
      "Redis caching cut query latency by about 40% and improved throughput",
      "15+ REST APIs secured with Spring Security and JWT",
      "Transactional order placement with Spring Data JPA and MySQL",
    ],
    technologies: ["Java", "Spring Boot", "Microservices", "Apache Kafka", "Redis", "Spring Security", "JWT", "Hibernate", "MySQL"],
    github: `${GITHUB}/food_delivery`,
    live: null,
  },
  {
    name: "NestXchange",
    period: "Feb 2023 – Present",
    summary: "A multi-category marketplace to rent, buy or sell property and vehicles.",
    highlights: [
      "One category-agnostic listing model stored as JSONB in PostgreSQL",
      "Unified search across shared fields and category-specific attributes",
      "Listing lifecycle modelled as a state machine with pluggable rent and sale handlers",
      "LLM agent for conversational search and a RAG query engine over listings",
    ],
    technologies: ["Java", "Spring Boot", "Spring Security", "JWT", "Spring Data JPA", "PostgreSQL", "React", "LLM Agents", "RAG"],
    github: `${GITHUB}/nestxchange-fullstack`,
    live: "https://nestxchange-fullstack.vercel.app",
  },
];

// Other public repositories. Tags list only technologies the project really uses.
export const moreProjects = [
  {
    name: "DriveX",
    summary: "Car and bike rental API that prevents double bookings with optimistic locking and settles payments through signed webhooks.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Spring Security", "JWT", "Docker"],
    github: `${GITHUB}/new-car-rent`,
    live: "https://new-car-rent-lime.vercel.app",
  },
  {
    name: "SeatRush",
    summary: "High-traffic ticket booking that never sells the same seat twice and recovers safely from worker crashes.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "React", "Docker"],
    github: `${GITHUB}/Booking_System`,
    live: null,
  },
  {
    name: "Agent Orchestration Engine",
    summary: "Durable execution for LLM agents: every step is saved before it runs, so a crashed worker resumes exactly where it stopped.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "LLM Agents", "Docker"],
    github: `${GITHUB}/LLM_Agent_Orchestrator`,
    live: null,
  },
  {
    name: "OmniWork Platform",
    summary: "Work-management platform split into Spring Boot microservices behind an API gateway, with Kafka events.",
    technologies: ["Java", "Spring Boot", "Microservices", "Apache Kafka", "PostgreSQL", "Docker"],
    github: `${GITHUB}/omniwork-platform`,
    live: null,
  },
  {
    name: "ResumeAI",
    summary: "Scores a résumé against a job description with Gemini AI and finds matching live job postings.",
    technologies: ["Python", "Gemini AI", "Docker"],
    github: `${GITHUB}/assay-resume-screener`,
    live: "https://resumeai-5mpl.onrender.com",
  },
  {
    name: "Hospital Management System",
    summary: "Manages patients, appointments and medical staff through secured REST APIs.",
    technologies: ["Java", "Spring Boot", "Spring Security", "MySQL", "Maven"],
    github: `${GITHUB}/Hospital-Management-System`,
    live: null,
  },
  {
    name: "Shopping Cart Application",
    summary: "Product catalogue, user sessions, cart and checkout for an online store.",
    technologies: ["Java", "Hibernate", "MySQL", "Maven"],
    github: `${GITHUB}/Shoping-cart`,
    live: null,
  },
  {
    name: "RK Print NCR",
    summary: "Storefront website built and shipped for a local printing business.",
    technologies: ["React", "MongoDB"],
    github: `${GITHUB}/rk-ncr`,
    live: "https://rk-ncr-f.vercel.app",
  },
  {
    name: "Sketch-to-Face GAN",
    summary: "U-Net based GAN that turns hand-drawn sketches into realistic face images.",
    technologies: ["Python", "TensorFlow"],
    github: `${GITHUB}/Sketch-to-Real-image-Transformation-using-Gan`,
    live: null,
  },
];

// Exactly the skills listed on the résumé.
export const skillGroups = [
  {
    title: "Languages",
    items: ["Java", "Python", "JavaScript", "C++", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks & APIs",
    items: ["Spring Boot", "FastAPI", "Microservices", "REST APIs", "Spring Security", "JWT", "Spring Data JPA", "Hibernate", "Servlets", "JSP", "JDBC", "JavaMail API"],
  },
  {
    title: "AI, ML & Computer Vision",
    items: ["LLM Agents", "RAG", "OpenCV", "YOLO", "OCR", "EasyOCR", "PaddleOCR", "Gemini AI"],
  },
  {
    title: "Databases & Caching",
    items: ["PostgreSQL", "JSONB", "MySQL", "MongoDB", "Redis"],
  },
  {
    title: "Tools & Cloud",
    items: ["Apache Kafka", "Apache Tika", "AWS", "Docker", "Git", "Maven", "Tomcat", "Postman"],
  },
];

// Competitive programming. The Codeforces card refreshes rating, rank, avatar
// and rating history from the public Codeforces API in the visitor's
// browser; these values are the fallback (from the résumé).
export const codingProfiles = {
  codeforces: {
    platform: "Codeforces",
    handle: "manasraj123",
    link: "https://codeforces.com/profile/manasraj123",
    maxRating: 1913,
    maxRank: "Candidate Master",
    color: "#c147e9",
    nextTitle: "Master",
    highlights: [
      "Global rank 57 in Codeforces Round 1030 (Div. 2)",
      "Peak rating 1913: Candidate Master, the fifth of ten Codeforces titles",
    ],
  },
  leetcode: {
    platform: "LeetCode",
    handle: "manas-12345",
    link: "https://leetcode.com/u/manas-12345/",
    rating: 2183,
    badge: "Guardian",
    color: "#ffa116",
    highlights: [
      "Global rank 11 in a LeetCode Weekly Contest",
      "Guardian badge: awarded to the top 5% of contest participants",
    ],
  },
  // Both rating rings are drawn on the same 0–3000 scale.
  ringScale: 3000,
  totalSolved: "2,400+",
  platforms: ["Codeforces", "LeetCode", "GeeksforGeeks", "InterviewBit"],
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "coding", label: "Coding" },
  { id: "contact", label: "Contact" },
];
