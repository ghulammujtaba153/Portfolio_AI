export type Project = {
  slug: string;
  title: string;
  year: string;
  company?: string;
  tools: string[];
  summary: string;
  href?: string;
  featured: boolean;
  accent: string;
  image?: string;
};

export const profile = {
  name: "Ghulam Mujtaba",
  title: "AI Engineer",
  email: "ghulammujtaba.dro@gmail.com",
  phone: "+923105403646",
  phoneHref: "tel:+923105403646",
  location: "Islamabad, Pakistan",
  site: "https://portfolio-uay6.vercel.app/",
  github: "https://github.com/ghulammujtaba153/",
  linkedin: "https://www.linkedin.com/in/ghulam-mujtaba-a35749243/",
  availability: "Open to full-time & contract",
  summary:
    "AI Engineer focused on deep learning, computer vision, NLP, and generative systems — from training and XAI through MLOps and production APIs. At Mative I ship AI products and full-stack platforms; as a freelancer I own backend, React Native, and deployment for client apps. Masters in AI at NUCES FAST, Islamabad.",
};

export const highlights = [
  { value: "93.1%", label: "Pneumonia XAI accuracy" },
  { value: "91%", label: "MRI diagnosis accuracy" },
  { value: "96.5%", label: "News classifier F1" },
  { value: "<30ms", label: "MRI server inference" },
];

export const experience = [
  {
    company: "MATIVE INC",
    role: "Software Engineer",
    period: "02/2025 – Present",
    location: "Islamabad, Pakistan",
    bullets: [
      "Shipped Chronedo.ai — Next.js + LightX + Stripe for AI product-image enhancement and subscriptions.",
      "Built TCH Crowd Funding (MERN) with admin, donor, and campaigner dashboards and live campaign tracking.",
      "Hardened Property Checks CRM and customer portal; automated email/WhatsApp via Pabbly.",
      "Extended trading-app admin/backend and wired an AI call agent into the web product.",
    ],
  },
  {
    company: "Fiverr",
    role: "Freelance Software Engineer",
    period: "07/2023 – Present",
    location: "Remote",
    bullets: [
      "Owned backend APIs and production deploy for a professor’s React Native app plus admin dashboard.",
      "Built a multi-role Dairy React Native app with staff/management flows and supporting Node APIs.",
      "Delivered a Laundry MERN platform covering bookings, order tracking, and admin operations.",
      "Completed Java and Python programming tasks for academic clients with documented, runnable solutions.",
    ],
  },
];

export const education = [
  {
    degree: "Masters in Artificial Intelligence",
    school: "NUCES FAST, Islamabad",
    period: "Expected 2027",
    status: "In progress",
  },
  {
    degree: "Bachelors in Software Engineering",
    school: "COMSATS University, Islamabad",
    period: "2021 – 2025",
  },
];

export const skillGroups = [
  {
    label: "AI / ML",
    items: [
      "Deep Learning",
      "Machine Learning",
      "Computer Vision",
      "NLP",
      "Generative AI",
      "XAI",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "RAG",
    ],
  },
  {
    label: "Frontend",
    items: [
      "React.js",
      "React Native CLI",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "GraphQL",
      "Socket.io",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "FastAPI",
      "Python",
      "Java",
      "MongoDB",
      "MySQL",
      "Sequelize",
    ],
  },
  {
    label: "Infra",
    items: [
      "Docker",
      "AWS (SageMaker, EC2, S3)",
      "CI/CD",
      "Git & Github",
      "Github Actions",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "pediatric-pneumonia-xai",
    title: "Pediatric Pneumonia XAI",
    year: "2026",
    tools: ["DenseNet121", "Grad-CAM++", "Transfer Learning"],
    summary:
      "Chest X-ray pipeline at 93.1% accuracy with DenseNet121 and Grad-CAM++ explanations for clinical trust.",
    featured: true,
    accent: "#8b8b93",
    image: "/projects/pneumonia.png",
  },
  {
    slug: "brain-tumor-mri",
    title: "Brain Tumor MRI Diagnosis",
    year: "2026",
    tools: ["TensorFlow", "DenseNet121", "ViT", "Grad-CAM"],
    summary:
      "4-class MRI classifier at 91% accuracy with Grad-CAM localization and under 30ms server inference.",
    featured: true,
    accent: "#707078",
    image: "/projects/brain-tumor.png",
  },
  {
    slug: "msp-nlu",
    title: "Mixture of Soft Prompts",
    year: "2026",
    tools: ["PyTorch", "Soft Prompts", "NER", "NLU"],
    summary:
      "MSP reproduction for controllable NLU data — 95% of paper F1 on multi-intent, +16% intent, +5–10% NER.",
    featured: true,
    accent: "#5a5a62",
    image: "/projects/msp.png",
  },
  {
    slug: "multilabel-news",
    title: "Multi-label News Classification",
    year: "2026",
    tools: ["PyTorch", "BERT", "Qwen", "LoRA"],
    summary:
      "Automotive news classifiers with adaptive ensemble at 96.52% F1; active learning cut labeling cost ~80%.",
    featured: true,
    accent: "#909098",
    image: "/projects/news-classification.png",
  },
  {
    slug: "rag-bot",
    title: "RAG Bot",
    year: "2026",
    tools: [
      "React",
      "FastAPI",
      "Chroma",
      "BM25",
      "Groq",
      "Langfuse",
      "Whisper",
    ],
    summary:
      "Multimodal RAG with hybrid Chroma + BM25 (RRF), Groq rerank, SSE streaming, speech I/O, and Langfuse tracing.",
    href: "https://rag-bot-ebon.vercel.app/",
    featured: true,
    accent: "#9a9aa2",
    image: "/projects/rag-bot.png",
  },
  {
    slug: "promptly",
    title: "Promptly",
    year: "2025",
    tools: ["LangGraph", "Groq", "Streamlit"],
    summary:
      "LangGraph builder that turns natural-language prompts into production-ready static HTML/CSS/JS sites.",
    href: "https://promptly-4tw7bdyvz89fndgygx9snv.streamlit.app/",
    featured: true,
    accent: "#a8a8b0",
    image: "/projects/promptly.png",
  },
  {
    slug: "map-harvest",
    title: "Map Harvest",
    year: "2026",
    company: "Mative Inc",
    tools: ["React.js", "Express.js", "Tailwind", "MongoDB", "Gemini", "Twilio"],
    summary:
      "AI CRM with extension lead capture, Gemini voice agents, WhatsApp verification, and Meta-ad growth into paid plans.",
    href: "https://mapharvest.live/",
    featured: true,
    accent: "#7a7a82",
    image: "/projects/mapharvest.png",
  },
  // More work — freelance first, then product work; Chronedo last
  {
    slug: "dairy-app",
    title: "Dairy App",
    year: "2024",
    company: "Fiverr",
    tools: ["React Native CLI", "Node.js", "Express", "MongoDB"],
    summary:
      "Multi-role dairy operations app on React Native — staff and management flows backed by Node APIs.",
    featured: false,
    accent: "#c4c4cc",
    image: "/projects/dairy-app.png",
  },
  {
    slug: "laundry-mern",
    title: "Laundry Platform",
    year: "2024",
    company: "Fiverr",
    tools: ["React", "Node.js", "Express", "MongoDB"],
    summary:
      "MERN laundry system for bookings, order tracking, and admin ops — scoped, built, and handed off on Fiverr.",
    featured: false,
    accent: "#9a9aa2",
  },
  {
    slug: "professor-rn-suite",
    title: "Professor App + Admin",
    year: "2024",
    company: "Fiverr",
    tools: ["React Native", "Node.js", "Express", "Deployment"],
    summary:
      "Backend and production deployment for a professor’s React Native app with a paired admin dashboard.",
    featured: false,
    accent: "#7a7a82",
  },
  {
    slug: "cardio-hema-hub",
    title: "Cardio Hema Hub",
    year: "2025",
    tools: [
      "Next.js",
      "FastAPI",
      "MongoDB",
      "RAG Bot",
      "Socket.IO",
      "Zego",
    ],
    summary:
      "Health platform with appointments, records, chat/video, CBC AI classification, and a medical RAG assistant.",
    featured: false,
    accent: "#6e6e76",
  },
  {
    slug: "invoice-insight",
    title: "Invoice Insight",
    year: "2025",
    company: "Mative Inc",
    tools: ["Next.js", "MongoDB", "Stripe", "GenAI"],
    summary:
      "GenAI invoice extraction with a central dashboard and Stripe credit-based billing.",
    href: "https://invoice-studio.vercel.app/",
    featured: false,
    accent: "#2c2c32",
    image: "/projects/invoice.png",
  },
  {
    slug: "trader-365",
    title: "Trader 365",
    year: "2025",
    tools: ["Next.js", "Express.js", "MongoDB", "AWS", "Github Actions"],
    summary:
      "AI-ready MERN stack with admin dashboard, React Native sync, chatbot, and AWS CI/CD.",
    featured: false,
    accent: "#404048",
    image: "/projects/trader365.png",
  },
  {
    slug: "first-date",
    title: "First Date",
    year: "2025",
    company: "Mative Inc",
    tools: ["React", "Express", "Agora", "Socket.io", "Stripe"],
    summary:
      "Real-time dating product with video, chat, events, ID checks, and face recognition.",
    href: "https://first-date-app.vercel.app/login",
    featured: false,
    accent: "#4a4a52",
    image: "/projects/firstdate.png",
  },
  {
    slug: "property-check",
    title: "Property Check",
    year: "2025",
    company: "Mative Inc",
    tools: ["React", "MySQL", "Sequelize", "Redux", "Pabbly"],
    summary:
      "CRM and customer-portal upgrades plus Pabbly automation for email and WhatsApp.",
    href: "https://propertycheck.me/",
    featured: false,
    accent: "#3a3a40",
    image: "/projects/propertycheck.png",
  },
  {
    slug: "crowd-funding",
    title: "Crowd Funding",
    year: "2025",
    company: "Mative Inc",
    tools: ["React", "Node.js", "MongoDB", "Socket.io", "Ecentric"],
    summary:
      "Donation platform with real-time campaign tracking for admins and campaigners.",
    href: "https://www.givetogrow.co.za/",
    featured: false,
    accent: "#66666e",
    image: "/projects/crowdfunding.png",
  },
  {
    slug: "vsp-interior",
    title: "VSP Interior",
    year: "2025",
    company: "Mative Inc",
    tools: ["Next.js", "Express", "Supabase", "AWS"],
    summary:
      "Interior-design ERP — projects, inventory, vendors, quotations, and invoicing.",
    href: "https://dev.myvsp.co.nz/login",
    featured: false,
    accent: "#585860",
  },
  {
    slug: "infocus-media",
    title: "InfocusMedia",
    year: "2025",
    company: "Mative Inc",
    tools: ["Next.js", "MongoDB", "GSAP"],
    summary: "Company site with a custom CMS for ongoing content updates.",
    href: "https://www.infocusmedia.ae/",
    featured: false,
    accent: "#86868e",
    image: "/projects/infocus.png",
  },
  {
    slug: "glp",
    title: "GLP",
    year: "2025",
    tools: ["Next.js", "MongoDB"],
    summary: "Responsive UI and multilingual pages for the GLP frontend.",
    href: "https://glp-three.vercel.app/en",
    featured: false,
    accent: "#c4c4cc",
    image: "/projects/glp.png",
  },
  {
    slug: "job-portal",
    title: "Job Portal",
    year: "2024",
    tools: ["React", "Express", "MongoDB", "JWT", "Socket.io"],
    summary:
      "Job posting, shortlisting, and management with JWT auth and responsive UI.",
    featured: false,
    accent: "#505058",
  },
  {
    slug: "chronedo-ai",
    title: "Chronedo.ai",
    year: "2025",
    company: "Mative Inc",
    tools: ["Next.js", "LightX API", "Stripe"],
    summary:
      "AI product-image enhancement platform with Stripe subscription billing.",
    href: "https://chronedo-ai-2.vercel.app/",
    featured: false,
    accent: "#b0b0b8",
    image: "/projects/chronedo-ai.png",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
