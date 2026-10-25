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
  { value: '55', label: 'Live projects showcased' },
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
  { group: 'E-commerce & CMS', items: ['Shopify Themes & Custom Apps', 'Shopify Custom Theme Development (Liquid)', 'Shopify Custom Sections & Bundle Builders', 'Shopify API & Webhook Integrations', 'WordPress / WooCommerce', 'WordPress Custom Theme Development', 'WordPress Custom Plugin Development', 'Custom Elementor Widgets Development', 'Gutenberg Custom Blocks (React)', 'WooCommerce Customisation & Checkout', 'BigCommerce', 'BigCommerce Custom Theme Development (Stencil)', 'BigCommerce Custom Widgets & Apps', 'BigCommerce API Integrations', 'Magento 2', 'Moodle LMS', 'Moodle Custom Plugin Development', 'Moodle Custom Theme Development', 'Moodle Web Services & API Integrations'] },
  { group: 'Frontend', items: ['React.js', 'Next.js', 'JavaScript / TypeScript', 'Tailwind CSS', 'GSAP', 'SASS', 'Bootstrap', 'HTML5 / CSS3'] },
  { group: 'Backend', items: ['Laravel (Expert)', 'Core PHP 7–8', 'Python · Flask · Django', 'C# / .NET Web API', 'Symfony', 'CodeIgniter'] },
  { group: 'AI & Automation', items: ['LLM & Agent development', 'FastAPI AI Services & Agent Backends', 'LangChain', 'RAG & knowledge bases', 'Custom AI chatbots', 'OpenAI & Claude API Integration', 'n8n Workflow Automation', 'Prompt engineering', 'Claude · Codex workflows'] },
  { group: 'Mobile', items: ['React Native', 'Flutter / Dart', 'REST API integration', 'Android build & deploy'] },
  { group: 'DevOps & Cloud', items: ['AWS', 'GCP', 'Azure', 'DigitalOcean', 'Cloudflare', 'Docker', 'NGINX', 'LAMP / LEMP', 'Git · GitHub · GitLab', 'CI/CD Pipelines (GitHub Actions · GitLab CI)', 'AWS Lambda & Serverless Services', 'Website Deployment & Server Setup', 'WordPress Malware Cleanup & Security Hardening', 'Cloud Server Cleanup, Hardening & Bug Fixing'] },
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
  // Education & web platforms
  { id: 'learningpitch', name: 'Learning Pitch', url: 'https://learningpitch.com/', category: 'E-learning · Platform', description: "Digital learning platform for Pakistan's professional qualification students, with course catalogue, exam-prep tracks and a single-click student login.", tags: ['E-learning', 'LMS', 'Web'], frameable: true },
  { id: 'tsb', name: 'TSB Education', url: 'https://tsbeducation.com/', category: 'E-learning · Platform', description: 'The School of Business Education: a course and exam-prep portal with free trials, product pages and a student login.', tags: ['E-learning', 'LMS', 'Web'], frameable: true },
  { id: 'myinteracademy', name: 'My Inter Academy', url: 'https://myinteracademy.com/', category: 'E-learning · Platform', description: 'Online academy for intermediate students with first-year, second-year and entry-test programmes, plus a clear student login.', tags: ['E-learning', 'LMS', 'Web'], frameable: true },
  { id: 'houseoflnd', name: 'House of LND', url: 'https://houseoflnd.com/', category: 'E-learning · LMS', description: 'Learning management system for personal and corporate training, with interactive courses, assessments and analytics.', tags: ['LMS', 'Analytics', 'Web'], frameable: false },
  { id: 'tlc', name: 'The Learning Centre', url: 'https://tlc.careforedu.com/', category: 'E-learning · School LMS', description: 'School LMS portal where students and teachers follow daily updates, announcements and course content.', tags: ['LMS', 'Education', 'Web'], frameable: false },
  { id: 'careforedu', name: 'Care for Education', url: 'https://careforedu.com/', category: 'E-learning · Education network', description: 'Education network homepage that connects partner schools to their own LMS portals.', tags: ['Education', 'Web', 'Multi-site'], frameable: false },
  { id: 'brainfield', name: 'Brainfield School LMS', url: 'https://lms.mybrainfield.com/', category: 'E-learning · School LMS', description: 'Branded Moodle login and learning portal for Brainfield School students.', tags: ['Moodle', 'LMS', 'Branding'], frameable: false },
  { id: 'bioz', name: 'Bio-Z', url: 'https://bio-z.org/', category: 'EdTech · Science learning', description: 'Science education brand with engaging trivia, reward programmes and a mission-led, animated homepage.', tags: ['EdTech', 'Web', 'Animation'], frameable: true },
  // Web apps & products
  { id: 'cwrt', name: 'CWRT', url: 'https://cwrthrive.com/', category: 'Web app · Health & fitness', description: 'Subscription fitness platform delivering personalised exercise plans, meal plans and grocery lists, with a 7-day free trial funnel.', tags: ['Web app', 'Subscriptions', 'Funnel'], frameable: false },
  { id: 'sportsfinda', name: 'SportsFinda', url: 'https://sportsfinda.com/', category: 'Web app · Sports data', description: 'Ride-data dashboard for uploading, searching and filtering sports sessions with sync status and sortable activity tables.', tags: ['Web app', 'Dashboard', 'Data'], frameable: true },
  { id: 'productshare', name: 'ProductShare', url: 'https://productshare.co/', category: 'Marketplace · Cashback', description: 'Shopping and sharing marketplace where shoppers earn cashback when friends buy the products they share.', tags: ['Marketplace', 'Cashback', 'Web'], frameable: false },
  // More stores
  { id: 'perfy', name: 'Perfy Soda', url: 'https://drinkperfy.com/', category: 'Shopify · Beverage', description: 'Vibrant DTC storefront for a caffeine-free, low-sugar soda brand, with flavour-led merchandising and subscribe-and-save.', tags: ['Shopify', 'DTC', 'Subscriptions'], frameable: false },
  { id: 'manchester', name: 'Manchester', url: 'https://manchester.com.mx/', category: 'E-commerce · Menswear', description: "Spanish-language menswear store with dress shirts, guayaberas and knitwear, built around clear category navigation and best sellers.", tags: ['E-commerce', 'Fashion', 'Spanish'], frameable: false },
  { id: 'samsab', name: 'Sam & Sab Baby', url: 'https://samandsabbaby.com/', category: 'E-commerce · Baby store', description: 'Boutique baby store with gear, clothing, feeding and a gift registry, organised through a clean mega-menu.', tags: ['E-commerce', 'Registry', 'Catalogue'], frameable: false },
  { id: 'rostovsky', name: 'Rostovsky Watches', url: 'https://rostovskywatches.com/', category: 'E-commerce · Luxury watches', description: 'Storefront for new and pre-owned independent watches, with full-bleed hero imagery, brand pages and a trust-led buying experience.', tags: ['E-commerce', 'Luxury', 'Design'], frameable: true },
  { id: 'duckworxs', name: 'Duck Worx', url: 'https://www.duckworxs.com/', category: 'E-commerce · Taxidermy supplies', description: 'Niche online shop for waterfowl and wildlife taxidermy supplies, with kits, forms, eyes and bases for professionals.', tags: ['E-commerce', 'Catalogue', 'B2B'], frameable: false },
  { id: 'oyobox', name: 'OYOBox', url: 'https://www.oyobox.com/', category: 'E-commerce · Storage', description: 'Premium storage store for eyewear, tech gear and travel with colourful product photography and a clear shop flow.', tags: ['E-commerce', 'Product design', 'Web'], frameable: false },
  { id: 'pcgalore', name: 'PC Galore', url: 'https://www.pcgalore.com/', category: 'E-commerce · Computer repair', description: 'Vancouver computer repair and refurbished-computer shop, with a product store, service pages and digitising services.', tags: ['E-commerce', 'Local business', 'Services'], frameable: true },
  // Business & service websites
  { id: 'gci', name: 'GCI Consulting', url: 'https://gciconsulting.com/', category: 'Corporate · Banking software', description: 'Corporate site for a banking software implementation partner, covering services, careers, clients and office locations.', tags: ['Corporate', 'Web', 'B2B'], frameable: true },
  { id: 'aaxon', name: 'Aaxon Solutions', url: 'https://aaxonsolutions.com/', category: 'Corporate · IT & AI', description: 'Company website for an IT and AI solutions provider offering SAP consulting, cloud services and software development.', tags: ['Corporate', 'IT services', 'AI'], frameable: true },
  { id: 'hartland', name: 'Hartland Restoration', url: 'https://hartlandrestoration.com/', category: 'Local business · Restoration', description: '24/7 water damage and roofing restoration site with emergency calls to action, service pages and insurance claim help.', tags: ['Local business', 'Lead gen', 'Web'], frameable: true },
  { id: 'fastpro', name: 'Fast Pro Blinds', url: 'https://www.fastproblindsanddrapery.com/', category: 'Local business · Window coverings', description: 'San Antonio blinds, shades and shutters company site with a service catalogue and quote-driven lead generation.', tags: ['Local business', 'Catalogue', 'Lead gen'], frameable: false },
  { id: 'mindy', name: 'Mindy Swimming', url: 'https://mindyswimming.com/', category: 'Local business · Swim school', description: 'Des Moines swim school website for private, group and kids classes, with lessons, instructors and class information.', tags: ['Local business', 'Services', 'Web'], frameable: true },
  { id: 'kltat', name: 'KLTAT', url: 'https://ksluxurytransportation.com/', category: 'Travel · Private tours', description: 'New Orleans private tours and luxury airport transfer company site with tour details and a clear booking flow.', tags: ['Travel', 'Booking', 'Web'], frameable: true },
  { id: 'dockweiler', name: 'Dockweiler Luxury Cruises', url: 'https://dockweilerluxurycruises.com/', category: 'Travel · Cruise agent', description: 'Personal travel advisor site for a luxury cruise agent, with specialties, contact options and a destination showcase.', tags: ['Travel', 'Personal brand', 'Web'], frameable: true },
  { id: 'nineteen', name: '9Teen Boutique', url: 'https://9teenboutique.com/', category: 'E-commerce · Women’s fashion', description: 'Trend-led women’s fashion store with new arrivals, style categories, recommended products, a lookbook and customer reviews.', tags: ['E-commerce', 'Fashion', 'Storefront'], frameable: false },
  { id: 'ddconsulting', name: 'D&D Consulting Nexus', url: 'https://ddconsultingandassociates.com/', category: 'Corporate · Tax & consulting', description: 'Digital headquarters for a tax planning and business growth consultancy, with tiered partnership services and a story-led, editorial layout.', tags: ['Corporate', 'Consulting', 'Web'], frameable: false },
  { id: 'drleah', name: 'Dr. Leah Riddick Cunningham', url: 'https://drleahriddickcunningham.com/', category: 'Personal brand · Wellness', description: 'Personal brand site for an emotional health and wellness educator, with a warm hero, booking call to action and social links.', tags: ['Personal brand', 'Wellness', 'Web'], frameable: true },
  { id: 'freedomlaw', name: 'Freedom Law', url: 'https://www.freedomlawnc.com/', category: 'Law firm · Website', description: 'Charlotte family law firm website covering practice areas, awards, testimonials, a consultation form and a blog.', tags: ['Law firm', 'Lead gen', 'Blog'], frameable: false },
  { id: 'lakewood', name: 'Lakewood Roofing', url: 'https://www.lakewoodroofingwa.com/', category: 'Local business · Roofing', description: 'Roofing and restoration contractor site for Lakewood, WA, with service categories, a step-by-step process, reviews and expert tips.', tags: ['Local business', 'Lead gen', 'Services'], frameable: false },
  { id: 'newbys', name: 'Newby’s Nibbles', url: 'https://www.newbysnibbles.com/', category: 'Brand · Landing page', description: 'Bold single-page brand landing with a repeating fork-and-spoon pattern hero and a clear start-now call to action.', tags: ['Landing page', 'Branding', 'Web'], frameable: true },
  { id: 'paogarcia', name: 'Paola Garcia Consulting', url: 'https://www.paogarcia.com/', category: 'Personal brand · Consulting', description: 'Spanish-language consultant website with image consulting, masterclass offers and a personal-brand focused layout.', tags: ['Personal brand', 'Consulting', 'Spanish'], frameable: true },
  { id: 'digitalsilk', name: 'Digital Silk', url: 'https://www.digitalsilk.com/', category: 'Agency · Web design', description: 'Long-form agency site for a web design and digital marketing firm, with featured projects, service breakdowns, process, case studies and client logos.', tags: ['Agency', 'Web design', 'Portfolio'], frameable: false },
  { id: 'essayshark', name: 'EssayShark', url: 'https://essayshark.com/', category: 'Platform · Writing marketplace', description: 'Writing service marketplace where students choose their own writer, manage cost through bidding and chat with the writer directly.', tags: ['Marketplace', 'Bidding', 'Web app'], frameable: false },
  { id: 'wearthepants', name: 'Wear The Pants', url: 'https://wearthepantsshop.com/', category: 'E-commerce · Women’s fashion', description: 'Bold, playful fashion storefront with fresh drops, a hot list, sale banners and style inspiration, priced in AED.', tags: ['E-commerce', 'Fashion', 'Storefront'], frameable: false },
  { id: 'instasmile', name: 'Instasmile UK', url: 'https://uk.instasmile.com/', category: 'E-commerce · Dental', description: 'UK store for custom-made clip-on veneers, with before and after results, a how-it-works flow, FAQs and clear ordering steps.', tags: ['E-commerce', 'Health', 'Conversion'], frameable: false },
  { id: 'aimfg', name: 'American Innovative Manufacturing', url: 'https://www.ai-mfg.com/', category: 'E-commerce · Industrial tools', description: 'Storefront for a maker of battery-powered dent pullers and high-powered welders, with seasonal promos, featured products and parts.', tags: ['E-commerce', 'Manufacturing', 'Catalogue'], frameable: true },
  { id: 'hatheat', name: 'Hat Heat', url: 'https://hatheat.com/', category: 'E-commerce · Headwear', description: 'Sports headwear store with featured and recently added hats, fitted and snapback collections, pins and a shop-by-team browse.', tags: ['E-commerce', 'Sports', 'Catalogue'], frameable: false },
  { id: 'fastproblinds', name: 'Fast Pro Blinds', url: 'https://fastproblinds.com/', category: 'Local business · Window treatments', description: 'San Antonio window treatment company site presenting blinds, shades and motorization, brand partners, reviews and a step-by-step process.', tags: ['Local business', 'Services', 'Lead gen'], frameable: true },
  { id: 'busters', name: 'Buster’s Industrial Supply', url: 'https://bustersindustrial.com/', category: 'E-commerce · Industrial supply', description: 'Fort Worth industrial and VMI supplier store with a product catalog, diamond blades, MRO and cleaning supplies for contractors.', tags: ['E-commerce', 'B2B', 'Catalogue'], frameable: false },
  { id: 'goldenthread', name: 'Golden Thread', url: 'https://goldenthreadshop.com/', category: 'E-commerce · Jewelry', description: 'Storefront for hand-made, customizable jewelry with new arrivals, curated collections and a retail store feature.', tags: ['E-commerce', 'Jewelry', 'Personalization'], frameable: false },
  { id: 'creativelogo', name: 'Creative Logo Design', url: 'https://creativelogodesign.co.uk/', category: 'Agency · Design & development', description: 'UK design and development agency site with a bold dark layout and an on-page project enquiry form.', tags: ['Agency', 'Lead gen', 'Design'], frameable: false },
]

/** Which country each project was built for. Edit a code here and the globe, the hover card and the
 *  project filters all follow. Codes: US, CA, MX, GB, AE, PK. */
export type CountryCode = 'US' | 'CA' | 'MX' | 'GB' | 'AE' | 'PK'
export const projectCountry: Record<string, CountryCode> = {
  obvi: 'US', yaynuts: 'US', 'yaynuts-bundle': 'US', sweetums: 'US', 'sweetums-bundle': 'US', onlybean: 'US',
  chocbox: 'US', javvy: 'US', gruns: 'US', menerals: 'US', noor: 'US', idarulehsan: 'US', scalehouse: 'US',
  perfy: 'US', productshare: 'US', samsab: 'US', rostovsky: 'US', oyobox: 'US', duckworxs: 'US', nineteen: 'US',
  fastpro: 'US', mindy: 'US', kltat: 'US', lakewood: 'US', freedomlaw: 'US', dockweiler: 'US', hartland: 'US',
  cwrt: 'US', bioz: 'US', sportsfinda: 'US', paogarcia: 'US', drleah: 'US', ddconsulting: 'US', newbys: 'US',
  digitalsilk: 'US', essayshark: 'US', aimfg: 'US', hatheat: 'US', fastproblinds: 'US', busters: 'US', goldenthread: 'US',
  pcgalore: 'CA',
  manchester: 'MX',
  creativelogo: 'GB', instasmile: 'GB',
  gci: 'AE', aaxon: 'AE', wearthepants: 'AE',
  learningpitch: 'PK', tsb: 'PK', myinteracademy: 'PK', houseoflnd: 'PK', tlc: 'PK', careforedu: 'PK', brainfield: 'PK',
}

/** Countries shown as "active" on the globe. `id` is the ISO 3166-1 numeric code.
 *  `roles` are employers / teams in that country; the projects list is built from `projectCountry`. */
export type Region = { id: number; name: string; flag: CountryCode; role: string; center: [number, number]; roles: string[]; projects: string[] }
const regionBase: Omit<Region, 'projects'>[] = [
  { id: 840, name: 'United States', flag: 'US', role: 'Client brands & stores', center: [39, -98], roles: ['Yaynuts'] },
  { id: 124, name: 'Canada', flag: 'CA', role: 'Client work', center: [54, -102], roles: [] },
  { id: 484, name: 'Mexico', flag: 'MX', role: 'Client work', center: [23.6, -102.5], roles: [] },
  { id: 826, name: 'United Kingdom', flag: 'GB', role: 'Client work', center: [54, -2], roles: [] },
  { id: 784, name: 'United Arab Emirates', flag: 'AE', role: 'Roles & delivery', center: [24.4, 54.4], roles: ['Universal Cartons Industry (Ajman)', 'Skyfit International (Dubai)'] },
  { id: 586, name: 'Pakistan', flag: 'PK', role: 'Home base & engineering teams', center: [30, 69.5], roles: ['Red Feather Tech', 'XAutonomous', 'TechClone', 'Mark360', 'The Web Gateway', 'Learning Pitch', 'EDLAB Pakistan'] },
]
export const regions: Region[] = regionBase.map((r) => ({
  ...r,
  projects: projects.filter((p) => projectCountry[p.id] === r.flag).map((p) => p.name),
}))

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

export const pillars = [
  { n: '01', title: 'Ownership', text: 'I take responsibility for a project from the first idea to production, and I care about how it performs long after launch.' },
  { n: '02', title: 'Quality and speed', text: 'Performance-first code and AI-assisted workflows help me deliver quickly without cutting corners.' },
  { n: '03', title: 'Clear communication', text: 'Plain language, steady updates and no surprises, whether I am working solo or leading a team.' },
]
