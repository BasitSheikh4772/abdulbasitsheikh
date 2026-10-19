export const profile = {
  name: 'Abdul Basit Sheikh',
  titles: ['Senior Full Stack Developer', 'AI Integration Engineer', 'Cloud & DevOps Engineer'],
  summary:
    'Senior full stack developer and AI-assisted engineer with 9+ years of experience building e-commerce stores, WordPress and Shopify solutions, custom plugins, web platforms and cloud infrastructure for international clients. I lead teams, optimise performance and speed up delivery with modern AI workflows.',
  email: 'abdulbasitsheikh4772@gmail.com',
  linkedin: 'https://www.linkedin.com/in/basit-sheikh4772/',
  location: 'UAE · Pakistan',
  /** Dubai WhatsApp number, digits only, with country code */
  whatsapp: '971553769486',
}

export const stats = [
  { value: '9+', label: 'Years building for the web' },
  { value: '14', label: 'Live projects showcased' },
  { value: '10', label: 'Roles across teams & companies' },
  { value: '3', label: 'Cloud / UX certifications' },
]

export const experience = [
  { role: 'Lead Software Engineer', org: 'Yaynuts', place: 'US', period: '2026 – Present' },
  { role: 'Lead Software Engineer (Contractual)', org: 'Universal Cartons Industry (LLC)', place: 'Ajman, UAE', period: '2024 – 2026' },
  { role: 'Lead Software Engineer', org: 'Red Feather Tech', place: 'Karachi, PK', period: 'Jul 2025 – Jan 2026' },
  { role: 'Sr. Full Stack Developer', org: 'XAutonomous', place: 'Karachi, PK', period: 'Feb 2025 – May 2025' },
  { role: 'Production Manager', org: 'Skyfit International', place: 'Dubai, UAE', period: 'Oct 2023 – Feb 2025' },
  { role: 'Assistant Manager', org: 'TechClone (Pvt) Ltd', place: 'Karachi, PK', period: 'Jan 2023 – Sep 2023' },
  { role: 'Lead Software Engineer', org: 'Mark360 — Digital Marketing Agency', place: 'Karachi, PK', period: 'Aug 2022 – Jun 2023' },
  { role: 'Senior Full Stack Developer & DevOps Engineer', org: 'The Web Gateway', place: 'Karachi, PK', period: 'Aug 2021 – Jun 2022' },
  { role: 'Senior Full Stack & DevOps Engineer', org: 'Learning Pitch', place: 'Karachi, PK', period: 'Apr 2018 – Sep 2020' },
  { role: 'Senior Web Developer', org: 'EDLAB Pakistan', place: 'Karachi, PK', period: 'Jan 2017 – Jul 2018' },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'E-commerce & CMS', items: ['Shopify Themes & Custom Apps', 'WordPress / WooCommerce', 'Elementor Widgets', 'Gutenberg (React)', 'BigCommerce', 'Magento 2', 'Moodle LMS'] },
  { group: 'Frontend', items: ['React.js', 'Next.js', 'JavaScript / TypeScript', 'Tailwind CSS', 'GSAP', 'SASS', 'Bootstrap', 'HTML5 / CSS3'] },
  { group: 'Backend', items: ['Laravel (Expert)', 'Core PHP 7–8', 'Python · Flask · Django', 'C# / .NET Web API', 'Symfony', 'CodeIgniter'] },
  { group: 'AI & Automation', items: ['LLM & Agent development', 'LangChain', 'RAG & knowledge bases', 'Custom AI chatbots', 'Prompt engineering', 'Claude · Codex workflows'] },
  { group: 'Mobile', items: ['React Native', 'Flutter / Dart', 'REST API integration', 'Android build & deploy'] },
  { group: 'DevOps & Cloud', items: ['AWS', 'GCP', 'Azure', 'DigitalOcean', 'Cloudflare', 'Docker', 'NGINX', 'LAMP / LEMP', 'Git · GitHub · GitLab'] },
  { group: 'Data & Integrations', items: ['MySQL / MariaDB', 'PostgreSQL', 'MongoDB', 'Redis', 'Stripe · PayPal', 'Twilio', 'AWS SES', 'JWT / OAuth2'] },
]

export const education = [
  { title: 'Diploma in Software Engineering', org: 'NED University', period: '2019 – 2021' },
  { title: 'Diploma in Web Engineering', org: 'NED University', period: '2017 – 2018' },
  { title: 'Diploma in C.I.T', org: 'Govt. Monotechnic Institute', period: '' },
]

export const certifications = [
  { title: 'Architecting Solutions', org: 'AWS' },
  { title: 'Foundations of User Experience (UX) Design', org: 'Google' },
  { title: 'Cloud Computing & Software Engineering Essentials', org: 'IBM' },
]

export type Project = {
  id: string
  name: string
  url: string
  category: string
  description: string
  tags: string[]
  /** true when the site's response headers allow embedding in an iframe */
  frameable: boolean
}

export const projects: Project[] = [
  { id: 'obvi', name: 'Obvi', url: 'https://myobvi.com/', category: 'Shopify · DTC wellness', description: 'Storefront for Obvi, a collagen wellness brand: bold brand-led homepage, merchandised collections and a conversion-focused path to purchase.', tags: ['Shopify', 'Liquid', 'Performance'], frameable: false },
  { id: 'origin', name: 'Obvi — Best Sellers', url: 'https://myobvi.com/collections/best-seller-origin', category: 'Shopify · Collection', description: 'Best-sellers collection page with rich product cards, badges and clear calls to action that guide shoppers to the top products.', tags: ['Shopify', 'Collections', 'CRO'], frameable: false },
  { id: 'yaynuts', name: 'Yaynuts', url: 'https://yaynuts.com/', category: 'Shopify · Snack brand', description: 'Storefront for a snack brand with a vibrant brand-led homepage, detailed product pages and a streamlined path to checkout.', tags: ['Shopify', 'Custom theme', 'JS'], frameable: false },
  { id: 'yaynuts-bundle', name: 'Yaynuts Bundle Builder', url: 'https://yaynuts.com/pages/bundle-builder-1oz', category: 'Custom feature · Bundles', description: 'Interactive bundle builder where shoppers pick flavours to create their own pack, with live progress and one-step add to cart.', tags: ['Shopify', 'JavaScript', 'Cart API'], frameable: false },
  { id: 'sweetums', name: 'Sweetums', url: 'https://getsweetums.com/', category: 'Shopify · Confectionery', description: 'Playful, mobile-first storefront for a sweets brand with custom sections and a smooth shopping experience.', tags: ['Shopify', 'UI', 'Mobile-first'], frameable: false },
  { id: 'sweetums-bundle', name: 'Sweetums Bundle Builder', url: 'https://getsweetums.com/pages/sweetums-bundle-builder', category: 'Custom feature · Bundles', description: 'Pick-and-mix bundle builder that guides customers through choosing flavours before adding the full bundle to cart.', tags: ['Shopify', 'JavaScript', 'Bundles'], frameable: false },
  { id: 'onlybean', name: 'The Only Bean', url: 'https://theonlybean.com/products/crunchy-edamame-09oz?view=bundle-small', category: 'Shopify · Product + bundle', description: 'Product page for crunchy edamame snacks with a built-in bundle view: clear variant selection, savings messaging and a focused buy box.', tags: ['Shopify', 'PDP', 'Bundles'], frameable: false },
  { id: 'chocbox', name: 'Chocbox LA', url: 'https://chocboxla.com/', category: 'Shopify · Gifting', description: 'Premium gifting storefront with rich imagery and curated collections.', tags: ['Shopify', 'Design', 'Storefront'], frameable: false },
  { id: 'javvy', name: 'Javvy Coffee', url: 'https://javvycoffee.com/', category: 'Shopify · Coffee', description: 'Storefront for a coffee brand with flavour-led collections, promotional sections and a fast, conversion-minded layout.', tags: ['Shopify', 'Theme dev', 'Speed'], frameable: true },
  { id: 'gruns', name: 'Gruns — Nutrition Support', url: 'https://gruns.co/pages/nutrition-support', category: 'Shopify · Landing page', description: 'Long-form nutrition landing page with structured content blocks, social proof and clear calls to action.', tags: ['Shopify', 'Landing page', 'Content'], frameable: false },
  { id: 'menerals', name: 'Menerals — Menergy', url: 'https://menerals.com/pages/menergy', category: 'Shopify · Product landing', description: 'Product landing page for the Menergy line, built around benefit storytelling, sourcing and ingredients, with a direct path to purchase.', tags: ['Shopify', 'Landing page', 'Branding'], frameable: false },
  { id: 'noor', name: 'Noor Food Manufacturing', url: 'https://noormfg.com/', category: 'B2B · Manufacturing', description: 'Corporate website for a B2B food manufacturer covering services, facility and equipment, certifications and FAQs, with a quote-request flow.', tags: ['Web', 'B2B', 'Lead gen'], frameable: false },
  { id: 'idarulehsan', name: 'Idarul Ehsan', url: 'https://idarulehsan.org/', category: 'Non-profit · Website', description: 'Community organisation website with prayer timings, programs and clear ways to get involved and support.', tags: ['Web', 'Non-profit', 'Responsive'], frameable: true },
  { id: 'scalehouse', name: 'ScaleHouse', url: 'https://scalehouse.co/', category: 'Agency · TikTok Shop', description: 'Marketing site for a TikTok Shop growth agency: dark, high-contrast design, a video carousel and a book-a-call funnel.', tags: ['Web', 'Animation', 'Lead gen'], frameable: true },
]

/** Countries shown as "active" on the globe. `id` is the ISO 3166-1 numeric code.
 *  Edit/add entries here (e.g. the UK is 826) and they light up automatically. */
export type Region = { id: number; name: string; flag: string; role: string; center: [number, number]; items: string[] }
export const regions: Region[] = [
  {
    id: 840, name: 'United States', flag: 'US', role: 'Client brands & stores', center: [39, -98],
    items: ['Obvi', 'Yaynuts', 'Sweetums', 'The Only Bean', 'Chocbox LA', 'Javvy Coffee', 'Gruns', 'Menerals', 'ScaleHouse', 'Idarul Ehsan'],
  },
  {
    id: 784, name: 'United Arab Emirates', flag: 'AE', role: 'Roles & delivery', center: [24.4, 54.4],
    items: ['Universal Cartons Industry (Ajman)', 'Skyfit International (Dubai)'],
  },
  {
    id: 586, name: 'Pakistan', flag: 'PK', role: 'Home base & engineering teams', center: [30, 69.5],
    items: ['Red Feather Tech', 'XAutonomous', 'TechClone', 'Mark360', 'The Web Gateway', 'Learning Pitch', 'EDLAB Pakistan'],
  },
]

export const services = [
  {
    id: 'shopify', icon: 'shopping', title: 'Shopify Stores & Custom Features',
    blurb: 'Conversion-focused themes, landing pages and custom features such as bundle builders, built to turn traffic into orders.',
    points: ['Custom theme development & redesigns', 'Bundle builders, upsells & subscriptions', 'Speed optimisation & app integrations'],
    price: '$300', unit: 'per project', note: 'Custom features from $100',
  },
  {
    id: 'wordpress', icon: 'blocks', title: 'WordPress & WooCommerce',
    blurb: 'Fast, secure and easy-to-manage websites and online stores, built on clean custom code instead of bloated page builders.',
    points: ['Custom themes, Elementor & Gutenberg', 'WooCommerce store customisation', 'Security, caching & speed tuning'],
    price: '$250', unit: 'per project', note: 'Migrations & maintenance on request',
  },
  {
    id: 'plugins', icon: 'key', title: 'Custom Plugins & Licensing Systems',
    blurb: 'Purpose-built WordPress and WooCommerce plugins, plus your own licensing platform to sell and protect them.',
    points: ['Custom plugin & Gutenberg block development', 'License server: keys, activation limits, updates', 'Stripe / PayPal and REST API integration'],
    price: '$150', unit: 'per plugin', note: 'Full license systems from $500',
  },
  {
    id: 'web', icon: 'code', title: 'Custom Web Apps & Portals',
    blurb: 'Tailor-made platforms, dashboards and customer portals on Laravel, React, Next.js, .NET or Python.',
    points: ['Business apps, dashboards & portals', 'REST APIs, authentication & payments', 'Scalable architecture and clean code'],
    price: '$800', unit: 'per project', note: 'Scoped after a discovery call',
  },
  {
    id: 'ai', icon: 'bot', title: 'AI Chatbots & Automation',
    blurb: 'Practical AI that saves your team hours: assistants trained on your own content and workflows that run themselves.',
    points: ['Custom chatbots & AI agents (LangChain)', 'RAG over your documents & knowledge base', 'LLM API integrations & automation'],
    price: '$400', unit: 'per project', note: 'Ongoing tuning available',
  },
  {
    id: 'mobile', icon: 'mobile', title: 'Mobile Apps',
    blurb: 'Cross-platform iOS and Android apps with a clean interface and solid backend integration.',
    points: ['React Native & Flutter development', 'API & backend integration', 'Android build and store deployment'],
    price: '$1,000', unit: 'per project', note: 'Scoped after a discovery call',
  },
  {
    id: 'devops', icon: 'cloud', title: 'Cloud, DevOps & Performance',
    blurb: 'Reliable hosting, secure servers and a stack that stays fast and available as you grow.',
    points: ['AWS, GCP, Azure, DigitalOcean & Cloudflare', 'Docker, NGINX, CI/CD & server hardening', 'Monitoring, backups & speed optimisation'],
    price: '$200', unit: 'setup', note: 'Maintenance plans from $75 / month',
  },
  {
    id: 'lms', icon: 'lms', title: 'Moodle LMS & E-learning',
    blurb: 'Learning platforms tailored to your courses, branding and users, with custom plugins and integrations.',
    points: ['Moodle theme & plugin development', 'Web services and API integration', 'Performance, security & maintenance'],
    price: '$350', unit: 'per project', note: 'Scoped after a discovery call',
  },
  {
    id: 'lead', icon: 'team', title: 'Technical Leadership',
    blurb: 'A senior engineer to own delivery: architecture decisions, code review and leading your development team.',
    points: ['Architecture & tech-stack decisions', 'Lead engineer / team lead on contract', 'Code reviews and delivery management'],
    price: 'Custom', unit: 'monthly engagement', note: 'Agreed per scope',
  },
]

export const process = [
  { step: '01', title: 'Discover', text: 'A short call to understand your goals, audience and constraints, then a clear scope and plan.' },
  { step: '02', title: 'Design & plan', text: 'Structure, user flows and technical approach agreed up front, so there are no surprises later.' },
  { step: '03', title: 'Build', text: 'Clean, fast, tested code with regular progress updates and previews you can click through.' },
  { step: '04', title: 'Launch & grow', text: 'Smooth go-live, performance checks and ongoing support as your store or product grows.' },
]

export const faqs = [
  { q: 'What services do you offer?', a: 'Shopify and WordPress/WooCommerce development, custom plugins and licensing systems, custom web apps, AI chatbots and automation, mobile apps, Moodle LMS, and cloud/DevOps. If it is web or software, send it over and I will tell you honestly whether I am the right fit.' },
  { q: 'How does pricing work?', a: 'Each service above shows a starting price. These are promotional prices for your first order when you contact me directly through the form, WhatsApp or email. The final cost depends on scope, integrations and timeline, and after a short discovery call you receive a clear written quote before any work begins.' },
  { q: 'Can you build a WordPress plugin with its own license system?', a: 'Yes. I build custom WordPress and WooCommerce plugins together with the licensing platform around them: license key generation, domain activation limits, automatic update delivery and Stripe or PayPal purchase flows.' },
  { q: 'Can you work on my existing store or website?', a: 'Yes. I can take over an existing site for redesigns, new features, speed and security improvements, and migrations, without starting from scratch.' },
  { q: 'How do we get started?', a: 'Send a message through the form or WhatsApp with a short description of what you need. We then book a quick call to agree scope, timeline and cost.' },
  { q: 'Do you offer support after launch?', a: 'Yes. I offer ongoing maintenance, fixes and new features after go-live, including cloud monitoring and updates, so your site stays fast and secure.' },
]



export const pillars = [
  { n: '01', title: 'One accountable engineer', text: 'Planning, design-to-code, build and launch handled by one senior person, so nothing gets lost between handoffs.' },
  { n: '02', title: 'Fast and well built', text: 'AI-assisted workflows and performance-first code mean quicker delivery without cutting corners on quality.' },
  { n: '03', title: 'Transparent at every step', text: 'Clear scope, regular updates and live previews, so you always know where the project stands.' },
]

/** [start, end] as decimal years (e.g. 2025.5 = Jul 2025). end = null means "present". */
export const experienceSpans: Record<string, [number, number | null]> = {
  'Yaynuts': [2026.0, null],
  'Universal Cartons Industry (LLC)': [2024.0, 2026.0],
  'Red Feather Tech': [2025.5, 2026.08],
  'XAutonomous': [2025.08, 2025.42],
  'Skyfit International': [2023.75, 2025.08],
  'TechClone (Pvt) Ltd': [2023.0, 2023.67],
  'Mark360 — Digital Marketing Agency': [2022.58, 2023.5],
  'The Web Gateway': [2021.58, 2022.5],
  'Learning Pitch': [2018.25, 2020.75],
  'EDLAB Pakistan': [2017.0, 2018.58],
}
