import { useState, useEffect, useRef, useCallback } from "react";

const SERVICES = [
  {
    icon: "⚡",
    title: "Landing Pages",
    desc: "High-converting landing pages that turn visitors into paying customers. Fast, clean, and built to perform.",
    tags: ["React", "HTML/CSS", "Animations"],
  },
  {
    icon: "🛒",
    title: "E-Commerce Stores",
    desc: "Full-featured online stores with smooth checkout flows, product listings, and admin panels.",
    tags: ["Shopify", "WooCommerce", "Custom"],
  },
  {
    icon: "🎨",
    title: "Custom Web Apps",
    desc: "Fully custom web applications tailored to your business needs — dashboards, portals, SaaS tools.",
    tags: ["React", "Node.js", "APIs"],
  },
  {
    icon: "📱",
    title: "Responsive Design",
    desc: "Pixel-perfect on every device. Mobile-first development that looks stunning on phones, tablets, and desktops.",
    tags: ["Mobile", "Tablet", "Desktop"],
  },
  {
    icon: "🎯",
    title: "Figma to HTML / React / Next.js",
    desc: "Pixel-perfect conversion of any Figma design into clean, production-ready HTML, React, or Next.js code. Exactly as designed — no compromises.",
    tags: ["Figma", "React", "Next.js"],
  },
  {
    icon: "🔧",
    title: "Bug Fixes & Updates",
    desc: "Quick turnaround on fixes, feature additions, and updates to your existing website or app.",
    tags: ["Quick", "Reliable", "Affordable"],
  },
];

// ✏️ REPLACE these with your actual project links from Notion
const PROJECTS = [
  {
    id: 1,
    title: "KOOF",
    category: "Landing Page",
    desc: "Cashbox is a new person-to-person money transfer app that provides enhanced security features when sending money.",
    longDesc: "KOOF is a person-to-person money transfer landing page built to convey trust and security. The design focuses on clear value propositions, a clean layout, and strong CTAs that drive sign-ups. Built with smooth animations and a mobile-first approach to maximize conversions across all devices.",
    link: "https://work.mobidudes.in/Mohit/koof/",
    tech: ["HTML", "CSS", "JS", "Animations"],
    color: "#0022ffff",
    highlights: ["Secure transfer flow UI", "Mobile-first responsive layout", "Smooth CSS animations", "High-converting CTA sections"],
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Fynsd - A Finance Learning Site",
    category: "Website",
    desc: "Fynsd is designed to make finance simple, modern, and accessible. Through clear guides, practical tools, and a supportive community, we help learners gain confidence in managing their money effectively.",
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
    longDesc: "A complete redesign of the Monkk landing page featuring a fresh green aesthetic and improved visual hierarchy. The revamped layout includes GSAP-powered scroll animations, a refined brand identity, and an optimized conversion flow that resulted in significantly higher CTA click rates than the original version.",
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
    longDesc: "Full corporate website for a digital agency. Dark, premium aesthetic with smooth scroll animations, an interactive portfolio grid, services breakdown, team section, and multi-step contact form. Built with Framer Motion page transitions to position the agency as a premium brand.",
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
    longDesc: "Landing page for Tawazun, a wellness app born in the UAE. The page communicates health, calm, and cutting-edge technology simultaneously. Features an animated app preview, waitlist funnel, fasting & hydration tracker previews, and a seamless App Store / Play Store CTA flow.",
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
    desc: "Your Trusted Real Estate Partner - From finding the perfect home to creating seamless selling experiences, we're here to make every move matter.",
    longDesc: "Estal is a real estate platform built to connect buyers and sellers seamlessly. From property listings to guided selling experiences, every section of the site is optimized for trust and conversion. Built with clean HTML, CSS and JS with smooth animations throughout.",
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
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
  { value: "100%", label: "Job Success" },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We discuss your goals, audience, and vision to define the perfect solution." },
  { step: "02", title: "Design", desc: "Wireframes and UI mockups so you see exactly what you're getting before we code." },
  { step: "03", title: "Develop", desc: "Clean, fast, production-ready code with regular updates and progress checks." },
  { step: "04", title: "Deliver", desc: "Thorough testing, deployment, and a handover with docs — zero headaches." },
];

function useTypingEffect(words, speed = 100, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout;
    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed((prev) =>
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
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const duration = 1500;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) {
            setCount(num);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 400);
  }, [onClose]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [close]);

  const prev = () => { setImgLoaded(false); setImgIndex(i => (i - 1 + project.images.length) % project.images.length); };
  const next = () => { setImgLoaded(false); setImgIndex(i => (i + 1) % project.images.length); };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(4,4,4,0.88)",
        backdropFilter: "blur(8px)",
        animation: closing ? "pmFadeOut 0.4s ease both" : "pmFadeIn 0.35s ease both",
        display: "flex", alignItems: "stretch", justifyContent: "flex-end",
      }}
      onClick={close}
    >
      <div
        style={{
          width: "min(780px, 100vw)",
          background: "#0e0e0e",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          display: "flex", flexDirection: "column",
          overflowY: "auto",
          animation: closing ? "pmSlideOut 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both" : "pmSlideIn 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* TOP BAR */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky", top: 0, background: "#0e0e0e", zIndex: 10,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
              textTransform: "uppercase", padding: "4px 12px", border: `1px solid ${project.color}55`,
              borderRadius: 100, color: project.color,
            }}>
              {project.category}
            </span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, opacity: 0.5, color: project.color }}>
              {String(project.id).padStart(2, "0")}
            </span>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            style={{
              width: 36, height: 36, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", color: "#888",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", borderRadius: 4, transition: "all 0.25s", flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F0EDE8"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#888"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* BODY */}
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>
          {/* GALLERY */}
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
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    style={{
                      position: "absolute", top: "50%", left: 12, transform: "translateY(-50%)",
                      width: 40, height: 40, background: "rgba(8,8,8,0.7)",
                      border: "1px solid rgba(255,255,255,0.12)", color: "#F0EDE8",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", zIndex: 3, borderRadius: 4,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    style={{
                      position: "absolute", top: "50%", right: 12, transform: "translateY(-50%)",
                      width: 40, height: 40, background: "rgba(8,8,8,0.7)",
                      border: "1px solid rgba(255,255,255,0.12)", color: "#F0EDE8",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", zIndex: 3, borderRadius: 4,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
              <div style={{
                position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                background: "rgba(8,8,8,0.7)", padding: "4px 12px",
                fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#888",
                zIndex: 3, display: "flex", alignItems: "center", gap: 4, borderRadius: 100,
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
                  onClick={() => { setImgLoaded(false); setImgIndex(i); }}
                  style={{
                    flex: 1, aspectRatio: "16/9", overflow: "hidden", cursor: "pointer",
                    border: `2px solid ${i === imgIndex ? project.color : "transparent"}`,
                    opacity: i === imgIndex ? 1 : 0.5, borderRadius: 4,
                    transition: "all 0.25s",
                  }}
                >
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 4vw, 38px)",
              lineHeight: 1.05, marginBottom: 14, letterSpacing: 0.5,
            }}>{project.title}</h2>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{project.longDesc}</p>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Key Features</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#ccc", lineHeight: 1.5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.color, flexShrink: 0, marginTop: 6, display: "block" }} />
                  {h}
                </li>
              ))}
            </ul>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, marginTop: 24 }}>Tech Stack</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  fontSize: 12, fontFamily: "'Space Mono', monospace",
                  padding: "5px 13px", border: `1px solid ${project.color}44`,
                  borderRadius: 4, color: project.color,
                }}>{t}</span>
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 28, display: "inline-flex", alignItems: "center", gap: 9,
                padding: "14px 28px", fontWeight: 700, fontSize: 14, letterSpacing: 0.3,
                border: "none", borderRadius: 4, cursor: "pointer", color: "#080808",
                fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
                transition: "all 0.25s ease", alignSelf: "flex-start",
                background: project.color,
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Visit Live Site
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(null);

  const typed = useTypingEffect(
    ["Landing Pages", "Web Apps", "E-Commerce", "Dashboards", "Business Sites"],
    90,
    2200
  );

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background: #080808; color: #F0EDE8; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #111; }
    ::-webkit-scrollbar-thumb { background: #00FF87; border-radius: 2px; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes pmSlideIn { from{opacity:0;transform:translateX(60px)} to{opacity:1;transform:translateX(0)} }
    @keyframes pmSlideOut { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(60px)} }
    @keyframes pmFadeIn { from{opacity:0} to{opacity:1} }
    @keyframes pmFadeOut { from{opacity:1} to{opacity:0} }
    @keyframes pmImgIn { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .float { animation: float 4s ease-in-out infinite; }
    .cursor-glow {
      position: fixed; width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 70%);
      pointer-events: none; z-index: 0; transition: all 0.1s linear;
      transform: translate(-50%, -50%);
    }
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px; background: #00FF87;
      transition: width 0.3s ease;
    }
    .nav-link:hover::after { width: 100%; }
    .service-card:hover { transform: translateY(-6px); border-color: #00FF87 !important; }
    .project-card:hover .project-overlay { opacity: 1; }
    .project-card:hover .project-img { transform: scale(1.05); }
    .grain {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 1000; opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(0,255,135,0.1); border: 1px solid rgba(0,255,135,0.3);
      color: #00FF87; padding: 6px 16px; border-radius: 100px; font-size: 13px;
      font-family: 'Space Mono', monospace; animation: fadeUp 0.5s ease 0.2s both;
    }
    .dot { width: 6px; height: 6px; background: #00FF87; border-radius: 50%; animation: pulse 1.5s infinite; }
    .btn-primary {
      background: #00FF87; color: #080808; font-weight: 700;
      padding: 14px 32px; border: none; border-radius: 4px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px; letter-spacing: 0.5px;
      transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary:hover { background: #00e67a; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,255,135,0.3); }
    .btn-outline {
      background: transparent; color: #F0EDE8; font-weight: 600;
      padding: 14px 32px; border: 1px solid rgba(240,237,232,0.3); border-radius: 4px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 15px;
      transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-outline:hover { border-color: #00FF87; color: #00FF87; transform: translateY(-2px); }
    .tag {
      font-size: 11px; font-family: 'Space Mono', monospace;
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      padding: 3px 10px; border-radius: 3px; color: #999;
    }
    .section-label {
      font-family: 'Space Mono', monospace; font-size: 11px; color: #00FF87;
      letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; display: block;
    }
    .divider { width: 40px; height: 2px; background: #00FF87; margin: 16px 0; }
    .step-line {
      position: absolute; top: 24px; left: 50%; width: 100%; height: 1px;
      background: linear-gradient(90deg, #00FF87, transparent);
    }
    /* Project card hover hint */
    .project-view-hint {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      background: rgba(8,8,8,0.72); opacity: 0; transition: opacity 0.35s ease;
      z-index: 2; gap: 8px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;
      font-family: 'Space Mono', monospace;
    }
    .project-card-wrap:hover .project-view-hint { opacity: 1; }
    .project-mock-img {
      position: absolute; inset: 0; object-fit: cover; width: 100%; height: 100%;
      opacity: 0; transition: opacity 0.45s ease;
    }
    .project-card-wrap:hover .project-mock-img { opacity: 0.25; }
    .project-arrow { font-size: 18px; flex-shrink: 0; transition: transform 0.3s; }
    .project-card-wrap:hover .project-arrow { transform: translate(3px, -3px); }
  `;

  return (
    <>
      <style>{fontStyle}</style>
      <div className="grain" />
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* Project Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(8,8,8,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 2, color: "#F0EDE8" }}>
          MG<span style={{ color: "#00FF87" }}>DUDEs</span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["home", "services", "work", "process", "contact"].map(s => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)} style={{
              background: "none", border: "none", color: "#999", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              textTransform: "capitalize", transition: "color 0.2s",
              padding: "4px 0"
            }}
              onMouseEnter={e => e.target.style.color = "#F0EDE8"}
              onMouseLeave={e => e.target.style.color = "#999"}
            >{s}</button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "10px 22px", fontSize: 13 }}>
            Hire US ↗
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 40px 80px",
        margin: "0 auto", position: "relative"
      }}>
        <div style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
          <div className="hero-badge">
            <div className="dot" />
            Available for new projects
          </div>
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(72px, 10vw, 140px)", lineHeight: 0.95,
          marginTop: 32, marginBottom: 0, letterSpacing: "-1px",
          animation: "fadeUp 0.6s ease 0.3s both"
        }}>
          WE BUILD<br />
          <span style={{
            background: "linear-gradient(135deg, #00FF87 0%, #00BFFF 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            {typed}<span style={{ animation: "pulse 0.8s infinite", WebkitTextFillColor: "#00FF87" }}>|</span>
          </span><br />
          THAT CONVERT.
        </h1>

        <p style={{
          fontSize: 18, color: "#888", maxWidth: 520, lineHeight: 1.7,
          marginTop: 32, marginBottom: 40,
          animation: "fadeUp 0.6s ease 0.5s both"
        }}>
          Full-stack web developer specializing in fast, beautiful, and high-converting websites for businesses worldwide. Based in India, working globally.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.6s ease 0.6s both" }}>
          <button className="btn-primary" onClick={() => scrollTo("work")}>
            View OUR Works ↓
          </button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>
            Let's Talk
          </button>
        </div>

        {/* scroll hint */}
        <div style={{
          position: "absolute", bottom: 40, left: 40, display: "flex",
          alignItems: "center", gap: 12, color: "#555", fontSize: 12,
          fontFamily: "'Space Mono'", animation: "fadeUp 1s ease 1s both"
        }}>
          <div style={{
            width: 1, height: 60, background: "linear-gradient(180deg,#00FF87,transparent)"
          }} />
          Scroll to explore
        </div>
      </section>

      {/* STATS */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 40px", background: "rgba(0,255,135,0.02)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: "#00FF87", lineHeight: 1 }}>
                <CountUp target={parseInt(value)} suffix={value.replace(/\d/g, "")} />
              </div>
              <div style={{ color: "#666", fontSize: 13, marginTop: 6, fontFamily: "'Space Mono'" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 40px", margin: "0 auto" }}>
        <span className="section-label">— What We Do</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 64, lineHeight: 1, marginBottom: 16 }}>
          SERVICES<br /><span style={{ color: "#00FF87" }}>& EXPERTISE</span>
        </h2>
        <div className="divider" />
        <p style={{ color: "#888", fontSize: 16, maxWidth: 480, lineHeight: 1.7, marginBottom: 64 }}>
          End-to-end web development services built for results. No fluff — just clean code and beautiful design.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card" style={{
              padding: "36px 32px", border: "1px solid rgba(255,255,255,0.07)",
              transition: "all 0.3s ease", cursor: "default", background: "#0C0C0C",
              animation: `fadeUp 0.5s ease ${i * 0.1}s both`
            }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'DM Sans'", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" style={{ padding: "100px 40px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 64, lineHeight: 1 }}>
              RECENT<br /><span style={{ color: "#00FF87" }}>PROJECTS</span>
            </h2>
            <p style={{ color: "#777", fontSize: 14, maxWidth: 300, textAlign: "right", lineHeight: 1.7 }}>
              Real projects for real clients. Click any card to explore details and the live site.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className="project-card-wrap"
                onClick={() => setActiveProject(p)}
                style={{
                  color: "inherit", display: "block",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8, overflow: "hidden", position: "relative",
                  transition: "all 0.3s ease", cursor: "pointer",
                  animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                  textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Colored top bar */}
                <div style={{ height: 4, background: p.color }} />

                {/* Mock browser window */}
                <div style={{
                  background: "#111", padding: "20px",
                  minHeight: 160, display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "center", position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Preview image fades on hover */}
                  <img src={p.images[0]} alt="" className="project-mock-img" />

                  {/* Browser dots */}
                  <div style={{ position: "absolute", top: 12, left: 16, display: "flex", gap: 5, zIndex: 1 }}>
                    {["#FF5F57", "#FFBD2E", "#28CA41"].map(c => (
                      <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.6 }} />
                    ))}
                  </div>

                  {/* Project number display */}
                  <div style={{
                    fontFamily: "'Bebas Neue'", fontSize: 80, color: p.color,
                    opacity: 0.15, lineHeight: 1, userSelect: "none", position: "relative", zIndex: 1
                  }}>
                    {String(p.id).padStart(2, "0")}
                  </div>
                  <div style={{
                    position: "absolute", bottom: 16, right: 16,
                    background: "rgba(255,255,255,0.07)", borderRadius: 4,
                    padding: "4px 10px", fontSize: 11, fontFamily: "'Space Mono'",
                    color: p.color, zIndex: 1
                  }}>
                    {p.category}
                  </div>

                  {/* Hover hint */}
                  <div className="project-view-hint" style={{ color: p.color }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    View Details
                  </div>
                </div>

                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700 }}>{p.title}</h3>
                    <span className="project-arrow" style={{ color: p.color }}>↗</span>
                  </div>
                  <p style={{ color: "#777", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <span className="section-label">— How It Works</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 64, lineHeight: 1, marginBottom: 64 }}>
          MY SIMPLE<br /><span style={{ color: "#00FF87" }}>PROCESS</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {PROCESS.map((p, i) => (
            <div key={i} style={{ position: "relative", animation: `fadeUp 0.5s ease ${i * 0.15}s both` }}>
              {i < PROCESS.length - 1 && (
                <div style={{
                  position: "absolute", top: 22, left: 70,
                  width: "80%", height: 1,
                  background: "linear-gradient(90deg, rgba(0,255,135,0.4), transparent)",
                  zIndex: 0
                }} />
              )}
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                border: "2px solid #00FF87", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Mono'", fontSize: 12, color: "#00FF87",
                marginBottom: 20, background: "rgba(0,255,135,0.08)", position: "relative", zIndex: 1
              }}>
                {p.step}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY HIRE ME */}
      <section style={{
        padding: "80px 40px", background: "#0C0C0C",
        borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span className="section-label">— Why Choose Me</span>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 56, lineHeight: 1, marginBottom: 32 }}>
              NO DELAYS.<br />NO BS.<br /><span style={{ color: "#00FF87" }}>JUST RESULTS.</span>
            </h2>
            <p style={{ color: "#888", lineHeight: 1.8, fontSize: 15 }}>
              I've worked with clients from 15+ countries delivering websites that look stunning and perform even better. I communicate clearly, meet deadlines, and build long-term relationships.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              ["⚡", "Fast Delivery", "Most projects delivered within 3–7 days."],
              ["💬", "Clear Communication", "Daily updates, quick replies, zero ghosting."],
              ["🔄", "Unlimited Revisions", "We iterate until you're 100% satisfied."],
              ["🔒", "Post-Launch Support", "30 days free support after every delivery."],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{
                display: "flex", gap: 16, padding: "20px 24px",
                border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8,
                transition: "border-color 0.3s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#00FF87"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
              >
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: "#777", fontSize: 13 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" style={{
        padding: "120px 40px", textAlign: "center",
        background: "radial-gradient(ellipse at center, rgba(0,255,135,0.05) 0%, transparent 60%)"
      }}>
        <span className="section-label" style={{ justifyContent: "center", display: "block" }}>— Let's Work Together</span>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(56px, 8vw, 100px)", lineHeight: 1, marginBottom: 24 }}>
          READY TO BUILD<br /><span style={{ color: "#00FF87" }}>SOMETHING GREAT?</span>
        </h2>
        <p style={{ color: "#888", fontSize: 17, maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.7 }}>
          Whether it's a landing page, full web app, or just a quick fix — I'm here to help. Let's discuss your project.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:mgdudes@gmail.com">
            <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>
              📧 mgdudes@gmail.com
            </button>
          </a>
          <a href="tel:+91XXXXXXXXXX">
            <button className="btn-outline" style={{ fontSize: 16, padding: "16px 40px" }}>
              📞 +91 9111905260
            </button>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 40px", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        background: "#080808"
      }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 2 }}>
          MG<span style={{ color: "#00FF87" }}>DUDES</span>
        </div>
        <div style={{ color: "#555", fontSize: 12, fontFamily: "'Space Mono'" }}>
          © 2026 — Built with 🔥
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Fiverr", "Upwork", "LinkedIn"].map(s => (
            <a key={s} href="#" style={{ color: "#555", fontSize: 12, textDecoration: "none", fontFamily: "'Space Mono'", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#00FF87"}
              onMouseLeave={e => e.target.style.color = "#555"}
            >{s}</a>
          ))}
        </div>
      </footer>
    </>
  );
}