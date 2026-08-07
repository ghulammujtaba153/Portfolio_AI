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
  summary:
    "AI Engineer spanning deep learning, computer vision, NLP, and generative systems — from training and evaluation through XAI, MLOps, and production deployment. I build and ship models and platforms across PyTorch/TensorFlow, FastAPI, and the MERN stack: medical imaging diagnostics, soft-prompt NLU research, multimodal LLM apps, and cloud inference on AWS. Currently pursuing a Masters in Artificial Intelligence at NUCES FAST, Islamabad, focused on reliable model lifecycles end to end.",
};

export const experience = [
  {
    company: "MATIVE INC",
    role: "Software Engineer",
    period: "02/2025 – Present",
    location: "Islamabad, Pakistan",
    bullets: [
      "Built Chronedo.ai (Next.js + LightX + Stripe) for AI product-image enhancement and subscriptions.",
      "Shipped TCH Crowd Funding — MERN donation platform with admin, donor, and campaigner dashboards.",
      "Enhanced Property Checks CRM, customer portal, and Pabbly email/WhatsApp automation.",
      "Contributed to trading-app admin/backend and integrated an AI call agent with the web app.",
    ],
  },
  {
    company: "Fiverr",
    role: "Freelancer",
    period: "07/2023 – Present",
    location: "Remote",
    bullets: [
      "Delivered full-stack MERN applications with a focus on scalable, secure, on-time delivery.",
      "Owned end-to-end client work from requirements through deployment and handoff.",
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
      "Langchain",
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
      "Chest X-ray diagnostic pipeline hitting 93.1% accuracy with DenseNet121 and Grad-CAM++ for clinical transparency.",
    featured: true,
    accent: "#8b8b93",
  },
  {
    slug: "brain-tumor-mri",
    title: "Brain Tumor MRI Diagnosis",
    year: "2026",
    tools: ["TensorFlow", "DenseNet121", "ViT", "Grad-CAM"],
    summary:
      "4-class MRI system with 91% accuracy, Grad-CAM localization, and <30ms server inference.",
    featured: true,
    accent: "#707078",
  },
  {
    slug: "msp-nlu",
    title: "Mixture of Soft Prompts",
    year: "2026",
    tools: ["PyTorch", "Soft Prompts", "NER", "NLU"],
    summary:
      "Reproduced MSP for controllable NLU data generation — 95% of paper F1 on multi-intent, +16% intent recognition, +5–10% NER.",
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
      "Reproduced and extended automotive news classifiers — adaptive ensemble 96.52% F1, active learning cuts cost 80%.",
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
      "Production multimodal RAG pipeline with hybrid Chroma + BM25 retrieval (RRF), Groq reranking, SSE streaming, speech I/O, and Langfuse tracing.",
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
      "AI web app builder that turns natural-language prompts into production-ready static HTML/CSS/JS sites.",
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
      "AI-driven CRM with browser-extension lead extraction, Gemini multimodal voice agents, WhatsApp verification, and real-time team collaboration. Drove acquisition with Meta ads and converted paid subscriptions.",
    href: "https://mapharvest.live/",
    featured: true,
    accent: "#7a7a82",
    image: "/projects/mapharvest.png",
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
      "GenAI invoice extraction with a centralized dashboard and Stripe credit billing.",
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
      "AI-integrated MERN ecosystem with admin dashboard, React Native sync, chatbot, and AWS CI/CD.",
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
      "Real-time dating app with video, chat, events, ID verification, and face recognition.",
    href: "https://first-date-app.vercel.app/login",
    featured: false,
    accent: "#4a4a52",
    image: "/projects/firstdate.png",
  },
  {
    slug: "diary-app",
    title: "Diary App",
    year: "2026",
    tools: ["React Native CLI", "TypeScript", "AsyncStorage"],
    summary:
      "Cross-platform personal diary with mood tags, searchable entries, and local persistence — built with React Native CLI.",
    featured: false,
    accent: "#c4c4cc",
    image: "/projects/dairy-app.png",
  },
  {
    slug: "property-check",
    title: "Property Check",
    year: "2025",
    company: "Mative Inc",
    tools: ["React", "MySQL", "Sequelize", "Redux", "Pabbly"],
    summary:
      "CRM enhancements, customer portal, and Pabbly automation for email and WhatsApp.",
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
      "Full-stack ERP for interior design — projects, inventory, vendors, quotations, invoicing.",
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
    summary: "Company website with a custom CMS for dynamic content updates.",
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
    summary: "Responsive UI components and multilingual pages for the GLP frontend.",
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
      "Job posting, shortlisting, and management with auth and responsive UI.",
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
      "Next.js platform for AI product-image enhancement with Stripe subscription management.",
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
