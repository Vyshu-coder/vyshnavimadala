// ============================================================
// portfolioData.js — ALL content for the portfolio lives here.
// Components only read from this file.
// ============================================================

export const personalInfo = {
  name: "Vyshnavi Madala",
  brandName: "Vyshnavi Madala",
  role: "AI / ML Engineer • Software Engineer • Data Analyst",
  city: "Nellore, AP",
  timezone: "Asia/Kolkata", // IANA timezone used by the live clock in the HUD
  email: "madalavyshnavi16@gmail.com",
  phone: "+91 7075348687",
  availability: "Open to AI, ML, SWE & Data roles (Full-time & Internships)",
};

export const academy = {
  name: "TAP Academy",
  url: "https://thetapacademy.com/",
};

export const socialLinks = {
  github: "https://github.com/Vyshu-coder",
  linkedin: "https://www.linkedin.com/in/vyshnavi-madala",
  instagram: "",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export const heroContent = {
  eyebrow: "PORTFOLIO — 2026",
  intro:
    "I engineer intelligent ML systems, robust software applications, and analytics pipelines—transforming complex data into deployed, real-world solutions.",
  statusLines: [
    "Engineering AI & ML solutions",
    "Building full-stack & scalable software",
    "Developing data & predictive pipelines",
    "Open to AI, ML & SWE opportunities",
  ],
  ctaPrimary: { label: "View projects", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const aboutContent = {
  label: "01 / About",
  heading: "Engineering intelligent models, software & data solutions.",
  paragraph:
    "I’m an AI and Data Science graduate (B.Tech, 2026) with hands-on experience spanning machine learning engineering, software development, and data analytics. From deploying deepfake detection models with 93.8% validation accuracy and publishing peer-reviewed research in NLP, to architecting analytics pipelines and full-stack web applications, I focus on building scalable, reliable solutions. Currently sharpening my full-stack and algorithmic problem-solving at TAP Academy to step into high-impact AI, ML, and Software Engineering roles.",
  stats: [
    { value: 7, suffix: "+", label: "Projects built" },
    { value: 93.8, suffix: "%", label: "Deepfake detection accuracy" },
    { value: 100, suffix: "k+", label: "Orders analyzed in EDA" },
  ],
};

export const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "Java", "SQL", "JavaScript"],
  },
  {
    title: "AI & ML",
    items: ["Machine Learning", "Deep Learning", "NLP", "TensorFlow"],
  },
  {
    title: "Software & Web",
    items: ["Data Structures & Algorithms", "React.js", "REST APIs", "Flask"],
  },
  {
    title: "Data & Tools",
    items: ["Pandas", "NumPy", "Power BI", "Git & GitHub", "OpenCV"],
  },
];

export const projects = [
  {
    id: "project-1",
    number: "01",
    title: "Deepfake Detector",
    description:
      "Full-stack web app that detects deepfake images and videos with EfficientNetB0, featuring user auth and an admin dashboard.",
    tags: ["TensorFlow", "Flask", "OpenCV"],
    year: "2026",
    liveUrl: "",
    githubUrl: "https://github.com/Vyshu-coder/deepfake-detector",
  },
  {
    id: "project-2",
    number: "02",
    title: "Sales Data Pipeline",
    description:
      "End-to-end analytics pipeline with a Star Schema model, KPI modules, and a sales dashboard.",
    tags: ["Python", "SQL", "Power BI"],
    year: "2026",
    liveUrl: "",
    githubUrl: "https://github.com/Vyshu-coder/sales-data-pipeline",
  },
  {
    id: "project-3",
    number: "03",
    title: "Olist E-commerce EDA",
    description:
      "Exploratory analysis of 100k+ e-commerce orders to uncover sales and customer trends.",
    tags: ["Python", "Pandas", "Matplotlib"],
    year: "2026",
    liveUrl: "",
    githubUrl: "https://github.com/Vyshu-coder/olist-eda-python",
  },
  {
    id: "project-4",
    number: "04",
    title: "Fake News Detection",
    description:
      "NLP classifier that flags fake news articles with vectorization and logistic regression modeling.",
    tags: ["Python", "Scikit-learn", "NLP"],
    year: "2026",
    liveUrl: "",
    githubUrl: "https://github.com/Vyshu-coder/fake-news-detection-ml-nlp",
  },
];

export const experience = [
  {
    period: "2026 — Present",
    role: "Placement Training",
    org: "TAP Academy",
    description:
      "Full-stack development, AI concepts, data structures, and interview preparation.",
  },
  {
    period: "2024",
    role: "AI Intern",
    org: "Edunet Foundation under IBM SkillsBuild",
    description:
      "Built an NLP chatbot on IBM WatsonX with Twilio for WhatsApp/SMS and deployed it on IBM Cloud.",
  },
  {
    period: "2022 — 2026",
    role: "B.Tech in Artificial Intelligence and Data Science",
    org: "JNN Institute of Engineering, Chennai",
    description:
      "Graduated with a CGPA of 8.88, focusing on machine learning, deep learning, and data analytics.",
  },
];

export const publications = [
  {
    id: "pub-1",
    title: "A Synergistic Approach to Real Time Text Translation and Speech Synthesis",
    journal: "IJARESM",
    date: "Jun 2024",
    summary:
      "Developed a multilingual system using Google Translate API and gTTS to enable real-time text translation and speech output across 15+ languages.",
    tags: ["NLP", "Speech Synthesis", "Google Translate API", "gTTS"],
    url: "https://www.ijaresm.com/a-synergistic-approach-to-real-time-text-translation-and-speech-synthesis",
  },
];

export const contactContent = {
  label: "05 / Contact",
  heading: "Let's build something.",
  note: "Have a role, a project or a question? Send a message — I reply within a day.",
};

export const footerContent = {
  tagline: "Designed & built by hand.",
};

// EmailJS — values come from .env.local (variables must start with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
