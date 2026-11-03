// Portfolio content taken from basitsheikh4772.github.io/abdulbasitsheikh.

export const about = {
  headline: "Engineer, team lead, problem solver.",
  paragraphs: [
    "Senior full stack developer and AI-assisted engineer with 9+ years of experience building e-commerce stores, WordPress and Shopify solutions, custom plugins, web platforms and cloud infrastructure for international clients. I lead teams, optimise performance and speed up delivery with modern AI workflows.",
    "Beyond day-to-day delivery I enjoy leading teams, tuning performance and exploring AI-assisted workflows that make software faster to build and easier to maintain.",
  ],
  values: [
    { n: "01", title: "Ownership", text: "I take responsibility for a project from the first idea to production, and I care about how it performs long after launch." },
    { n: "02", title: "Quality and speed", text: "Performance-first code and AI-assisted workflows help me deliver quickly without cutting corners." },
    { n: "03", title: "Clear communication", text: "Plain language, steady updates and no surprises, whether I am working solo or leading a team." },
  ],
  timezone: "Gulf Standard Time (UTC+4)",
};

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  icon: "Globe" | "BrainCircuit" | "Layers" | "Database" | "Smartphone" | "Workflow" | "Plug";
  items: { name: string; expert?: boolean }[];
};

const s = (...names: string[]) => names.map((name) => ({ name }));

export const skillGroups: SkillGroup[] = [
  {
    id: "ecom",
    title: "E-commerce & CMS",
    blurb: "Stores and content platforms that convert.",
    icon: "Globe",
    items: s(
      "Shopify Themes & Custom Apps", "Shopify Custom Theme Development (Liquid)", "Shopify Custom Sections & Bundle Builders", "Shopify API & Webhook Integrations",
      "WordPress / WooCommerce", "WordPress Custom Theme Development", "WordPress Custom Plugin Development", "Custom Elementor Widgets Development", "Gutenberg Custom Blocks (React)", "WooCommerce Customisation & Checkout",
      "BigCommerce", "BigCommerce Custom Theme Development (Stencil)", "BigCommerce Custom Widgets & Apps", "BigCommerce API Integrations",
      "Magento 2", "Moodle LMS", "Moodle Custom Plugin Development", "Moodle Custom Theme Development", "Moodle Web Services & API Integrations",
    ),
  },
  {
    id: "ai",
    title: "AI & Automation",
    blurb: "LLM apps, agents and workflow automation.",
    icon: "BrainCircuit",
    items: s(
      "LLM & Agent development", "FastAPI AI Services & Agent Backends", "LangChain", "RAG & knowledge bases", "Custom AI chatbots",
      "OpenAI & Claude API Integration", "n8n Workflow Automation", "Prompt engineering", "Claude · Codex workflows",
    ),
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Fast, polished interfaces.",
    icon: "Layers",
    items: s("React.js", "Next.js", "JavaScript / TypeScript", "Tailwind CSS", "shadcn/ui", "Magic UI", "Motion (Framer Motion)", "Three.js / React Three Fiber", "GSAP", "SASS", "Bootstrap", "HTML5 / CSS3"),
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "Solid APIs and application logic.",
    icon: "Database",
    items: [
      { name: "Laravel", expert: true },
      ...s("Core PHP 7–8", "Python · Flask · Django", "C# / .NET Web API", "Symfony", "CodeIgniter"),
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    blurb: "Cross-platform iOS and Android.",
    icon: "Smartphone",
    items: s("React Native", "Flutter / Dart", "REST API integration", "Android build & deploy"),
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    blurb: "Hosting, security and delivery pipelines.",
    icon: "Workflow",
    items: s(
      "AWS", "GCP", "Azure", "DigitalOcean", "Cloudflare", "Docker", "NGINX", "LAMP / LEMP", "Git · GitHub · GitLab",
      "CI/CD Pipelines (GitHub Actions · GitLab CI)", "AWS Lambda & Serverless Services", "Website Deployment & Server Setup",
      "WordPress Malware Cleanup & Security Hardening", "Cloud Server Cleanup, Hardening & Bug Fixing",
    ),
  },
  {
    id: "data",
    title: "Data & Integrations",
    blurb: "Databases, payments and third-party APIs.",
    icon: "Plug",
    items: s("MySQL / MariaDB", "PostgreSQL", "MongoDB", "Redis", "Stripe · PayPal", "Twilio", "AWS SES", "JWT / OAuth2"),
  },
];

export type Country = "Pakistan" | "UAE" | "United States";

export type Role = {
  role: string;
  company: string;
  logo: string;
  period: string;
  duration: string;
  place: string;
  country: Country;
  current?: boolean;
  /** start and end as decimal years, used to place the role on the timeline */
  from: number;
  to: number;
};

export const experience: Role[] = [
  { role: "Lead Software Engineer", company: "Yaynuts", logo: "/logos/yaynuts-CJT1qYsT.png", period: "2026 – Present", duration: "10 mo", place: "US", country: "United States", from: 2026.0, to: 2026.84, current: true },
  { role: "Lead Software Engineer (Contractual)", company: "Universal Cartons Industry (LLC)", logo: "/logos/universal-cartons-industry-Cm3tmXnc.jpg", period: "2024 – 2026", duration: "2 yrs", place: "Ajman", country: "UAE", from: 2024.0, to: 2026.0 },
  { role: "Lead Software Engineer", company: "Red Feather Tech", logo: "/logos/red-feather-tech-CNE7zq67.jpg", period: "Jul 2025 – Jan 2026", duration: "7 mo", place: "Karachi", country: "Pakistan", from: 2025.5, to: 2026.08 },
  { role: "Sr. Full Stack Developer", company: "XAutonomous", logo: "/logos/xautonomous-DECGAQHk.png", period: "Feb 2025 – May 2025", duration: "4 mo", place: "Dubai", country: "UAE", from: 2025.08, to: 2025.42 },
  { role: "Production Manager", company: "Skyfit International", logo: "/logos/skyfit-international-elGAn4Wn.jpg", period: "Oct 2023 – Feb 2025", duration: "1 yr 4 mo", place: "Karachi", country: "Pakistan", from: 2023.75, to: 2025.08 },
  { role: "Assistant Manager", company: "TechClone (Pvt) Ltd", logo: "/logos/techclone-ltd-Dtymrc8r.jpg", period: "Jan 2023 – Sep 2023", duration: "8 mo", place: "Karachi", country: "Pakistan", from: 2023.0, to: 2023.67 },
  { role: "Lead Software Engineer", company: "Mark360 — Digital Marketing Agency", logo: "/logos/mark360-DT2EAw_D.jpg", period: "Aug 2022 – Jun 2023", duration: "11 mo", place: "Karachi", country: "Pakistan", from: 2022.58, to: 2023.42 },
  { role: "Senior Full Stack Developer & DevOps Engineer", company: "The Web Gateway", logo: "/logos/the-web-gateway-Vp1EmJip.jpg", period: "Aug 2021 – Jun 2022", duration: "11 mo", place: "Karachi", country: "Pakistan", from: 2021.58, to: 2022.42 },
  { role: "Senior Full Stack & DevOps Engineer", company: "Learning Pitch", logo: "/logos/learning-pitch-BKdrIf6z.jpg", period: "Apr 2018 – Sep 2020", duration: "2 yrs 6 mo", place: "Karachi", country: "Pakistan", from: 2018.25, to: 2020.67 },
  { role: "Senior Web Developer", company: "EDLAB Pakistan", logo: "/logos/edlab-pakistan-BD1Rzl4X.jpg", period: "Jan 2017 – Jul 2018", duration: "1 yr 7 mo", place: "Karachi", country: "Pakistan", from: 2017.0, to: 2018.5 },
];

export const education = [
  { abbr: "NED", title: "Diploma in Software Engineering", school: "NED University", period: "2019 – 2021" },
  { abbr: "NED", title: "Diploma in Web Engineering", school: "NED University", period: "2017 – 2018" },
  { abbr: "GMI", title: "Diploma in C.I.T", school: "Govt. Monotechnic Institute", period: "" },
];

export const certifications = [
  { abbr: "AWS", title: "Architecting Solutions", issuer: "AWS" },
  { abbr: "G", title: "Foundations of User Experience (UX) Design", issuer: "Google" },
  { abbr: "IBM", title: "Cloud Computing & Software Engineering Essentials", issuer: "IBM" },
];
