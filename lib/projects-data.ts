export interface Project {
  slug: string;
  title: string;
  client: string;
  category: "Restaurant" | "E-commerce" | "Business" | "SaaS" | "Web App";
  categoryLabel: string;
  year: string;
  shortDesc: string;
  overview: string;
  challenge: string;
  strategy: string;
  design: string;
  development: string;
  result: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  accentColor: string;
  urlPreview: string;
  heroImage: string;
  previewType: "restaurant" | "ecommerce" | "business" | "saas" | "portfolio";
}

export const PROJECTS: Project[] = [
  {
    slug: "aurora-dining",
    title: "Aurora Dining",
    client: "Aurora Hospitality Group",
    category: "Restaurant",
    categoryLabel: "Culinary & Hospitality Experience",
    year: "2025",
    shortDesc: "An immersive digital reservation and sensory dining experience for a Michelin-starred coastal culinary house.",
    overview: "Aurora Dining wanted to translate their multi-sensory coastal gastronomy experience into a world-class digital flagship. Their previous website was slow, failed to reflect their culinary prestige, and lost table bookings due to a cumbersome third-party checkout flow.",
    challenge: "Deliver an editorial culinary experience with buttery-smooth 60fps food visuals, instant table reservations, seasonal tasting menu previews, and high-performance mobile responsiveness without sacrificing visual grandeur.",
    strategy: "We architected an editorial narrative highlighting seasonal provenance, immersive wine cellar exploration, and an integrated real-time reservation suite with instant SMS & calendar integration.",
    design: "Utilizing deep marine charcoals, warm champagne highlights, elegant serif headlines paired with razor-sharp modern typography, and interactive full-bleed course reveals.",
    development: "Built on Next.js with edge caching, image optimization, headless reservation booking API, and seamless calendar synchronization.",
    result: "Table reservations surged by 185% in the first 90 days. Average time on site increased from 42 seconds to 3 minutes 40 seconds, with zero booking dropout friction.",
    metrics: [
      { label: "Increase in Bookings", value: "+185%" },
      { label: "Average Page Load", value: "0.6s" },
      { label: "Mobile Conversions", value: "3.4x" },
      { label: "Guest Satisfaction", value: "99.2%" },
    ],
    technologies: ["Next.js", "TypeScript", "Tailored CSS", "Headless Reservation API", "Vercel Edge"],
    accentColor: "#1769FF",
    urlPreview: "auroradining.com",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    previewType: "restaurant",
  },
  {
    slug: "atelier-market",
    title: "Atelier Market",
    client: "Atelier Collective",
    category: "E-commerce",
    categoryLabel: "Artisanal E-Commerce & Retail",
    year: "2025",
    shortDesc: "A high-conversion headless e-commerce flagship for limited-edition handcrafted homeware and lifestyle goods.",
    overview: "Atelier Market curates rare, artisanal craftsmanship from international designers. They needed an e-commerce platform that bridged the intimacy of an upscale boutique gallery with the conversion power of modern high-volume retail.",
    challenge: "Traditional e-commerce templates felt sterile and cluttered. The platform needed instant product discovery, subtle micro-interactions, seamless cart drawers, and rapid multi-currency checkout.",
    strategy: "We designed a modular editorial layout featuring curated designer drops, story-driven product profiles, immersive 360-degree item showcases, and a zero-friction 2-step checkout flow.",
    design: "Minimalist grid compositions, tactile typography, warm monochromatic tones with vibrant cobalt accents, and distraction-free product showcases.",
    development: "Engineered using Next.js, headless commerce architecture, sub-second product page transitions, dynamic inventory sync, and intelligent product recommendations.",
    result: "Checkout completion rate jumped by 42%, while mobile sales revenue more than doubled during the inaugural spring drop.",
    metrics: [
      { label: "Checkout Conversion", value: "+42%" },
      { label: "Mobile Revenue", value: "2.1x" },
      { label: "Drop Day Uptime", value: "99.99%" },
      { label: "Avg. Session Duration", value: "+84%" },
    ],
    technologies: ["Next.js", "TypeScript", "Headless Commerce", "Stripe API", "Dynamic Search"],
    accentColor: "#2979FF",
    urlPreview: "ateliermarket.store",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    previewType: "ecommerce",
  },
  {
    slug: "northloop",
    title: "Northloop",
    client: "Northloop Advisory Partners",
    category: "Business",
    categoryLabel: "B2B Strategic Advisory & M&A",
    year: "2025",
    shortDesc: "Corporate digital identity and client intelligence portal for a global technology merger and acquisitions advisory.",
    overview: "Northloop advises Fortune 500 enterprises on multi-billion dollar tech acquisitions. Their digital presence needed to exude unquestioned institutional authority, technical precision, and bespoke market intelligence.",
    challenge: "Present complex financial transaction insights and deal metrics in an accessible, visually commanding executive format while strictly safeguarding confidential advisory data.",
    strategy: "Developed an authoritative corporate architecture combining dynamic deal tombstones, thought leadership whitepapers, interactive market heatmaps, and an encrypted client data room portal.",
    design: "Deep corporate navy backdrop, subtle architectural grids, crisp data visualization widgets, and refined editorial typography.",
    development: "Custom Next.js portal with role-based document access, dynamic chart rendering, and automated industry insight indexing.",
    result: "Inbound institutional deal inquiries expanded by 130%, positioning Northloop as the top independent advisory in their sector.",
    metrics: [
      { label: "Enterprise Inquiries", value: "+130%" },
      { label: "Page Speed Score", value: "99/100" },
      { label: "Deal Volume Tracked", value: "$4.2B" },
      { label: "Global Reach", value: "24 Countries" },
    ],
    technologies: ["Next.js", "TypeScript", "Secure Auth", "Data Viz", "Edge CDN"],
    accentColor: "#0B1B33",
    urlPreview: "northloopadvisory.com",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    previewType: "business",
  },
  {
    slug: "pulseboard",
    title: "Pulseboard",
    client: "Pulse Metrics Inc.",
    category: "SaaS",
    categoryLabel: "Real-time Product Analytics Platform",
    year: "2025",
    shortDesc: "A high-performance web dashboard application delivering live streaming product metrics and cohort retention intelligence.",
    overview: "Pulseboard enables product teams to monitor customer retention, event telemetry, and cohort behavior in real time. They required an ultra-fast web application and a marketing landing experience that converted technical founders.",
    challenge: "Displaying millions of live event data points without browser thread lag, while keeping the interface strikingly modern, intuitive, and clean.",
    strategy: "Conceived a high-contrast dark/light data interface with real-time WebSocket feeds, virtualized data tables, customizable drag-and-drop dashboard widgets, and rapid onboarding flows.",
    design: "Sleek dark-mode aesthetic with electric blue data pulses, clean micro-charts, minimal borders, and accessible telemetry dials.",
    development: "Next.js web application coupled with WebSocket streaming, Canvas-optimized chart rendering, and modular state management.",
    result: "Self-serve signup conversion doubled in the first month post-launch, with daily active product teams scaling to over 15,000 engineers.",
    metrics: [
      { label: "Signup Conversion", value: "+112%" },
      { label: "Data Latency", value: "<12ms" },
      { label: "Active Teams", value: "15,000+" },
      { label: "Retention Rate", value: "94.6%" },
    ],
    technologies: ["Next.js", "TypeScript", "WebSockets", "Data Canvas", "Modern State API"],
    accentColor: "#2979FF",
    urlPreview: "pulseboard.io",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    previewType: "saas",
  },
  {
    slug: "studio-frame",
    title: "Studio Frame",
    client: "Studio Frame Architecture",
    category: "Web App",
    categoryLabel: "Architectural Portfolio & Interactive Studio",
    year: "2024",
    shortDesc: "An avant-garde digital showcase and interactive project explorer for an international Scandinavian architecture practice.",
    overview: "Studio Frame creates sustainable, carbon-neutral civic landmarks. They required a digital identity that operated as a gallery of spatial innovation, featuring blueprints, spatial lighting models, and project monographs.",
    challenge: "Conveying spatial depth and material textures across varying screen sizes while maintaining instant loading speeds for high-resolution 4K project photography.",
    strategy: "Crafted an interactive horizontal & vertical architectural gallery with fluid transitions, interactive blueprint overlays, and full-screen monograph case studies.",
    design: "Monochromatic editorial palette, high-contrast typography, generous architectural margins, and subtle interactive crosshairs.",
    development: "Next.js image pipeline with progressive loading, customized web canvas animations, and fluid page transitions.",
    result: "Awarded multiple international web design accolades and secured three major international municipal masterplan commissions.",
    metrics: [
      { label: "Design Accolades", value: "5 Awards" },
      { label: "Organic Visitors", value: "+210%" },
      { label: "Client Inquiries", value: "3.2x" },
      { label: "Engagement Time", value: "4m 15s" },
    ],
    technologies: ["Next.js", "TypeScript", "Dynamic Viewport", "Canvas", "Performance Pipeline"],
    accentColor: "#1769FF",
    urlPreview: "studioframe.design",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    previewType: "portfolio",
  },
];
