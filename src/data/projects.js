// Project registry — data-driven source of truth for the portfolio.
// Every entry is derived from the real repositories at
// https://github.com/Manasdbg123 (manifests, READMEs, file trees).
// tier: "flagship" (immersive case study) | "project" (explorer card) | "experiment" (compact listing)

const GITHUB = "https://github.com/Manasdbg123";

const projects = [
  // ───────────────────────────── FLAGSHIP ─────────────────────────────
  {
    slug: "omniwork-platform",
    name: "OmniWork Platform",
    tier: "flagship",
    category: "Backend",
    tagline: "A 14-service Spring Boot platform run on Kubernetes.",
    description:
      "An enterprise work-management platform split into independently deployable services — auth, workspace, project, task, chat, document, file, notification, search, analytics, audit, AI and config — behind an API gateway with service discovery, and deployed on Kubernetes.",
    githubUrl: `${GITHUB}/omniwork-platform`,
    liveUrl: null,
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Docker", "Kubernetes", "React", "TypeScript", "Tailwind CSS"],
    language: "TypeScript",
    architecture: [
      "API Gateway routes every request to the right service",
      "Discovery Server + Config Server for service registration and shared config",
      "14 domain services (auth, workspace, project, task, chat, document, file, notification, search, analytics, audit, ai, user, whiteboard)",
      "Kafka for cross-service events; PostgreSQL per service",
      "React + TypeScript + Tailwind frontend",
      "Kubernetes manifests for deployment",
    ],
    story: {
      problem:
        "A single monolith can't be scaled, deployed, or owned independently by feature area once a work-management product grows past a handful of capabilities.",
      architecture:
        "The platform is decomposed into 14 Spring Boot services — auth, workspace, project, task, chat, document, file, notification, search, analytics, audit, ai, user and whiteboard — each with its own Maven module and Dockerfile, sitting behind an API gateway with a dedicated discovery server for service-to-service routing.",
      challenge:
        "Coordinating state and events across that many independently deployable services without them becoming tightly coupled — solved with Kafka as the backbone for cross-service events and a config server so every service shares runtime configuration without redeploying.",
      result:
        "A platform that can scale, deploy and fail service-by-service rather than as one unit, with Kubernetes manifests describing how each piece is actually run in a cluster.",
    },
    diagram: "microservices",
    featuredReason: "The most extensive system in the portfolio — 14 services, an API gateway, and a Kubernetes deployment.",
    pushedAt: "2026-09-21",
  },
  {
    slug: "drivex",
    name: "DriveX",
    tier: "flagship",
    category: "Backend",
    tagline: "Self-drive car & bike rental — optimistic locking under concurrent bookings.",
    description:
      "A Spring Boot 3 car and bike rental API covering the full journey: browsing a 72-vehicle fleet across six cities, holding a car during checkout, paying with Stripe, and cancelling — with the booking calendar computed from real reservations, not a static flag.",
    githubUrl: `${GITHUB}/new-car-rent`,
    liveUrl: "https://new-car-rent-lime.vercel.app",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "Spring Security", "JWT", "Stripe", "Docker", "Swagger / OpenAPI"],
    language: "Java",
    architecture: [
      "Catalogue search across 72 vehicles / 6 cities with live availability",
      "Short exclusive hold during checkout",
      "Half-open interval overlap checks against the booking calendar",
      "Optimistic locking to resolve concurrent booking attempts on the same vehicle",
      "Stripe Checkout with signed-webhook settlement, plus a mock provider",
      "JWT access tokens with rotating, hashed refresh tokens",
    ],
    story: {
      problem:
        "Two users can try to book the same car for the same window at the same instant. Whoever's request the database commits second must fail cleanly, not silently overwrite the first booking or leave the car double-booked.",
      architecture:
        "Every vehicle row carries a version column. A booking is only allowed once the service verifies no existing reservation overlaps the requested half-open interval, then commits the booking and increments the version in one transaction. Payment settles through Stripe Checkout with signed-webhook verification, or a mock provider for demo runs without credentials.",
      challenge:
        "Making the concurrency guarantee real rather than theoretical: a short exclusive hold is taken during checkout, the overlap check runs against the live calendar, and the version bump means a second concurrent write on the same row fails at the database level instead of both succeeding.",
      result:
        "USER A and USER B requesting the same car resolve deterministically — one booking is confirmed, the other gets a clean conflict response instead of a corrupted reservation.",
    },
    diagram: "concurrency",
    featuredReason: "The portfolio's signature concurrency story — optimistic locking made visible.",
    pushedAt: "2026-08-27",
  },
  {
    slug: "seatrush",
    name: "SeatRush",
    tier: "flagship",
    category: "Backend",
    tagline: "High-concurrency ticket booking — never double-books a seat, survives worker crashes.",
    description:
      "A BookMyShow/IRCTC-Tatkal-style booking platform built to never double-book a seat, survive worker crashes and Redis loss, handle payment webhooks safely, and stay fair under a traffic spike — with every guarantee backed by a named test.",
    githubUrl: `${GITHUB}/Booking_System`,
    liveUrl: null,
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "React", "TypeScript", "Docker"],
    language: "Python",
    architecture: [
      "Conditional UPDATE + deterministic lock order to prevent double-booking",
      "Expiry worker that survives crashes and Redis loss",
      "Idempotency-Key enforced on every mutating request",
      "Explicit payment state machine for webhook safety",
      "k6 load tests proving fairness under spike traffic",
    ],
    story: {
      problem:
        "Ticket booking under a traffic spike is a concurrency problem before it's a UI problem: many requests race for the same seat, workers crash mid-hold, and payment webhooks can arrive twice.",
      architecture:
        "Seat holds go through a conditional UPDATE with a deterministic lock order rather than a naive read-then-write, so two racing requests for the same seat can't both succeed. An expiry worker reclaims abandoned holds and is built to keep working after a crash or a Redis outage. Every mutating endpoint requires an Idempotency-Key so a retried request can't double-charge or double-book.",
      challenge:
        "Proving the guarantees instead of asserting them — each one (no double-booking, hold expiry under failure, idempotency, payment safety) is backed by a named test file: concurrency tests for seat contention, failure-injection tests for worker/Redis loss, and a k6 load test for fairness under spike traffic.",
      result:
        "A booking core where 'never double-book a seat' is a property enforced by `hold_service.py` and checked by `test_seat_contention.py`, not a claim in a README.",
    },
    diagram: "queue",
    featuredReason: "Every reliability guarantee is mapped to the test that proves it.",
    pushedAt: "2026-09-21",
  },
  {
    slug: "agent-orchestrator",
    name: "Agent Orchestration Engine",
    tier: "flagship",
    category: "AI / Backend",
    tagline: "A durable execution engine for LLM agents — every step committed before it's acted on.",
    description:
      "A durable execution engine that runs a ReAct-style loop for LLM agents where every state transition is committed to Postgres before it is acted on, so a worker can be killed mid-step and another picks the run up exactly where it stopped.",
    githubUrl: `${GITHUB}/LLM_Agent_Orchestrator`,
    liveUrl: null,
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "Alembic", "Anthropic", "Docker"],
    language: "Python",
    architecture: [
      "Runs and steps validated against an explicit transition table",
      "Append-only audit log of every state change",
      "Leases with fencing tokens so a resumed worker can't collide with a stale one",
      "Idempotency ledger for effects (tool calls) that must not repeat",
      "Human approval gates and cost tracking",
      "Structured logs, OpenTelemetry, Prometheus + Grafana dashboards",
    ],
    story: {
      problem:
        "An LLM agent loop that keeps its state only in a process's memory loses everything when that process dies mid-task — and in a distributed worker pool, processes die.",
      architecture:
        "Every state transition is committed to Postgres and validated against an explicit transition table before it is acted on. Workers are stateless and disposable: they lease a run using a fencing token, execute one step, commit the result, and release the lease — so killing a worker mid-step just means another worker picks the run up from its last committed state.",
      challenge:
        "Guaranteeing effects (tool calls, API side effects) don't repeat when a step is retried after a crash — solved with an idempotency ledger — while still supporting human approval gates that can pause a run indefinitely without losing its place.",
      result:
        "194 tests pass and a 17-task evaluation harness reports 17/17, with observability (structured logs, OpenTelemetry, Prometheus, Grafana, a run dashboard) built in rather than bolted on.",
    },
    diagram: "ai-pipeline",
    featuredReason: "The reliability layer — fencing tokens, idempotency, durable state — not the agent loop, is the point.",
    pushedAt: "2026-08-29",
  },
  {
    slug: "food-delivery-platform",
    name: "Food Delivery Platform",
    tier: "flagship",
    category: "Backend",
    tagline: "A microservices food-delivery backend — gateway, discovery, auth, delivery, Kafka.",
    description:
      "A food-delivery backend decomposed into independent Spring Boot services — API gateway, auth, delivery, menu, and a discovery server for service-to-service routing — communicating through Kafka, with a separate frontend client.",
    githubUrl: `${GITHUB}/food-delivery-platform`,
    liveUrl: null,
    technologies: ["Java", "Spring Boot", "MySQL", "Kafka", "Redis", "Spring Security", "JWT", "Docker"],
    language: "JavaScript",
    architecture: [
      "API Gateway as the single entry point",
      "Discovery Server for service registration",
      "Auth Service issuing JWTs",
      "Catalog, user, order and delivery services as independent domains",
      "Kafka for asynchronous order/delivery events",
      "Redis for caching and session management",
    ],
    story: {
      problem:
        "Order placement, catalog/menu management, and delivery tracking are different domains with different scaling needs and shouldn't ship as one deployable unit.",
      architecture:
        "The system is split into an API gateway, a discovery server, and independent auth, catalog, user, order and delivery services, each a separate Spring Boot module with its own MySQL schema and Dockerfile, communicating asynchronously over Apache Kafka.",
      challenge:
        "Keeping order state consistent as it moves from placement to delivery across service boundaries, and keeping read latency low under load — solved by pushing order/delivery events through Kafka instead of synchronous service-to-service calls, and caching hot reads through Redis, which cut query latency by roughly 40%.",
      result:
        "15+ secured REST APIs across the services, an LLM agent that automates order-status and complaint handling, and a RAG-based engine that generates personalized order recommendations.",
    },
    highlights: [
      "Event-driven microservices with Kafka for catalog/user/order communication",
      "Redis caching cut query latency by ~40% and improved throughput",
      "15+ REST APIs secured with Spring Security + JWT",
      "LLM agent for order-status and complaint handling; RAG recommendation engine for order suggestions",
    ],
    diagram: "microservices",
    featuredReason: "A second, independent take on decomposing a backend into services around Kafka — since extended with an LLM agent and a RAG recommendation engine.",
    pushedAt: "2026-08-21",
  },
  {
    slug: "nestxchange",
    name: "NestXchange",
    tier: "flagship",
    category: "Full Stack",
    tagline: "A category-agnostic marketplace for property and vehicles — rent, buy or sell.",
    description:
      "A multi-category marketplace — property and vehicles, for rent, sale or purchase — through one category-agnostic engine rather than two parallel apps. Evolved from an earlier property-only rental app, RentNest.",
    githubUrl: `${GITHUB}/nestxchange-fullstack`,
    liveUrl: "https://nestxchange-fullstack.vercel.app",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "Spring Security", "JWT", "React", "Tailwind CSS", "Vite", "Docker", "Swagger / OpenAPI"],
    language: "JavaScript",
    architecture: [
      "Category-agnostic Listing entity with a JSONB schema in PostgreSQL, shared across categories",
      "Unified search over universal fields (price, location, mode) plus category-specific JSONB attributes via a schema registry",
      "Shared transaction/state-machine lifecycle (Available → Requested → Confirmed → Active/Completed → Closed) with pluggable rent/sale handlers",
      "Spring Boot REST API secured with JWT",
      "React single-page client",
      "Startup fails fast if JWT_SECRET is weak, rather than signing tokens insecurely",
    ],
    story: {
      problem:
        "RentNest, its predecessor, modeled only property rentals. Extending that to vehicles and outright sale/purchase without duplicating the whole application into two codebases meant the listing model itself had to change.",
      architecture:
        "Listings are modeled as a single category-agnostic entity with a JSONB-based schema in PostgreSQL, so property and vehicle listings — for rent, sale, or purchase — share one data model. A schema registry backs a unified search engine that filters universal fields (price, location, mode) alongside category-specific attributes via dynamic JSONB queries.",
      challenge:
        "Generalizing a domain model that started single-purpose (property rentals only) without losing the type-specific behavior each category still needs — solved with a shared transaction state machine (Available, Requested, Confirmed, Active/Completed, Closed) and pluggable handlers per rent/sale flow.",
      result:
        "One engine serving both categories and all three transaction types, plus an LLM agent for conversational listing search and a RAG-based natural-language query engine over listing data.",
    },
    highlights: [
      "JSONB-based category-agnostic Listing model shared across property and vehicles",
      "Dynamic JSONB queries + schema registry power a single unified search engine",
      "Explicit state machine (Available/Requested/Confirmed/Active/Closed) with pluggable rent/sale handlers",
      "LLM agent for conversational listing search; RAG engine for natural-language queries over listings",
    ],
    diagram: "webapp",
    featuredReason: "Shows the same engineer revisiting and generalizing an earlier design (RentNest → NestXchange) — an active project since Feb 2023.",
    pushedAt: "2026-09-20",
  },

  // ───────────────────────────── PROJECTS ─────────────────────────────
  {
    slug: "resumeai",
    name: "ResumeAI",
    tier: "project",
    category: "AI",
    tagline: "AI resume screener with an evaluation harness that measures itself against a baseline.",
    description:
      "Scores a resume against a job description with a quote from the CV behind every judgement, and can search live job postings for the best matches. Keeps a keyword-matching baseline alongside the AI engine and measures both against human-labelled data.",
    githubUrl: `${GITHUB}/assay-resume-screener`,
    liveUrl: null,
    technologies: ["Python", "Flask", "scikit-learn", "Docker", "Anthropic"],
    language: "Python",
    highlights: ["Evaluation harness compares the AI engine against a keyword baseline on labelled data", "Provider-agnostic (Gemini or Claude via one config line)", "Kubernetes manifests included for deployment"],
    pushedAt: "2026-08-30",
  },
  {
    slug: "doc-diff",
    name: "Doc Diff",
    tier: "project",
    category: "AI",
    tagline: "Turns screen recordings into editable, auto-updating SOPs.",
    description:
      "Extracts meaningful frames from a screen recording, structures them into documented steps with screenshots, and produces a visual diff when a new recording updates the same doc.",
    githubUrl: `${GITHUB}/Evergreen-Auto_Documentation`,
    liveUrl: null,
    technologies: ["Python", "FastAPI", "Express", "React", "TypeScript", "Prisma", "Tailwind CSS", "Vite", "Anthropic"],
    language: "Python",
    highlights: ["Frame extraction combines transcription cues with visual change-spike detection", "Click-to-edit guide screen with autosave", "Regenerates a doc from a new recording and diffs what changed"],
    pushedAt: "2026-09-10",
  },
  {
    slug: "rentnest",
    name: "RentNest",
    tier: "project",
    category: "Full Stack",
    tagline: "Zero-brokerage property rental marketplace — the predecessor to NestXchange.",
    description:
      "Owners list a property directly and tenants search, shortlist and book viewings without an agent in between. Spring Boot REST API with a React client.",
    githubUrl: `${GITHUB}/rentnest-fullstack`,
    liveUrl: "https://rentnest-fullstack.vercel.app",
    technologies: ["Java", "Spring Boot", "MySQL", "Spring Security", "JWT", "React", "Tailwind CSS", "Docker"],
    language: "JavaScript",
    highlights: ["Later generalized into NestXchange's multi-category engine", "JWT secrets validated at startup"],
    pushedAt: "2026-08-27",
  },
  {
    slug: "ecommerce-rag-assistant",
    name: "E-Commerce RAG Assistant",
    tier: "project",
    category: "AI",
    tagline: "Retrieval-augmented shopping assistant over a product catalogue.",
    description:
      "A RAG pipeline that answers product questions by retrieving relevant catalogue entries with embeddings before generating an answer.",
    githubUrl: `${GITHUB}/E-Commerce-RAG-Assistant`,
    liveUrl: null,
    technologies: ["Python", "LangChain", "ChromaDB", "FAISS", "Sentence Transformers", "Streamlit", "PyTorch", "scikit-learn"],
    language: "Python",
    highlights: ["Streamlit interface", "Vector search via ChromaDB / FAISS"],
    pushedAt: "2025-08-15",
  },
  {
    slug: "enterprise-qa-rag",
    name: "Enterprise Q&A RAG System",
    tier: "project",
    category: "AI",
    tagline: "Retrieval-augmented Q&A over enterprise documents.",
    description: "A document-grounded question-answering system built on a retrieval-augmented generation pipeline.",
    githubUrl: `${GITHUB}/RAG_Based_enterpise_Q-A_System`,
    liveUrl: null,
    technologies: ["Python", "LangChain", "ChromaDB", "Sentence Transformers", "Streamlit"],
    language: "Python",
    highlights: ["Documents are chunked and embedded, then retrieved by similarity before an LLM answers", "Streamlit front end for asking questions over a document set", "Built as a standalone counterpart to the E-Commerce RAG Assistant, generalized to any document corpus"],
    pushedAt: "2026-08-02",
  },
  {
    slug: "fraud-spam-detection",
    name: "Fraud & Spam Detection",
    tier: "project",
    category: "AI",
    tagline: "Classical ML classifiers for fraud and spam detection, served over an API.",
    description: "scikit-learn classifiers for fraud and spam detection exposed through a FastAPI service.",
    githubUrl: `${GITHUB}/Fraud_and_spam_detection`,
    liveUrl: null,
    technologies: ["Python", "FastAPI", "scikit-learn", "Pandas", "Docker"],
    language: "HTML",
    highlights: ["Two independent classical ML classifiers — one for transaction fraud, one for spam text", "Served behind a FastAPI endpoint rather than run as an offline notebook", "Containerized with Docker for reproducible inference"],
    pushedAt: "2026-08-02",
  },
  {
    slug: "hospital-management",
    name: "Hospital Management System",
    tier: "project",
    category: "Backend",
    tagline: "Spring Boot system for patients, appointments and staff.",
    description: "Manages patients, appointments and staff with RESTful APIs backed by Spring Data JPA / Hibernate.",
    githubUrl: `${GITHUB}/Hospital-Management-System`,
    liveUrl: null,
    technologies: ["Java", "Spring Boot", "Hibernate", "MySQL", "Maven"],
    language: "Java",
    highlights: ["Separate entities and REST endpoints for patients, appointments and staff", "Hibernate/JPA mapping over a normalized MySQL schema", "Built as a Maven-managed Spring Boot service"],
    pushedAt: "2025-04-18",
  },
  {
    slug: "recipe-blog",
    name: "Recipe Blog",
    tier: "project",
    category: "Full Stack",
    tagline: "Full-stack recipe platform with search, comments and an admin panel.",
    description: "A recipe platform with search, comment and rating functionality, plus an admin dashboard for content moderation.",
    githubUrl: `${GITHUB}/Recipe-Blog-main`,
    liveUrl: null,
    technologies: ["JavaScript", "Express", "MongoDB", "EJS"],
    language: "EJS",
    highlights: ["Server-rendered EJS views over an Express/MongoDB backend", "Search, commenting and rating on individual recipes", "Admin dashboard for moderating submitted content"],
    pushedAt: "2024-04-06",
  },
  {
    slug: "shopping-cart",
    name: "Shopping Cart Application",
    tier: "project",
    category: "Backend",
    tagline: "E-commerce catalogue, sessions and checkout on Java + JPA.",
    description: "Product catalogue, user sessions, cart management and checkout built with Java, JPA and Hibernate.",
    githubUrl: `${GITHUB}/Shoping-cart`,
    liveUrl: null,
    technologies: ["Java", "Hibernate", "MySQL", "Maven"],
    language: "Java",
    highlights: ["Session-based cart with add/remove/checkout flow", "Product catalogue persisted via Hibernate over MySQL", "Structured as a classic servlet-backed Java web app (WebContent layout)"],
    pushedAt: "2025-04-18",
  },
  {
    slug: "sketch-to-face-gan",
    name: "Sketch-to-Face GAN",
    tier: "project",
    category: "AI",
    tagline: "U-Net + GAN pipeline that turns sketches into realistic faces.",
    description: "A GAN trained with a U-Net generator and deep convolutional layers to convert sketches into realistic faces.",
    githubUrl: `${GITHUB}/Sketch-to-Real-image-Transformation-using-Gan`,
    liveUrl: null,
    technologies: ["Python", "PyTorch", "Jupyter Notebook"],
    language: "Jupyter Notebook",
    highlights: ["U-Net generator + deep convolutional discriminator trained adversarially", "~15% improvement in output image fidelity from architecture and preprocessing tuning", "~30% reduction in training time via optimized data pipeline"],
    pushedAt: "2024-05-29",
  },
  {
    slug: "resume-screener-java",
    name: "Resume Screener (Java)",
    tier: "project",
    category: "Backend",
    tagline: "An earlier, rules-based resume screener on Spring Boot.",
    description: "A Spring Boot / Hibernate resume-screening service — the predecessor to the AI-driven ResumeAI.",
    githubUrl: `${GITHUB}/Resume_Screener`,
    liveUrl: "https://resume-screener-nu-five.vercel.app",
    technologies: ["Java", "Spring Boot", "Hibernate", "MySQL", "Maven"],
    language: "Java",
    highlights: ["Rules-based CV/JD matching before the AI-driven rewrite (ResumeAI)", "Spring Boot + Hibernate service with a deployed live demo", "Shows the same problem revisited later with an evaluation-harness-backed AI approach"],
    pushedAt: "2026-03-12",
  },
  {
    slug: "car-rental-v1",
    name: "Car Rental (v1)",
    tier: "project",
    category: "Backend",
    tagline: "Spring Security car rental API — the earlier iteration of DriveX.",
    description: "A Spring Boot car rental API with Spring Security and OpenAPI docs — DriveX's direct predecessor.",
    githubUrl: `${GITHUB}/car-rental`,
    liveUrl: null,
    technologies: ["Java", "Spring Boot", "Spring Security", "Hibernate", "MySQL", "Swagger / OpenAPI"],
    language: "Java",
    highlights: ["Spring Security authentication and role-based access on top of a REST API", "OpenAPI/Swagger docs generated for the endpoint surface", "Rebuilt from scratch as DriveX with optimistic locking, Stripe payments and JWT rotation"],
    pushedAt: "2026-01-15",
  },
  {
    slug: "internship-portal",
    name: "Internship Portal",
    tier: "project",
    category: "Full Stack",
    tagline: "Portal connecting students with internship listings.",
    description: "An Express / MySQL / EJS application for listing and applying to internships.",
    githubUrl: `${GITHUB}/Internship_portal`,
    liveUrl: null,
    technologies: ["JavaScript", "Express", "MySQL", "EJS"],
    language: "JavaScript",
    highlights: ["Server-rendered listing and application flow for internships", "Express routes backed by a MySQL schema", "One of the earlier full-stack apps in the portfolio"],
    pushedAt: "2024-08-28",
  },
  {
    slug: "rk-print-ncr",
    name: "RK Print NCR",
    tier: "project",
    category: "Web",
    tagline: "React + Tailwind storefront for a print business.",
    description: "A React, Tailwind and Vite storefront with a Node/MongoDB backend, built for a local print business.",
    githubUrl: `${GITHUB}/rk-ncr`,
    liveUrl: "https://rk-ncr-f.vercel.app",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "MongoDB"],
    language: "TypeScript",
    highlights: ["Client-facing storefront built and shipped for a real local business", "React + TypeScript + Tailwind on Vite, deployed to Vercel", "Node/MongoDB backend for catalogue content"],
    pushedAt: "2025-10-31",
  },

  // ───────────────────────────── EXPERIMENTS ─────────────────────────────
  { slug: "dsa", name: "DSA", tier: "experiment", category: "DSA", description: "Data structures & algorithms practice in Java.", githubUrl: `${GITHUB}/dsa`, technologies: ["Java"], language: "Java" },
  { slug: "gfg-potd", name: "GFG POTD", tier: "experiment", category: "DSA", description: "GeeksforGeeks Problem-of-the-Day solutions.", githubUrl: `${GITHUB}/GFG_POTD`, technologies: ["Java"], language: "Java" },
  { slug: "complete-java", name: "Complete Java", tier: "experiment", category: "DSA", description: "Core Java concepts — OOP, threads, JDBC, static/file I/O — worked through example by example.", githubUrl: `${GITHUB}/Complete_Java`, technologies: ["Java"], language: "Java" },
  { slug: "email-application", name: "Email Application", tier: "experiment", category: "Backend", description: "A small Java email-sending utility.", githubUrl: `${GITHUB}/email-application`, technologies: ["Java", "Maven"], language: "Java" },
  { slug: "huffman-coding", name: "Huffman Zip/Unzip", tier: "experiment", category: "DSA", description: "File compression and decompression using Huffman coding.", githubUrl: `${GITHUB}/zip-unzip-using-Huffman-coding`, technologies: ["Java"], language: "Java" },
  { slug: "newcr", name: "NewCR", tier: "experiment", category: "Web", description: "An early TypeScript/Express iteration that preceded RK Print NCR.", githubUrl: `${GITHUB}/newcr`, technologies: ["TypeScript", "Express"], language: "TypeScript" },
];

export const GITHUB_PROFILE = GITHUB;
export const CATEGORIES = ["All", "Backend", "Full Stack", "AI", "AI / Backend", "Web", "DSA"];
export const flagshipProjects = projects.filter((p) => p.tier === "flagship");
export const explorerProjects = projects.filter((p) => p.tier !== "experiment");
export const experimentProjects = projects.filter((p) => p.tier === "experiment");
export const REPO_COUNT = 42;

// From the résumé — the one role not represented by a public repository
// (built at Wittybrains; company codebase, not open source).
export const experience = [
  {
    company: "Wittybrains Software Technologies Pvt. Ltd.",
    role: "Software Developer",
    location: "Noida, India",
    period: "Jul 2026 — Present",
    highlights: [
      "Architected an Agentic ERP module using role-aligned LLM agents (planner–executor–reflector pattern) integrated with existing ERP APIs and a risk-tiered human-in-the-loop review step, automating inventory and order-processing workflows across 3+ business modules and cutting manual intervention by 35%.",
      "Built an AI-powered Learning Management System from scratch using FastAPI and PostgreSQL, with adaptive learning paths, AI-generated quizzes and a RAG-based tutor chatbot, backed by 20+ RESTful APIs serving 500+ learners across 40+ courses.",
      "Developed an ANPR (Automatic Number Plate Recognition) pipeline using YOLO-based plate detection and OCR (EasyOCR/PaddleOCR), with a vehicle make/model/color classification module and image preprocessing (adaptive thresholding, denoising, contrast enhancement) for varying lighting, deployed via FastAPI for real-time inference on live and recorded video.",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "LLM Agents", "RAG", "YOLO", "OpenCV", "OCR", "Java", "Spring Boot"],
  },
];

// Verified stats — sourced from the résumé (Kaustuk_CV) as the canonical source.
export const codingStats = {
  codeforcesRating: 1913,
  codeforcesTitle: "Candidate Master",
  codeforcesGlobalRank: "Global Rank 57 (Round 1030, Div. 2)",
  leetcodeRating: 2183,
  leetcodeTitle: "Guardian",
  leetcodeGlobalRank: "Global Rank 11 (Weekly Contest)",
  problemsSolved: "2400+",
};

export default projects;
