export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  deliverables: string[];
  icon: string;
  badge: string;
  highlight: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "website-development",
    title: "Website Development",
    shortDesc: "Custom responsive websites built around your business goals, brand identity, and audience.",
    longDesc: "We craft custom-coded, high-performance websites engineered for your specific market position. Every line of code is written with purpose — ensuring fast load times, flawless cross-device responsiveness, and clean semantic architecture.",
    features: [
      "Custom responsive layouts built from scratch",
      "Modern component-driven architecture",
      "Search Engine Optimization (SEO) structured data",
      "Ultra-fast Core Web Vitals performance",
      "Accessibility (WCAG 2.1 AA) compliance",
      "Easy-to-manage content editing workflows",
    ],
    deliverables: [
      "Fully customized, production-ready website",
      "Responsive testing across all mobile & desktop viewports",
      "Source code repository & automated deployment pipeline",
      "Interactive style guide and documentation",
      "Technical handoff & training session",
    ],
    icon: "Layout",
    badge: "Core Expertise",
    highlight: "Engineered for speed, brand prestige, and effortless conversions.",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    shortDesc: "Beautiful online stores designed to convert visitors into loyal, repeat customers.",
    longDesc: "Your store shouldn't look like every other template on the internet. We build custom e-commerce experiences with seamless navigation, blazing-fast product filtering, high-converting product detail pages, and frictionless checkout flows.",
    features: [
      "Headless & custom commerce store architectures",
      "Custom product filtering, sorting & instant search",
      "Conversion-optimized checkout and cart drawers",
      "Multi-currency & localized payment gateways (Stripe, UPI, etc.)",
      "Inventory synchronization & order management integration",
      "Customer accounts, wishlists, and loyalty systems",
    ],
    deliverables: [
      "Custom-designed online storefront",
      "Secure payment & checkout integrations",
      "Automated order notification email templates",
      "Product catalog setup and data migration",
      "Analytics tracking & conversion funnels configured",
    ],
    icon: "ShoppingBag",
    badge: "High Conversion",
    highlight: "Designed to maximize average order value and eliminate cart abandonment.",
  },
  {
    id: "web-applications",
    title: "Web Applications",
    shortDesc: "Powerful, scalable custom web applications built with modern frameworks and robust logic.",
    longDesc: "When your business requires more than a content site, we architect sophisticated web applications — from client portals and internal dashboards to full SaaS platforms. We engineer scalable systems that handle complex workflows gracefully.",
    features: [
      "Single Page Applications (SPAs) and Server-Side Rendered (SSR) apps",
      "Role-based authentication & permissions",
      "Real-time data feeds, charts & analytics dashboards",
      "RESTful & GraphQL API integrations",
      "Relational & document database schema architecture",
      "Cloud infrastructure deployment & monitoring",
    ],
    deliverables: [
      "Full-stack web application codebase",
      "Database architecture and migrations",
      "Secure authentication & session handling",
      "API documentation & end-to-end test suite",
      "Staging and production deployment setup",
    ],
    icon: "Code2",
    badge: "Scalable Logic",
    highlight: "Robust, enterprise-grade architecture tailored to your unique workflows.",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    shortDesc: "Simple, intuitive, and beautiful interfaces that elevate your brand and delight users.",
    longDesc: "Great design isn't just about how things look; it's about how effortlessly they work. We combine deep user empathy with editorial aesthetic refinement to create interfaces that feel natural, trustworthy, and modern.",
    features: [
      "User research, journey mapping & personas",
      "Information architecture & wireframing",
      "High-fidelity interactive prototypes in Figma",
      "Complete design system tokens & component libraries",
      "Micro-interaction & motion design specifications",
      "User testing & usability validation",
    ],
    deliverables: [
      "Comprehensive Figma design system and component kit",
      "Interactive clickable mobile & desktop prototypes",
      "Developer handoff documentation & asset exports",
      "Brand style guide (color tokens, typography, icon library)",
    ],
    icon: "Palette",
    badge: "Editorial Quality",
    highlight: "Bespoke digital brand experiences that stand out in crowded markets.",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    shortDesc: "Transform outdated websites into modern, high-converting digital flagships.",
    longDesc: "If your current website is outdated, sluggish, or failing to reflect the real scale of your business, we perform an end-to-end revitalization. We preserve your existing SEO equity while completely overhauling the design, code, and user experience.",
    features: [
      "Comprehensive UX and conversion audit of existing site",
      "Complete 301 redirect mapping to protect search rankings",
      "Brand modernization and contemporary editorial aesthetics",
      "Mobile-first responsive re-engineering",
      "Modern technology stack migration (e.g. from legacy CMS to Next.js)",
      "Performance optimization to achieve 90+ Google PageSpeed",
    ],
    deliverables: [
      "Modernized responsive website on cutting-edge stack",
      "SEO migration report & redirect audit verification",
      "Before-and-after performance benchmarking report",
      "Content migration and visual enhancement",
    ],
    icon: "Sparkles",
    badge: "Modernization",
    highlight: "Retain your hard-earned authority while gaining modern speed and prestige.",
  },
  {
    id: "performance-optimization",
    title: "Performance",
    shortDesc: "Fast, secure, and optimized websites that load in milliseconds and score 95+ on PageSpeed.",
    longDesc: "A one-second delay in page load can reduce conversions by over 20%. We audit and optimize every element of your digital presence — asset compression, script execution, caching policies, and database queries — to guarantee lightning speed.",
    features: [
      "Core Web Vitals auditing (LCP, FID/INP, CLS)",
      "Image optimization (WebP/AVIF, responsive srcset, lazy loading)",
      "JavaScript bundle size reduction & code splitting",
      "Edge caching, CDN routing, and HTTP/3 tuning",
      "Font rendering optimization (FOUT/FOIT elimination)",
      "Security headers & vulnerability hardening",
    ],
    deliverables: [
      "Full performance audit report with actionable fixes",
      "Refactored code with verified 95+ PageSpeed scores",
      "Automated performance regression monitoring setup",
      "Security audit report & hardened headers configuration",
    ],
    icon: "Zap",
    badge: "Ultra Fast",
    highlight: "Sub-second load times that keep visitors engaged and boost search ranks.",
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    shortDesc: "Proactive security, continuous updates, and dedicated technical care for your web assets.",
    longDesc: "A great website requires ongoing attention to stay secure, compatible, and competitive. Our dedicated maintenance and support packages give you peace of mind with 24/7 uptime monitoring, security patches, and monthly feature improvements.",
    features: [
      "24/7 uptime & automated performance monitoring",
      "Regular dependency, security, and CMS patching",
      "Automated daily off-site cloud backups",
      "Monthly content updates and design refinements",
      "Dedicated priority technical support channel",
      "Quarterly strategy and roadmap reviews",
    ],
    deliverables: [
      "Monthly health and uptime analytics reports",
      "Dedicated Slack/Email support with guaranteed SLA",
      "Regular backup archive points",
      "Direct developer access for emergency fixes",
    ],
    icon: "ShieldCheck",
    badge: "Continuous Care",
    highlight: "Ensure your digital flagship runs smoothly every second of every day.",
  },
];
