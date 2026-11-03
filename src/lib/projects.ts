// All 55 live projects, taken from the portfolio at basitsheikh4772.github.io/abdulbasitsheikh.
// Preview images live in public/projects/<img>.

export type ProjectType = "Storefronts" | "Platforms & apps" | "Custom features" | "Landing pages" | "Websites";

export type Project = {
  title: string;
  domain: string;
  kind: string;
  text: string;
  img: string;
  live: boolean;
  tags: string[];
  type: ProjectType;
  country: string;
};

export const projectTypes: ProjectType[] = ["Storefronts", "Platforms & apps", "Custom features", "Landing pages", "Websites"];

const p = (
  title: string,
  domain: string,
  kind: string,
  text: string,
  img: string,
  live: 0 | 1,
  tags: string[],
  type: ProjectType,
  country: string,
): Project => ({ title, domain, kind, text, img: `/projects/${img}`, live: !!live, tags, type, country });

export const projects: Project[] = [
  p("Obvi", "myobvi.com", "Shopify · DTC Wellness", "Storefront for Obvi, a collagen wellness brand: bold brand-led homepage, merchandised collections and a conversion-focused path to purchase.", "obvi.webp", 0, ["Shopify", "Liquid", "Performance"], "Storefronts", "United States"),
  p("Yaynuts", "yaynuts.com", "Shopify · Snack brand", "Storefront for a snack brand with a vibrant brand-led homepage, detailed product pages and a streamlined path to checkout.", "yaynuts.webp", 0, ["Shopify", "Custom theme", "JS"], "Storefronts", "United States"),
  p("Yaynuts Bundle Builder", "yaynuts.com", "Custom feature · Bundles", "Interactive bundle builder where shoppers pick flavours to create their own pack, with live progress and one-step add to cart.", "yaynuts-bundle.webp", 0, ["Shopify", "JavaScript", "Cart API"], "Custom features", "United States"),
  p("Sweetums", "getsweetums.com", "Shopify · Confectionery", "Playful, mobile-first storefront for a sweets brand with custom sections and a smooth shopping experience.", "sweetums.webp", 0, ["Shopify", "UI", "Mobile-first"], "Storefronts", "United States"),
  p("Sweetums Bundle Builder", "getsweetums.com", "Custom feature · Bundles", "Pick-and-mix bundle builder that guides customers through choosing flavours before adding the full bundle to cart.", "sweetums-bundle.webp", 0, ["Shopify", "JavaScript", "Bundles"], "Custom features", "United States"),
  p("The Only Bean", "theonlybean.com", "Shopify · Product + bundle", "Product page for crunchy edamame snacks with a built-in bundle view: clear variant selection, savings messaging and a focused buy box.", "onlybean.webp", 0, ["Shopify", "PDP", "Bundles"], "Landing pages", "United States"),
  p("Chocbox LA", "chocboxla.com", "Shopify · Gifting", "Premium gifting storefront with rich imagery and curated collections.", "chocbox.webp", 0, ["Shopify", "Design", "Storefront"], "Storefronts", "United States"),
  p("Javvy Coffee", "javvycoffee.com", "Shopify · Coffee", "Storefront for a coffee brand with flavour-led collections, promotional sections and a fast, conversion-minded layout.", "javvy.webp", 1, ["Shopify", "Theme dev", "Speed"], "Storefronts", "United States"),
  p("Gruns — Nutrition Support", "gruns.co", "Shopify · Landing page", "Long-form nutrition landing page with structured content blocks, social proof and clear calls to action.", "gruns.webp", 0, ["Shopify", "Landing page", "Content"], "Landing pages", "United States"),
  p("Menerals — Menergy", "menerals.com", "Shopify · Product landing", "Product landing page for the Menergy line, built around benefit storytelling, sourcing and ingredients, with a direct path to purchase.", "menerals.webp", 0, ["Shopify", "Landing page", "Branding"], "Landing pages", "United States"),
  p("Noor Food Manufacturing", "noormfg.com", "B2B · Manufacturing", "Corporate website for a B2B food manufacturer covering services, facility and equipment, certifications and FAQs, with a quote-request flow.", "noor.webp", 0, ["Web", "B2B", "Lead gen"], "Websites", "United States"),
  p("Idarul Ehsan", "idarulehsan.org", "Non-profit · Website", "Community organisation website with prayer timings, programs and clear ways to get involved and support.", "idarulehsan.webp", 1, ["Web", "Non-profit", "Responsive"], "Websites", "United States"),
  p("ScaleHouse", "scalehouse.co", "Agency · TikTok Shop", "Marketing site for a TikTok Shop growth agency: dark, high-contrast design, a video carousel and a book-a-call funnel.", "scalehouse.webp", 1, ["Web", "Animation", "Lead gen"], "Websites", "United States"),
  p("Learning Pitch", "learningpitch.com", "E-learning · Platform", "Digital learning platform for Pakistan's professional qualification students, with course catalogue, exam-prep tracks and a single-click student login.", "learningpitch.webp", 1, ["E-learning", "LMS", "Web"], "Platforms & apps", "Pakistan"),
  p("TSB Education", "tsbeducation.com", "E-learning · Platform", "The School of Business Education: a course and exam-prep portal with free trials, product pages and a student login.", "tsb.webp", 1, ["E-learning", "LMS", "Web"], "Platforms & apps", "Pakistan"),
  p("My Inter Academy", "myinteracademy.com", "E-learning · Platform", "Online academy for intermediate students with first-year, second-year and entry-test programmes, plus a clear student login.", "myinteracademy.webp", 1, ["E-learning", "LMS", "Web"], "Platforms & apps", "Pakistan"),
  p("House of LND", "houseoflnd.com", "E-learning · LMS", "Learning management system for personal and corporate training, with interactive courses, assessments and analytics.", "houseoflnd.webp", 0, ["LMS", "Analytics", "Web"], "Platforms & apps", "Pakistan"),
  p("The Learning Centre", "tlc.careforedu.com", "E-learning · School LMS", "School LMS portal where students and teachers follow daily updates, announcements and course content.", "tlc.webp", 0, ["LMS", "Education", "Web"], "Platforms & apps", "Pakistan"),
  p("Care for Education", "careforedu.com", "E-learning · Education network", "Education network homepage that connects partner schools to their own LMS portals.", "careforedu.webp", 0, ["Education", "Web", "Multi-site"], "Platforms & apps", "Pakistan"),
  p("Brainfield School LMS", "lms.mybrainfield.com", "E-learning · School LMS", "Branded Moodle login and learning portal for Brainfield School students.", "brainfield.webp", 0, ["Moodle", "LMS", "Branding"], "Platforms & apps", "Pakistan"),
  p("Bio-Z", "bio-z.org", "EdTech · Science learning", "Science education brand with engaging trivia, reward programmes and a mission-led, animated homepage.", "bioz.webp", 1, ["EdTech", "Web", "Animation"], "Platforms & apps", "United States"),
  p("CWRT", "cwrthrive.com", "Web app · Health & fitness", "Subscription fitness platform delivering personalised exercise plans, meal plans and grocery lists, with a 7-day free trial funnel.", "cwrt.webp", 0, ["Web app", "Subscriptions", "Funnel"], "Platforms & apps", "United States"),
  p("SportsFinda", "sportsfinda.com", "Web app · Sports data", "Ride-data dashboard for uploading, searching and filtering sports sessions with sync status and sortable activity tables.", "sportsfinda.webp", 1, ["Web app", "Dashboard", "Data"], "Platforms & apps", "United States"),
  p("ProductShare", "productshare.co", "Marketplace · Cashback", "Shopping and sharing marketplace where shoppers earn cashback when friends buy the products they share.", "productshare.webp", 0, ["Marketplace", "Cashback", "Web"], "Platforms & apps", "United States"),
  p("Perfy Soda", "drinkperfy.com", "Shopify · Beverage", "Vibrant DTC storefront for a caffeine-free, low-sugar soda brand, with flavour-led merchandising and subscribe-and-save.", "perfy.webp", 0, ["Shopify", "DTC", "Subscriptions"], "Storefronts", "United States"),
  p("Manchester", "manchester.com.mx", "E-commerce · Menswear", "Spanish-language menswear store with dress shirts, guayaberas and knitwear, built around clear category navigation and best sellers.", "manchester.webp", 0, ["E-commerce", "Fashion", "Spanish"], "Storefronts", "Mexico"),
  p("Sam & Sab Baby", "samandsabbaby.com", "E-commerce · Baby store", "Boutique baby store with gear, clothing, feeding and a gift registry, organised through a clean mega-menu.", "samsab.webp", 0, ["E-commerce", "Registry", "Catalogue"], "Storefronts", "United States"),
  p("Rostovsky Watches", "rostovskywatches.com", "E-commerce · Luxury watches", "Storefront for new and pre-owned independent watches, with full-bleed hero imagery, brand pages and a trust-led buying experience.", "rostovsky.webp", 1, ["E-commerce", "Luxury", "Design"], "Storefronts", "United States"),
  p("Duck Worx", "duckworxs.com", "E-commerce · Taxidermy supplies", "Niche online shop for waterfowl and wildlife taxidermy supplies, with kits, forms, eyes and bases for professionals.", "duckworxs.webp", 0, ["E-commerce", "Catalogue", "B2B"], "Storefronts", "United States"),
  p("OYOBox", "oyobox.com", "E-commerce · Storage", "Premium storage store for eyewear, tech gear and travel with colourful product photography and a clear shop flow.", "oyobox.webp", 0, ["E-commerce", "Product design", "Web"], "Storefronts", "United States"),
  p("PC Galore", "pcgalore.com", "E-commerce · Computer repair", "Vancouver computer repair and refurbished-computer shop, with a product store, service pages and digitising services.", "pcgalore.webp", 1, ["E-commerce", "Local business", "Services"], "Storefronts", "Canada"),
  p("GCI Consulting", "gciconsulting.com", "Corporate · Banking software", "Corporate site for a banking software implementation partner, covering services, careers, clients and office locations.", "gci.webp", 1, ["Corporate", "Web", "B2B"], "Websites", "United Arab Emirates"),
  p("Aaxon Solutions", "aaxonsolutions.com", "Corporate · IT & AI", "Company website for an IT and AI solutions provider offering SAP consulting, cloud services and software development.", "aaxon.webp", 1, ["Corporate", "IT services", "AI"], "Websites", "United Arab Emirates"),
  p("Hartland Restoration", "hartlandrestoration.com", "Local business · Restoration", "24/7 water damage and roofing restoration site with emergency calls to action, service pages and insurance claim help.", "hartland.webp", 1, ["Local business", "Lead gen", "Web"], "Websites", "United States"),
  p("Fast Pro Blinds", "fastproblindsanddrapery.com", "Local business · Window coverings", "San Antonio blinds, shades and shutters company site with a service catalogue and quote-driven lead generation.", "fastpro.webp", 0, ["Local business", "Catalogue", "Lead gen"], "Websites", "United States"),
  p("Mindy Swimming", "mindyswimming.com", "Local business · Swim school", "Des Moines swim school website for private, group and kids classes, with lessons, instructors and class information.", "mindy.webp", 1, ["Local business", "Services", "Web"], "Websites", "United States"),
  p("KLTAT", "ksluxurytransportation.com", "Travel · Private tours", "New Orleans private tours and luxury airport transfer company site with tour details and a clear booking flow.", "kltat.webp", 1, ["Travel", "Booking", "Web"], "Websites", "United States"),
  p("Dockweiler Luxury Cruises", "dockweilerluxurycruises.com", "Travel · Cruise agent", "Personal travel advisor site for a luxury cruise agent, with specialties, contact options and a destination showcase.", "dockweiler.webp", 1, ["Travel", "Personal brand", "Web"], "Websites", "United States"),
  p("9Teen Boutique", "9teenboutique.com", "E-commerce · Women’s fashion", "Trend-led women’s fashion store with new arrivals, style categories, recommended products, a lookbook and customer reviews.", "nineteen.webp", 0, ["E-commerce", "Fashion", "Storefront"], "Storefronts", "United States"),
  p("D&D Consulting Nexus", "ddconsultingandassociates.com", "Corporate · Tax & consulting", "Digital headquarters for a tax planning and business growth consultancy, with tiered partnership services and a story-led, editorial layout.", "ddconsulting.webp", 0, ["Corporate", "Consulting", "Web"], "Websites", "United States"),
  p("Dr. Leah Riddick Cunningham", "drleahriddickcunningham.com", "Personal brand · Wellness", "Personal brand site for an emotional health and wellness educator, with a warm hero, booking call to action and social links.", "drleah.webp", 1, ["Personal brand", "Wellness", "Web"], "Websites", "United States"),
  p("Freedom Law", "freedomlawnc.com", "Law firm · Website", "Charlotte family law firm website covering practice areas, awards, testimonials, a consultation form and a blog.", "freedomlaw.webp", 0, ["Law firm", "Lead gen", "Blog"], "Websites", "United States"),
  p("Lakewood Roofing", "lakewoodroofingwa.com", "Local business · Roofing", "Roofing and restoration contractor site for Lakewood, WA, with service categories, a step-by-step process, reviews and expert tips.", "lakewood.webp", 0, ["Local business", "Lead gen", "Services"], "Websites", "United States"),
  p("Newby’s Nibbles", "newbysnibbles.com", "Brand · Landing page", "Bold single-page brand landing with a repeating fork-and-spoon pattern hero and a clear start-now call to action.", "newbys.webp", 1, ["Landing page", "Branding", "Web"], "Landing pages", "United States"),
  p("Paola Garcia Consulting", "paogarcia.com", "Personal brand · Consulting", "Spanish-language consultant website with image consulting, masterclass offers and a personal-brand focused layout.", "paogarcia.webp", 1, ["Personal brand", "Consulting", "Spanish"], "Websites", "United States"),
  p("Digital Silk", "digitalsilk.com", "Agency · Web design", "Long-form agency site for a web design and digital marketing firm, with featured projects, service breakdowns, process, case studies and client logos.", "digitalsilk.webp", 0, ["Agency", "Web design", "Portfolio"], "Websites", "United States"),
  p("EssayShark", "essayshark.com", "Platform · Writing marketplace", "Writing service marketplace where students choose their own writer, manage cost through bidding and chat with the writer directly.", "essayshark.webp", 0, ["Marketplace", "Bidding", "Web app"], "Platforms & apps", "United States"),
  p("Wear The Pants", "wearthepantsshop.com", "E-commerce · Women’s fashion", "Bold, playful fashion storefront with fresh drops, a hot list, sale banners and style inspiration, priced in AED.", "wearthepants.webp", 0, ["E-commerce", "Fashion", "Storefront"], "Storefronts", "United Arab Emirates"),
  p("Instasmile UK", "uk.instasmile.com", "E-commerce · Dental", "UK store for custom-made clip-on veneers, with before and after results, a how-it-works flow, FAQs and clear ordering steps.", "instasmile.webp", 0, ["E-commerce", "Health", "Conversion"], "Storefronts", "United Kingdom"),
  p("American Innovative Manufacturing", "ai-mfg.com", "E-commerce · Industrial tools", "Storefront for a maker of battery-powered dent pullers and high-powered welders, with seasonal promos, featured products and parts.", "aimfg.webp", 1, ["E-commerce", "Manufacturing", "Catalogue"], "Storefronts", "United States"),
  p("Hat Heat", "hatheat.com", "E-commerce · Headwear", "Sports headwear store with featured and recently added hats, fitted and snapback collections, pins and a shop-by-team browse.", "hatheat.webp", 0, ["E-commerce", "Sports", "Catalogue"], "Storefronts", "United States"),
  p("Fast Pro Blinds", "fastproblinds.com", "Local business · Window treatments", "San Antonio window treatment company site presenting blinds, shades and motorization, brand partners, reviews and a step-by-step process.", "fastproblinds.webp", 1, ["Local business", "Services", "Lead gen"], "Websites", "United States"),
  p("Buster’s Industrial Supply", "bustersindustrial.com", "E-commerce · Industrial supply", "Fort Worth industrial and VMI supplier store with a product catalog, diamond blades, MRO and cleaning supplies for contractors.", "busters.webp", 0, ["E-commerce", "B2B", "Catalogue"], "Storefronts", "United States"),
  p("Golden Thread", "goldenthreadshop.com", "E-commerce · Jewelry", "Storefront for hand-made, customizable jewelry with new arrivals, curated collections and a retail store feature.", "goldenthread.webp", 0, ["E-commerce", "Jewelry", "Personalization"], "Storefronts", "United States"),
  p("Creative Logo Design", "creativelogodesign.co.uk", "Agency · Design & development", "UK design and development agency site with a bold dark layout and an on-page project enquiry form.", "creativelogo.webp", 0, ["Agency", "Lead gen", "Design"], "Websites", "United Kingdom"),
];

export const countries = Array.from(new Set(projects.map((x) => x.country))).sort(
  (a, b) => projects.filter((x) => x.country === b).length - projects.filter((x) => x.country === a).length,
);

// Every project, in the shape the draggable showcase canvas uses
export const showcaseProjects = projects.map((x) => ({ title: x.title, kind: x.kind, text: x.text, img: x.img, url: x.domain, live: x.live, country: x.country }));
