import { useState, useEffect, useRef, useCallback } from "react";
import {
  X, ChevronLeft, ChevronRight, ArrowUpRight, Search,
  Mail, Phone, Zap, ShoppingCart, Paintbrush, Smartphone,
  Target, Wrench, ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const SERVICES = [
  { Icon: Zap,          title: "Landing Pages",               desc: "High-converting landing pages that turn visitors into paying customers. Fast, clean, and built to perform.",                                                              tags: ["React", "HTML/CSS", "Animations"] },
  { Icon: ShoppingCart, title: "E-Commerce Stores",           desc: "Full-featured online stores with smooth checkout flows, product listings, and admin panels.",                                                                            tags: ["Shopify", "WooCommerce", "Custom"] },
  { Icon: Paintbrush,   title: "Custom Web Apps",             desc: "Fully custom web applications tailored to your business needs — dashboards, portals, SaaS tools.",                                                                       tags: ["React", "Node.js", "APIs"] },
  { Icon: Smartphone,   title: "Responsive Design",           desc: "Pixel-perfect on every device. Mobile-first development that looks stunning on phones, tablets, and desktops.",                                                          tags: ["Mobile", "Tablet", "Desktop"] },
  { Icon: Target,       title: "Figma → HTML / React / Next.js", desc: "Pixel-perfect conversion of any Figma design into clean, production-ready code. Exactly as designed — no compromises.",                                             tags: ["Figma", "React", "Next.js"] },
  { Icon: Wrench,       title: "Bug Fixes & Updates",         desc: "Quick turnaround on fixes, feature additions, and updates to your existing website or app.",                                                                             tags: ["Quick", "Reliable", "Affordable"] },
];

// ✏️ Replace links with your actual project URLs
const PROJECTS = [
  {
    id: 1,
    title: "KOOF",
    category: "Landing Page",
    desc: "A person-to-person money transfer app landing page built around security and trust, with high-converting CTAs.",
    longDesc: "KOOF is a person-to-person money transfer landing page built to convey trust and security. The design focuses on clear value propositions, a clean layout, and strong CTAs that drive sign-ups. Built with smooth animations and a mobile-first approach to maximize conversions across all devices.",
    link: "https://work.mobidudes.in/Mohit/koof/",
    tech: ["HTML", "CSS", "JS", "Animations"],
    color: "#0022ff",
    highlights: ["Secure transfer flow UI", "Mobile-first responsive layout", "Smooth CSS animations", "High-converting CTA sections"],
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Fynsd — Finance Learning",
    category: "Website",
    desc: "Fynsd makes finance simple and accessible. Clear guides, practical tools, and a supportive community to help learners gain confidence.",
    longDesc: "Fynsd is a full-featured finance learning platform designed to make money management simple and accessible. The site features clear guides, interactive tools, and a community-driven approach. Built with React and Framer Motion for smooth animations, with a Node.js backend powering the dynamic content.",
    link: "https://fynsd.vercel.app/",
    tech: ["React", "Tailwind", "Framer Motion", "Node.js"],
    color: "#FF6B35",
    highlights: ["Interactive finance learning modules", "Community-driven content system", "Framer Motion animations", "Full Node.js backend integration"],
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Monkk",
    category: "Landing Page",
    desc: "Revamped version of Monkk with a fresh green aesthetic — cleaner layout and better visual hierarchy for higher conversions.",
    longDesc: "A complete redesign of the Monkk landing page featuring a fresh green aesthetic and improved visual hierarchy. The revamped layout includes GSAP-powered scroll animations, a refined brand identity, and an optimized conversion flow that resulted in significantly higher CTA click rates.",
    link: "https://work.mobidudes.in/Mohit/new-monkk/",
    tech: ["React", "CSS", "GSAP"],
    color: "#7C3AED",
    highlights: ["GSAP scroll-triggered animations", "Redesigned hero with new brand identity", "Higher CTA conversion rate", "Improved mobile experience"],
    images: [
      "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620714223084-8fcacc2dbbe6?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 4,
    title: "Mobidudes Agency Website",
    category: "Business Site",
    desc: "Corporate website for a digital agency — dark UI with services, portfolio, careers and contact sections. Built to convert visitors into clients.",
    longDesc: "Full corporate website for a digital agency. Dark, premium aesthetic with smooth scroll animations, an interactive portfolio grid, services breakdown, team section, and multi-step contact form. Built with Framer Motion page transitions.",
    link: "https://work.mobidudes.in/Mohit/mobidudes/",
    tech: ["React", "TailwindCSS", "Framer"],
    color: "#F59E0B",
    highlights: ["Framer Motion page transitions", "Interactive portfolio grid", "Multi-step contact form", "Careers & team sections"],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 5,
    title: "Tawazun — Wellness App",
    category: "Landing Page",
    desc: "UAE-born wellness platform with fasting tracking, hydration monitoring & AI insights. App Store + Play Store CTAs with waitlist flow.",
    longDesc: "Landing page for Tawazun, a wellness app born in the UAE. Features an animated app preview, waitlist funnel, fasting & hydration tracker previews, and a seamless App Store / Play Store CTA flow.",
    link: "https://work.mobidudes.in/Mohit/Tawazun/",
    tech: ["React", "Next.js", "Animations"],
    color: "#EC4899",
    highlights: ["Animated app mockup previews", "Waitlist email capture flow", "Fasting & hydration UI demos", "App Store & Play Store CTAs"],
    images: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 6,
    title: "Estal",
    category: "Website",
    desc: "Your Trusted Real Estate Partner — from finding the perfect home to creating seamless selling experiences.",
    longDesc: "Estal is a real estate platform built to connect buyers and sellers seamlessly. From property listings to guided selling experiences, every section is optimized for trust and conversion. Built with clean HTML, CSS and JS with smooth animations throughout.",
    link: "https://work.mobidudes.in/Mohit/estal/home.html",
    tech: ["HTML", "CSS", "JS", "Animation"],
    color: "#06B6D4",
    highlights: ["Property listing UI", "Smooth scroll animations", "Trust-building design elements", "Mobile-optimized experience"],
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
    ],
  },
];

const STATS = [
  { value: "50+",  label: "Projects Delivered" },
  { value: "30+",  label: "Happy Clients" },
  { value: "3+",   label: "Years Experience" },
  { value: "100%", label: "Job Success" },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We discuss your goals, audience, and vision to define the perfect solution." },
  { step: "02", title: "Design",    desc: "Wireframes and UI mockups so you see exactly what you're getting before we code." },
  { step: "03", title: "Develop",   desc: "Clean, fast, production-ready code with regular updates and progress checks." },
  { step: "04", title: "Deliver",   desc: "Thorough testing, deployment, and a handover with docs — zero headaches." },
];

const WHY_CARDS = [
  { icon: "⚡", title: "Fast Delivery",       desc: "Most projects delivered within 3–7 days." },
  { icon: "💬", title: "Clear Communication", desc: "Daily updates, quick replies, zero ghosting." },
  { icon: "🔄", title: "Unlimited Revisions", desc: "We iterate until you're 100% satisfied." },
  { icon: "🔒", title: "Post-Launch Support", desc: "30 days free support after every delivery." },
];

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html  { scroll-behavior: smooth; }
  body  { background: #080808; color: #F0EDE8; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

  ::-webkit-scrollbar       { width: 3px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #00FF87; border-radius: 2px; }

  /* ── Keyframes ── */
  @keyframes fadeUp    { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes pulse     { 0%,100% { opacity: 1 } 50% { opacity: 0.3 } }
  @keyframes pmSlideIn { from { opacity: 0; transform: translateX(60px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes pmSlideOut{ from { opacity: 1; transform: translateX(0) }    to { opacity: 0; transform: translateX(60px) } }
  @keyframes pmFadeIn  { from { opacity: 0 } to { opacity: 1 } }
  @keyframes pmFadeOut { from { opacity: 1 } to { opacity: 0 } }
  @keyframes pmImgIn   { from { opacity: 0; transform: scale(1.04) } to { opacity: 1; transform: scale(1) } }

  /* ── Utility ── */
  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 1000; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
  .cursor-glow {
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    pointer-events: none; z-index: 0; transform: translate(-50%, -50%); transition: all 0.1s linear;
    background: radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 70%);
  }
  .section-label {
    display: block; font-family: 'Space Mono', monospace; font-size: 11px;
    color: #00FF87; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px;
  }
  .divider { width: 40px; height: 2px; background: #00FF87; margin: 16px 0; }
  .tag {
    font-size: 11px; font-family: 'Space Mono', monospace; color: #999;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    padding: 3px 10px; border-radius: 3px;
  }

  /* ── Hero ── */
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px; width: fit-content;
    background: rgba(0,255,135,0.1); border: 1px solid rgba(0,255,135,0.3);
    color: #00FF87; padding: 6px 16px; border-radius: 100px;
    font-size: 13px; font-family: 'Space Mono', monospace;
    animation: fadeUp 0.5s ease 0.2s both;
  }
  .dot {
    width: 6px; height: 6px; flex-shrink: 0;
    background: #00FF87; border-radius: 50%; animation: pulse 1.5s infinite;
  }

  /* ── Buttons ── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
    background: #00FF87; color: #080808; font-weight: 700; padding: 14px 32px;
    border: none; border-radius: 4px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 15px; letter-spacing: 0.5px;
    transition: all 0.25s ease;
  }
  .btn-primary:hover { background: #00e67a; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,255,135,0.3); }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
    background: transparent; color: #F0EDE8; font-weight: 600; padding: 14px 32px;
    border: 1px solid rgba(240,237,232,0.3); border-radius: 4px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 15px; transition: all 0.25s ease;
  }
  .btn-outline:hover { border-color: #00FF87; color: #00FF87; transform: translateY(-2px); }

  /* ── Nav ── */
  .nav-link {
    position: relative; background: none; border: none; color: #999; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    text-transform: capitalize; transition: color 0.2s; padding: 4px 0;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px; background: #00FF87; transition: width 0.3s ease;
  }
  .nav-link:hover { color: #F0EDE8; }
  .nav-link:hover::after { width: 100%; }

  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .hamburger span {
    display: block; width: 24px; height: 2px;
    background: #F0EDE8; border-radius: 2px; transition: all 0.3s ease;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    position: fixed; top: 68px; left: 0; right: 0; z-index: 199;
    background: rgba(10,10,10,0.97); backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.08); padding: 24px 24px 32px;
    transform: translateY(-110%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .mobile-menu.open { transform: translateY(0); }
  .mobile-menu-btn {
    display: block; width: 100%; background: none; cursor: pointer; text-align: left;
    border: none; border-bottom: 1px solid rgba(255,255,255,0.06);
    color: #aaa; font-family: 'DM Sans', sans-serif; font-size: 18px;
    font-weight: 600; padding: 12px 0; text-transform: capitalize; transition: color 0.2s;
  }
  .mobile-menu-btn:hover { color: #00FF87; }

  /* ── Service cards ── */
  .service-card {
    padding: 36px 32px; background: #0C0C0C; cursor: default;
    border: 1px solid rgba(255,255,255,0.07); transition: all 0.3s ease;
  }
  .service-card:hover { transform: translateY(-6px); border-color: #00FF87 !important; }

  /* ── Project cards ── */
  .project-card-wrap {
    border: 1px solid rgba(255,255,255,0.07); border-radius: 8px;
    overflow: hidden; cursor: pointer; transition: all 0.3s ease;
  }
  .project-card-wrap:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.6); }
  .project-mock-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; opacity: 0; transition: opacity 0.45s ease;
  }
  .project-card-wrap:hover .project-mock-img { opacity: 0.25; }
  .project-view-hint {
    position: absolute; inset: 0; z-index: 2; opacity: 0;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: rgba(8,8,8,0.72); font-size: 13px; font-weight: 600;
    letter-spacing: 0.5px; font-family: 'Space Mono', monospace; transition: opacity 0.35s ease;
  }
  .project-card-wrap:hover .project-view-hint { opacity: 1; }
  .project-arrow { flex-shrink: 0; transition: transform 0.3s; }
  .project-card-wrap:hover .project-arrow { transform: translate(3px, -3px); }

  /* ── Why cards ── */
  .why-card {
    display: flex; gap: 16px; padding: 20px 24px;
    border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; transition: border-color 0.3s;
  }
  .why-card:hover { border-color: #00FF87; }

  /* ── Footer ── */
  .footer-link {
    color: #555; font-size: 12px; text-decoration: none;
    font-family: 'Space Mono', monospace; transition: color 0.2s;
  }
  .footer-link:hover { color: #00FF87; }

  /* ── Modal ── */
  .pm-backdrop {
    position: fixed; inset: 0; z-index: 9000;
    background: rgba(4,4,4,0.88); backdrop-filter: blur(8px);
    display: flex; align-items: stretch; justify-content: flex-end;
  }
  .pm-backdrop.enter { animation: pmFadeIn  0.35s ease both; }
  .pm-backdrop.leave { animation: pmFadeOut 0.4s  ease both; }

  .pm-panel {
    width: min(780px, 100vw); background: #0e0e0e;
    border-left: 1px solid rgba(255,255,255,0.08);
    display: flex; flex-direction: column; overflow-y: auto;
  }
  .pm-panel.enter { animation: pmSlideIn  0.4s cubic-bezier(0.25,0.46,0.45,0.94) both; }
  .pm-panel.leave { animation: pmSlideOut 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both; }

  .pm-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 28px; border-bottom: 1px solid rgba(255,255,255,0.06);
    position: sticky; top: 0; background: #0e0e0e; z-index: 10; flex-shrink: 0;
  }
  .pm-close-btn {
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    color: #888; cursor: pointer; border-radius: 4px; transition: all 0.25s; flex-shrink: 0;
  }
  .pm-close-btn:hover { background: rgba(255,255,255,0.12); color: #F0EDE8; border-color: rgba(255,255,255,0.25); }

  .pm-nav-btn {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
    background: rgba(8,8,8,0.7); border: 1px solid rgba(255,255,255,0.12);
    color: #F0EDE8; cursor: pointer; z-index: 3; border-radius: 4px; transition: all 0.2s;
  }
  .pm-nav-btn:hover { background: rgba(20,20,20,0.95); border-color: rgba(255,255,255,0.3); }
  .pm-nav-btn.prev { left: 12px; }
  .pm-nav-btn.next { right: 12px; }

  .pm-thumb {
    flex: 1; aspect-ratio: 16/9; overflow: hidden; cursor: pointer;
    border: 2px solid transparent; border-radius: 4px; opacity: 0.5; transition: all 0.25s;
  }
  .pm-thumb:hover { opacity: 0.8; }
  .pm-thumb.active { opacity: 1; }
  .pm-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .pm-cta {
    display: inline-flex; align-items: center; gap: 9px; align-self: flex-start;
    margin-top: 28px; padding: 14px 28px; font-weight: 700; font-size: 14px;
    border: none; border-radius: 4px; cursor: pointer; color: #080808;
    font-family: 'DM Sans', sans-serif; text-decoration: none; transition: all 0.25s ease;
  }
  .pm-cta:hover { filter: brightness(1.12); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(0,0,0,0.4); }

  /* ── Responsive: Tablet ── */
  @media (max-width: 1024px) {
    .services-grid    { grid-template-columns: repeat(2, 1fr) !important; }
    .projects-grid    { grid-template-columns: repeat(2, 1fr) !important; }
    .process-grid     { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
    .why-inner        { gap: 48px !important; }
    .stats-grid       { grid-template-columns: repeat(2, 1fr) !important; }
    .projects-header  { flex-direction: column !important; align-items: flex-start !important; }
    .projects-subtext { text-align: left !important; }
    .process-connector{ display: none !important; }
  }

  /* ── Responsive: Mobile ── */
  @media (max-width: 768px) {
    .nav-links  { display: none !important; }
    .hamburger  { display: flex !important; }

    .hero-section { padding: 96px 20px 64px !important; }
    .hero-title   { font-size: clamp(52px, 13vw, 80px) !important; margin-top: 20px !important; }
    .hero-desc    { font-size: 15px !important; margin-top: 20px !important; margin-bottom: 28px !important; }
    .hero-btns    { flex-direction: column !important; gap: 12px !important; }
    .hero-btns .btn-primary,
    .hero-btns .btn-outline { width: 100% !important; justify-content: center !important; padding: 14px 24px !important; }
    .scroll-hint  { display: none !important; }

    .stats-section { padding: 40px 20px !important; }
    .stats-grid    { gap: 24px 12px !important; }
    .stat-value    { font-size: 44px !important; }

    .services-section { padding: 64px 20px !important; }
    .services-grid {
      grid-template-columns: 1fr !important;
      background: transparent !important; border: none !important; gap: 12px !important;
    }
    .service-card          { border-radius: 8px !important; padding: 28px 22px !important; }
    .service-card:hover    { transform: none !important; }

    .projects-section      { padding: 64px 20px !important; }
    .projects-grid         { grid-template-columns: 1fr !important; gap: 16px !important; }
    .project-card-wrap:hover { transform: none !important; }
    .project-num           { font-size: 60px !important; }

    .process-section       { padding: 64px 20px !important; }
    .process-grid          { grid-template-columns: 1fr !important; gap: 28px !important; }

    .why-section           { padding: 56px 20px !important; }
    .why-inner             { grid-template-columns: 1fr !important; gap: 40px !important; }

    .contact-section       { padding: 72px 20px !important; }
    .contact-btns          { flex-direction: column !important; gap: 12px !important; }
    .contact-btns .btn-primary,
    .contact-btns .btn-outline { width: 100% !important; justify-content: center !important; }

    .footer       { padding: 20px !important; flex-direction: column !important; text-align: center !important; gap: 12px !important; }
    .footer-links { justify-content: center !important; }

    .pm-panel  { width: 100vw !important; border-left: none !important; }
    .pm-body   { padding: 20px !important; gap: 20px !important; }
    .pm-topbar { padding: 16px 20px !important; }
  }

  /* ── Responsive: Small Mobile ── */
  @media (max-width: 400px) {
    .hero-title { font-size: 46px !important; }
    .stat-value { font-size: 38px !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */

function useTypingEffect(words, speed = 100, pause = 2000) {
  const [displayed, setDisplayed]   = useState("");
  const [wordIdx, setWordIdx]       = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout;

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(prev =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIdx, words, speed, pause]);

  return displayed;
}

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        let current = 0;

        const timer = setInterval(() => {
          current += num / 60;
          if (current >= num) { setCount(num); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 1500 / 60);
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────────────────────────────── */

function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [closing, setClosing]   = useState(false);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 400);
  }, [onClose]);

  // ESC to close + body scroll lock
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close]);

  const goTo = i => { setImgLoaded(false); setImgIndex(i); };
  const prev = () => goTo((imgIndex - 1 + project.images.length) % project.images.length);
  const next = () => goTo((imgIndex + 1) % project.images.length);

  const animClass = closing ? "leave" : "enter";

  return (
    <div className={`pm-backdrop ${animClass}`} onClick={close}>
      <div className={`pm-panel ${animClass}`} onClick={e => e.stopPropagation()}>

        {/* Top bar */}
        <div className="pm-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
              textTransform: "uppercase", padding: "4px 12px",
              border: `1px solid ${project.color}55`, borderRadius: 100, color: project.color,
            }}>
              {project.category}
            </span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, opacity: 0.5, color: project.color }}>
              {String(project.id).padStart(2, "0")}
            </span>
          </div>

          <button className="pm-close-btn" onClick={close} aria-label="Close modal">
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        {/* Body */}
        <div className="pm-body" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>

          {/* Image gallery */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#1a1a1a" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: project.color, zIndex: 2 }} />

              <img
                key={imgIndex}
                src={project.images[imgIndex]}
                alt={project.title}
                style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  opacity: imgLoaded ? 1 : 0, transition: "opacity 0.35s ease",
                  animation: imgLoaded ? "pmImgIn 0.45s ease both" : "none",
                }}
                onLoad={() => setImgLoaded(true)}
              />

              {project.images.length > 1 && (
                <>
                  <button className="pm-nav-btn prev" onClick={prev} aria-label="Previous image">
                    <ChevronLeft size={16} strokeWidth={2} />
                  </button>
                  <button className="pm-nav-btn next" onClick={next} aria-label="Next image">
                    <ChevronRight size={16} strokeWidth={2} />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div style={{
                position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                background: "rgba(8,8,8,0.7)", padding: "4px 12px", borderRadius: 100,
                fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#888",
                zIndex: 3, display: "flex", alignItems: "center", gap: 4,
              }}>
                <span style={{ color: project.color }}>{imgIndex + 1}</span>
                <span style={{ opacity: 0.4 }}>/</span>
                {project.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 8 }}>
              {project.images.map((src, i) => (
                <div
                  key={i}
                  className={`pm-thumb ${i === imgIndex ? "active" : ""}`}
                  style={i === imgIndex ? { borderColor: project.color } : {}}
                  onClick={() => goTo(i)}
                >
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* Project info */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1.05, marginBottom: 14,
              fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: 0.5,
            }}>
              {project.title}
            </h2>

            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              {project.longDesc}
            </p>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
              Key Features
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#ccc", lineHeight: 1.5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.color, flexShrink: 0, marginTop: 6, display: "block" }} />
                  {h}
                </li>
              ))}
            </ul>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, marginTop: 24 }}>
              Tech Stack
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  fontSize: 12, fontFamily: "'Space Mono', monospace", padding: "5px 13px",
                  border: `1px solid ${project.color}44`, borderRadius: 4, color: project.color,
                }}>
                  {t}
                </span>
              ))}
            </div>

            <a href={project.link} target="_blank" rel="noopener noreferrer" className="pm-cta" style={{ background: project.color }}>
              Visit Live Site <ExternalLink size={15} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */

export default function Portfolio() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [cursorPos, setCursorPos]         = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(null);

  const typed = useTypingEffect(
    ["Landing Pages", "Web Apps", "E-Commerce", "Dashboards", "Business Sites"],
    90, 2200
  );

  // Cursor glow
  useEffect(() => {
    const onMove = e => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const NAV_ITEMS = ["home", "services", "work", "process", "contact"];

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="grain" />
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      {/* ════════════ NAV ════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 68,
        padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(8,8,8,0.88)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 2 }}>
          MG<span style={{ color: "#00FF87" }}>DUDEs</span>
        </div>

        <div className="nav-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_ITEMS.map(s => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)}>{s}</button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "10px 22px", fontSize: 13 }}>
            Hire Us ↗
          </button>
        </div>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} onClick={e => e.stopPropagation()}>
        <div style={{ marginBottom: 20 }}>
          {NAV_ITEMS.map(s => (
            <button key={s} className="mobile-menu-btn" onClick={() => scrollTo(s)}>{s}</button>
          ))}
        </div>
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => scrollTo("contact")}>
          Hire Us ↗
        </button>
      </div>

      {/* ════════════ HERO ════════════ */}
      <section id="home" className="hero-section" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 40px 80px", position: "relative",
      }}>
        <div style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
          <div className="hero-badge">
            <div className="dot" /> Available for new projects
          </div>
        </div>

        <h1 className="hero-title" style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px, 10vw, 140px)",
          lineHeight: 0.95, marginTop: 32, letterSpacing: "-1px",
          animation: "fadeUp 0.6s ease 0.3s both",
        }}>
          WE BUILD<br />
          <span style={{
            background: "linear-gradient(135deg, #00FF87 0%, #00BFFF 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {typed}
            <span style={{ animation: "pulse 0.8s infinite", WebkitTextFillColor: "#00FF87" }}>|</span>
          </span><br />
          THAT CONVERT.
        </h1>

        <p className="hero-desc" style={{
          fontSize: 18, color: "#888", maxWidth: 520, lineHeight: 1.7,
          marginTop: 32, marginBottom: 40, animation: "fadeUp 0.6s ease 0.5s both",
        }}>
          Full-stack web developer specializing in fast, beautiful, and high-converting websites for businesses worldwide. Based in India, working globally.
        </p>

        <div className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.6s ease 0.6s both" }}>
          <button className="btn-primary" onClick={() => scrollTo("work")}>View Our Works ↓</button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>Let's Talk</button>
        </div>

        <div className="scroll-hint" style={{
          position: "absolute", bottom: 40, left: 40, display: "flex",
          alignItems: "center", gap: 12, color: "#555", fontSize: 12,
          fontFamily: "'Space Mono'", animation: "fadeUp 1s ease 1s both",
        }}>
          <div style={{ width: 1, height: 60, background: "linear-gradient(180deg, #00FF87, transparent)" }} />
          Scroll to explore
        </div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section className="stats-section" style={{
        padding: "56px 40px", background: "rgba(0,255,135,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div className="stats-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="stat-value" style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: "#00FF87", lineHeight: 1 }}>
                <CountUp target={parseInt(value)} suffix={value.replace(/\d/g, "")} />
              </div>
              <div style={{ color: "#666", fontSize: 12, marginTop: 6, fontFamily: "'Space Mono'", letterSpacing: 0.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ SERVICES ════════════ */}
      <section id="services" className="services-section" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <span className="section-label">— What We Do</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(44px, 6vw, 64px)", lineHeight: 1, marginBottom: 16 }}>
          SERVICES<br /><span style={{ color: "#00FF87" }}>& EXPERTISE</span>
        </h2>
        <div className="divider" />
        <p style={{ color: "#888", fontSize: 16, maxWidth: 480, lineHeight: 1.7, marginBottom: 56 }}>
          End-to-end web development services built for results. No fluff — just clean code and beautiful design.
        </p>

        <div className="services-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)",
        }}>
          {SERVICES.map(({ Icon, title, desc, tags }, i) => (
            <div key={i} className="service-card" style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
              <div style={{ marginBottom: 18, color: "#00FF87" }}>
                <Icon size={32} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ PROJECTS ════════════ */}
      <section id="work" className="projects-section" style={{ padding: "100px 40px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="projects-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, gap: 24 }}>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(44px, 6vw, 64px)", lineHeight: 1 }}>
              RECENT<br /><span style={{ color: "#00FF87" }}>PROJECTS</span>
            </h2>
            <p className="projects-subtext" style={{ color: "#777", fontSize: 14, maxWidth: 300, textAlign: "right", lineHeight: 1.7 }}>
              Real projects for real clients. Click any card to explore details and the live site.
            </p>
          </div>

          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className="project-card-wrap"
                onClick={() => setActiveProject(p)}
                style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ height: 4, background: p.color }} />

                <div style={{
                  background: "#111", padding: "20px", minHeight: 160, position: "relative", overflow: "hidden",
                  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                }}>
                  <img src={p.images[0]} alt="" className="project-mock-img" />

                  {/* Browser dots */}
                  <div style={{ position: "absolute", top: 12, left: 16, display: "flex", gap: 5, zIndex: 1 }}>
                    {["#FF5F57", "#FFBD2E", "#28CA41"].map(c => (
                      <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.6 }} />
                    ))}
                  </div>

                  <div className="project-num" style={{ fontFamily: "'Bebas Neue'", fontSize: 80, color: p.color, opacity: 0.15, lineHeight: 1, userSelect: "none", position: "relative", zIndex: 1 }}>
                    {String(p.id).padStart(2, "0")}
                  </div>

                  <div style={{ position: "absolute", bottom: 14, right: 14, zIndex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 4, padding: "4px 10px", fontSize: 11, fontFamily: "'Space Mono'", color: p.color }}>
                    {p.category}
                  </div>

                  <div className="project-view-hint" style={{ color: p.color }}>
                    <Search size={15} strokeWidth={2} /> View Details
                  </div>
                </div>

                <div style={{ padding: "22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3 }}>{p.title}</h3>
                    <ArrowUpRight size={18} className="project-arrow" style={{ color: p.color }} />
                  </div>
                  <p style={{ color: "#777", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ PROCESS ════════════ */}
      <section id="process" className="process-section" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <span className="section-label">— How It Works</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(44px, 6vw, 64px)", lineHeight: 1, marginBottom: 56 }}>
          MY SIMPLE<br /><span style={{ color: "#00FF87" }}>PROCESS</span>
        </h2>

        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {PROCESS.map((p, i) => (
            <div key={i} style={{ position: "relative", animation: `fadeUp 0.5s ease ${i * 0.12}s both` }}>
              {i < PROCESS.length - 1 && (
                <div className="process-connector" style={{
                  position: "absolute", top: 22, left: 70, width: "80%", height: 1, zIndex: 0,
                  background: "linear-gradient(90deg, rgba(0,255,135,0.4), transparent)",
                }} />
              )}
              <div style={{
                width: 44, height: 44, borderRadius: "50%", position: "relative", zIndex: 1,
                border: "2px solid #00FF87", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Mono'", fontSize: 12, color: "#00FF87",
                marginBottom: 20, background: "rgba(0,255,135,0.08)",
              }}>
                {p.step}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ WHY US ════════════ */}
      <section className="why-section" style={{
        padding: "80px 40px", background: "#0C0C0C",
        borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div className="why-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span className="section-label">— Why Choose Me</span>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05, marginBottom: 24 }}>
              NO DELAYS.<br />NO BS.<br /><span style={{ color: "#00FF87" }}>JUST RESULTS.</span>
            </h2>
            <p style={{ color: "#888", lineHeight: 1.8, fontSize: 15 }}>
              I've worked with clients from 15+ countries delivering websites that look stunning and perform even better. I communicate clearly, meet deadlines, and build long-term relationships.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {WHY_CARDS.map(({ icon, title, desc }) => (
              <div key={title} className="why-card">
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{title}</div>
                  <div style={{ color: "#777", fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section id="contact" className="contact-section" style={{
        padding: "120px 40px", textAlign: "center",
        background: "radial-gradient(ellipse at center, rgba(0,255,135,0.05) 0%, transparent 60%)",
      }}>
        <span className="section-label" style={{ display: "block" }}>— Let's Work Together</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 1, marginBottom: 20 }}>
          READY TO BUILD<br /><span style={{ color: "#00FF87" }}>SOMETHING GREAT?</span>
        </h2>
        <p style={{ color: "#888", fontSize: 16, maxWidth: 460, margin: "0 auto 44px", lineHeight: 1.75 }}>
          Whether it's a landing page, full web app, or just a quick fix — I'm here to help. Let's discuss your project.
        </p>
        <div className="contact-btns" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:mgdudes@gmail.com" className="btn-primary" style={{ fontSize: 15, padding: "15px 36px" }}>
            <Mail size={16} strokeWidth={2} /> mgdudes@gmail.com
          </a>
          <a href="tel:+919111905260" className="btn-outline" style={{ fontSize: 15, padding: "15px 36px" }}>
            <Phone size={16} strokeWidth={2} /> +91 9111905260
          </a>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="footer" style={{
        borderTop: "1px solid rgba(255,255,255,0.06)", background: "#080808",
        padding: "24px 40px", display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 2 }}>
          MG<span style={{ color: "#00FF87" }}>DUDES</span>
        </div>
        <div style={{ color: "#555", fontSize: 12, fontFamily: "'Space Mono'" }}>
          © 2026 — Built with 🔥
        </div>
        <div className="footer-links" style={{ display: "flex", gap: 24 }}>
          {["Fiverr", "Upwork", "LinkedIn"].map(s => (
            <a key={s} href="#" className="footer-link">{s}</a>
          ))}
        </div>
      </footer>
    </>
  );
}