/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  UserCheck,
  AtSign,
  MapPin,
  ArrowRight,
  ChevronUp,
  Home,
  Briefcase,
  Code2,
  LayoutGrid,
  ScrollText,
  Mail,
  Linkedin,
  Github,
  User,
  Coffee,
  Monitor,
  Cpu,
  Zap,
  Sparkles,
  Bug
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// Icon aliases
const VerifiedIcon = UserCheck;
const EmailIcon = AtSign;
const LocationIcon = MapPin;
const ArrowRightIcon = ArrowRight;

const MediumIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.82 6.82 0 1113.54 12zM20.96 12c0 3.54-1.51 6.41-3.38 6.41s-3.38-2.87-3.38-6.41 1.51-6.41 3.38-6.41 3.38 2.87 3.38 6.41zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
  </svg>
);





// ——— Floating Particles ———
function FloatingParticles() {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 4,
  }));
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/10 pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -5, 8, 0],
            opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// ——— Bug Hunter Easter Egg ———
function BugHunter() {
  const [pos, setPos] = useState({ x: -5, y: 20, rotate: 90 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const moveBug = () => {
      // Pick a random edge or spot
      const newX = Math.random() * 90 + 5;
      const newY = Math.random() * 90 + 5;

      const dx = newX - pos.x;
      const dy = newY - pos.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      setPos({ x: newX, y: newY, rotate: angle + 90 });
      setVisible(true);

      // Hide occasionally to keep it stealthy
      if (Math.random() > 0.6) {
        setTimeout(() => setVisible(false), 4000);
      }
    };

    const interval = setInterval(moveBug, 12000);
    const initialTimeout = setTimeout(moveBug, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [pos.x, pos.y]);

  return (
    <motion.div
      className="fixed z-[100] pointer-events-none text-red-500/20"
      initial={{ opacity: 0 }}
      animate={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        rotate: pos.rotate,
        opacity: visible ? 1 : 0
      }}
      transition={{
        left: { duration: 10, ease: "linear" },
        top: { duration: 10, ease: "linear" },
        rotate: { duration: 1 },
        opacity: { duration: 2 }
      }}
    >
      <Bug size={12} fill="currentColor" />
    </motion.div>
  );
}

// ——— Scroll-to-top Button ———
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-40 w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg magnetic-btn"
          aria-label="Scroll to top"
          id="scroll-to-top-btn"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ——— Stats Counter Section ———



export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const [activeNavLink, setActiveNavLink] = useState("home");

  // Parallax scroll for hero
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Active section tracking via scroll position
  useEffect(() => {
    const sections = ["home", "experience", "skills", "blog", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Force 'home' if at the very top
      if (scrollY < 100) {
        setActiveNavLink("home");
        return;
      }

      // If near the very bottom, activate last section
      if (scrollY + windowHeight >= document.documentElement.scrollHeight - 50) {
        setActiveNavLink("contact");
        return;
      }

      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.3) {
            current = id;
          }
        }
      }
      setActiveNavLink(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Use timeout to ensure elements are measured after layout settled
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Staggered fade-in
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
  };

  const navLinks = [
    { id: "home", label: "Home", icon: Home },
    { id: "experience", label: "Exp", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "blog", label: "Blog", icon: ScrollText },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary/20 pb-20 md:pb-0 overflow-x-hidden">
      <ScrollToTop />
      <BugHunter />

      {/* Navigation — Slim icon sidebar on desktop, bottom bar on mobile/tablet */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed bottom-0 left-0 w-full h-[72px] md:h-screen md:w-[88px] bg-surface-container-lowest/95 backdrop-blur-xl z-50 border-t md:border-t-0 md:border-r border-outline-variant/15 flex md:flex-col items-center"
      >
        {/* Logo (desktop only) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center justify-center w-full py-6 shrink-0"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveNavLink("home");
              window.history.pushState(null, "", "#home");
            }}
            className="cursor-pointer"
          >
            <img
              src="/logo/dn-logo.svg"
              alt="DN Logo"
              className="w-14 h-auto object-contain hover:scale-110 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* Divider (desktop only) */}
        <div className="hidden md:block w-8 h-px bg-outline-variant/20 mb-4 shrink-0" />

        {/* Nav Links */}
        <div className="flex md:flex-col w-full justify-around md:justify-start md:gap-1 flex-1 items-center px-1 md:px-2">
          {navLinks.map((link, idx) => {
            const Icon = link.icon;
            const isActive = activeNavLink === link.id;
            return (
              <motion.a
                key={link.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                className={`relative flex flex-col items-center justify-center gap-1 py-2 md:py-3 w-full rounded-xl transition-all duration-300 group ${isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
                  }`}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(link.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    setActiveNavLink(link.id);
                    window.history.pushState(null, "", `#${link.id}`);
                  }
                }}
              >
                {/* Active indicator bar (desktop: left bar, mobile: top dot) */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-indicator"
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-r-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-dot"
                    className="md:hidden absolute -top-0.5 w-5 h-[3px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${isActive ? "bg-primary/10" : "group-hover:bg-surface-container-high"}`}>
                  <Icon size={20} className="transition-transform duration-300" strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className={`text-[9px] md:text-[10px] font-label uppercase tracking-[0.08em] transition-colors duration-300 ${isActive ? "font-bold" : "font-medium"}`}>
                  {link.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </motion.nav>

      {/* Main Content Wrapper - Removed w-full to prevent overflow with margin-left */}
      <main className="md:ml-[88px] relative overflow-x-clip min-h-svh">
        {/* New Hero Section (Home) - Using min-h-svh for better Safari height handling */}
        <header ref={heroRef} className="min-h-svh flex flex-col justify-center px-6 md:px-12 bg-surface overflow-hidden relative" id="home">
          {/* Mobile Logo Top Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveNavLink("home");
                window.history.pushState(null, "", "#home");
              }}
              className="cursor-pointer"
            >
              <img src="/logo/dn-logo.svg" alt="DN Logo" className="w-16 h-auto" />
            </a>
          </motion.div>

          <FloatingParticles />
          <div className="max-w-7xl mx-auto w-full relative z-10 pt-28 md:pt-0">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              {/* Main Greeting */}
              <motion.div {...fadeIn} className="space-y-8">
                <div className="space-y-4">

                  <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight leading-tight">
                    Hey! I'm <br /><span className="shimmer-text">Dinithi Nimesha.</span>
                  </h1>
                  <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-xl">
                    Bugs fear me. Selenium obeys me. Playwright is my runway. Living the <span className="text-tertiary font-semibold">zero-defect lifestyle</span> — one test suite at a time.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-2">My Philosophy</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Quality is a structural commitment, not a final phase verification.</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-2">My Mission</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Validating the unseen, strengthening the core, and ensuring seamless scalability.</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* QA Lifestyle Cards */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  {
                    icon: Coffee,
                    title: "Fuel",
                    desc: "Powered by caffeine and deep-dive root cause analysis sessions.",
                    color: "bg-tertiary-container/30 text-tertiary"
                  },
                  {
                    icon: Monitor,
                    title: "Arsenal",
                    desc: "Selenium, Playwright, and a thirst for automated precision.",
                    color: "bg-primary-container/30 text-primary"
                  },
                  {
                    icon: Cpu,
                    title: "Mindset",
                    desc: "Zero-trust verification for every single micro-service node.",
                    color: "bg-secondary-container/30 text-secondary"
                  },
                  {
                    icon: Sparkles,
                    title: "Goal",
                    desc: "Zero-bug deployments and seamless user experiences at scale.",
                    color: "bg-surface-container-highest text-on-surface"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    variants={{
                      initial: { opacity: 0, scale: 0.8 },
                      whileInView: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)" }}
                    className="p-6 rounded-2xl border border-outline-variant/10 bg-surface-container-low transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6 ${item.color}`}>
                      <item.icon size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-on-surface mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-outline-variant/40 rounded-full flex justify-center pt-2"
            >
              <motion.div
                animate={{ opacity: [1, 0], y: [0, 12] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </header>


        {/* Experience Log Section — with timeline animation */}
        <section className="py-24 px-6 md:px-12 bg-surface-container-low relative" id="experience">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeIn} className="mb-16">
              <div className="space-y-4">

                <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Execution Trace</h2>
                <p className="text-on-surface-variant max-w-md">Chronological record of quality audits, verification protocols, and systematic architectural fortification.</p>
              </div>
            </motion.div>

            <div className="relative space-y-12 pb-12">
              {/* Vertical timeline line */}
              <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-outline-variant/30 hidden md:block" />

              {[
                {
                  date: "2026 — Present",
                  role: "Associate QA Engineer",
                  company: "ICIEOS",
                  desc: "Orchestrating comprehensive automation frameworks for high-stakes enterprise applications. Focused on scaling test coverage across legacy and modern tech stacks while maintaining sub-second feedback loops in CI/CD pipelines. My priority is shifting the testing left, ensuring reliability is baked in from the first line of code.",
                  tags: ["Selenium", "Playwright", "Java", "TypeScript", "CI/CD", "Jira"],
                  color: "bg-green-600"
                },
                {
                  date: "2025 — 2026",
                  role: "Intern QA Engineer",
                  company: "ICIEOS",
                  desc: "Spearheaded end-to-end quality validation for a large-scale E-commerce ecosystem. Conducted rigorous manual audits, performance stress tests, and API contract validations, successfully identifying 40+ critical production-blocking issues during the hyper-growth phase.",
                  tags: ["Manual Auditing", "E-commerce", "JMeter", "Postman", "Defect Management"],
                  color: "bg-tertiary"
                }
              ].map((exp, idx) => (
                <motion.div
                  key={exp.role + idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className="relative pl-0 md:pl-10 group"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface ${exp.color} ring-4 ring-surface shadow-sm hidden md:block z-10 transition-transform group-hover:scale-125`} />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">{exp.role}</h3>
                      <p className={`font-semibold ${exp.color === 'bg-green-600' ? 'text-green-700' : 'text-tertiary'}`}>{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-outline uppercase tracking-widest whitespace-nowrap">{exp.date}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <p className="text-on-surface-variant text-sm max-w-3xl leading-relaxed italic">
                      "{exp.desc}"
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold uppercase tracking-wider rounded-md border border-outline-variant/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* QA Toolkit Section */}
        <section className="py-24 px-6 md:px-12 bg-surface relative" id="skills">
          <div className="max-w-7xl mx-auto space-y-16">

            {/* Header */}
            <motion.div {...fadeIn} className="space-y-3">
              <h2 className="text-4xl font-headline font-bold text-on-surface">Skills</h2>
              <p className="text-on-surface-variant max-w-lg">The weapons of precision — every tool, every test type, every methodology that keeps production safe.</p>
            </motion.div>

            {/* Skill Categories */}
            <motion.div {...fadeIn} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  category: "Automation",
                  color: "border-primary/30 bg-primary/5",
                  dot: "bg-primary",
                  skills: ["Selenium", "Playwright", "TestNG", "JUnit", "Page Object Model", "Data-Driven Testing"]
                },
                {
                  category: "API & Performance",
                  color: "border-tertiary/30 bg-tertiary/5",
                  dot: "bg-tertiary",
                  skills: ["Postman", "REST Assured", "Swagger", "JMeter", "K6", "Load Testing"]
                },
                {
                  category: "Security",
                  color: "border-secondary/30 bg-secondary/5",
                  dot: "bg-secondary",
                  skills: ["OWASP ZAP", "Penetration Testing", "SQL Injection", "XSS Auditing", "Secure SDLC"]
                },
                {
                  category: "DevOps & Cloud",
                  color: "border-green-500/30 bg-green-500/5",
                  dot: "bg-green-500",
                  skills: ["Git", "GitHub Actions", "Docker", "Jenkins", "Jira", "Azure DevOps"]
                }
              ].map((group, gIdx) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gIdx * 0.1 }}
                  className={`p-6 rounded-2xl border ${group.color} space-y-4`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${group.dot}`} />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-surface rounded-lg text-[10px] font-semibold text-on-surface-variant border border-outline-variant/10 hover:text-on-surface hover:border-outline-variant/30 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tools Grid with Logos */}
            <motion.div {...fadeIn} className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Tools I Work With</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                {[
                  { name: "Selenium", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
                  { name: "Playwright", logo: "https://playwright.dev/img/playwright-logo.svg" },
                  { name: "OWASP ZAP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/OWASP_ZAP_logo.svg/960px-OWASP_ZAP_logo.svg.png" },
                  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
                  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
                  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
                  { name: "Jira", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
                  { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
                ].map((tool, tIdx) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: tIdx * 0.04 }}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/10 hover:border-outline-variant/30 hover:bg-surface-container transition-all cursor-default group"
                    title={tool.name}
                  >
                    <img src={tool.logo} alt={tool.name} className="w-7 h-7 object-contain transition-all duration-300" />
                    <span className="text-[9px] text-on-surface-variant font-medium text-center leading-tight">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>



        {/* Blog Section — with reveal animations */}
        <section className="py-24 px-6 md:px-12 bg-surface relative" id="blog">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeIn} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <div className="space-y-4">

                <h2 className="text-4xl font-headline font-bold text-on-surface">Recent Insights</h2>
              </div>
              <motion.a
                whileHover={{ x: 5 }}
                href="https://medium.com/@dinithidnnimesha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-primary flex items-center gap-2 border-b-2 border-primary/20 pb-1 hover:border-primary transition-all"
              >
                FOLLOW ON MEDIUM <ArrowRightIcon size={16} />
              </motion.a>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  date: "APR 01, 2026",
                  title: "The Evolution of the Quality Architect: What a QA Engineer Actually Does in 2026",
                  desc: "The transition from QA Engineer to Quality Architect marks a pivotal shift in software excellence. Explore how we're redefining quality as a core architectural pillar in 2026.",
                  img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
                  link: "https://medium.com/@dinithidnnimesha/the-evolution-of-the-quality-architect-what-a-qa-engineer-actually-does-in-2026-c3f88fbed936"
                },
                {
                  date: "DEC 21, 2025",
                  title: "Quality Assurance in the Age of AI: From Testing Software to Engineering Confidence",
                  desc: "The shift from execution to orchestration is the most significant change in our industry. We are no longer bug-hunters; we are resilience architects.",
                  img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
                  link: "https://medium.com/@dinithidnnimesha/quality-assurance-in-the-age-of-ai-from-testing-software-to-engineering-confidence-63fa0600100d"
                },
                {
                  date: "AUG 10, 2025",
                  title: "Why Email Validation Matters in Software Testing",
                  desc: "As a manual tester, our time is divided according to priorities and the functionality we need to test. In my current project...",
                  img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
                  link: "https://medium.com/@dinithidnnimesha/why-email-validation-matters-in-software-testing-9c0bbcedd873"
                }
              ].map((post, idx) => (
                <motion.a
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col md:flex-row gap-8 p-8 bg-surface-container-low hover:bg-surface-container-high transition-all rounded-2xl border border-outline-variant/10"
                >
                  <div className="flex-1 space-y-4">
                    <span className="text-[10px] font-bold text-outline tracking-widest">{post.date}</span>
                    <h3 className="text-2xl md:text-3xl font-headline font-bold leading-tight group-hover:text-tertiary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm line-clamp-2 md:line-clamp-3 leading-relaxed">
                      {post.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary pt-2">
                      READ PROTOCOL <ArrowRightIcon size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="w-full md:w-64 h-48 md:h-auto shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section — with staggered field reveals */}
        <section className="py-24 px-6 md:px-12 bg-surface-container-low relative overflow-hidden" id="contact">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl morph-blob pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-20">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-8"
              >
                <h2 className="text-5xl font-headline font-extrabold text-on-surface tracking-tighter">
                  Initialize <br />
                  <span className="shimmer-text">Contact.</span>
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Interested in elevating your product's reliability? Send a secure ping to initiate collaboration or technical audit.
                </p>
                <div className="space-y-4 pt-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-on-primary group-hover:scale-110 transition-transform">
                      <EmailIcon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Protocol</p>
                      <p className="text-sm font-bold text-on-surface">dinithidnnimesha@gmail.com</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-6"
                onSubmit={handleSubmit}
                id="contact-form"
              >
                {[
                  { label: "Originator ID", placeholder: "Your Name / Organization", type: "text", field: "name" as const },
                  { label: "Callback Header", placeholder: "Email Address", type: "email", field: "email" as const },
                ].map((input, idx) => (
                  <motion.div
                    key={input.field}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="space-y-1"
                  >
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">{input.label}</label>
                    <input
                      className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 py-3 px-0 focus:ring-0 focus:border-primary transition-colors text-on-surface"
                      placeholder={input.placeholder}
                      type={input.type}
                      value={formData[input.field]}
                      onChange={(e) => setFormData({ ...formData, [input.field]: e.target.value })}
                      id={`contact-${input.field}`}
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="space-y-1"
                >
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Technical Payload</label>
                  <textarea
                    className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 py-3 px-0 focus:ring-0 focus:border-primary transition-colors text-on-surface resize-none"
                    placeholder="Brief architectural requirement, bug report, or inquiry..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    id="contact-message"
                  ></textarea>
                </motion.div>

                {/* reCAPTCHA v2 Mock Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  className="space-y-2 py-4"
                >
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Verification Protocol</label>
                  <div className="flex items-center justify-between p-4 bg-surface-container-low border border-outline-variant/20 rounded-md w-fit gap-8 cursor-pointer hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border-2 border-outline-variant rounded group-hover:border-primary/50 transition-colors flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-10 pointer-events-none" />
                      </div>
                      <span className="text-xs font-semibold text-on-surface-variant">I'm not a bot (reCAPTCHA v2)</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  disabled={status === 'sending'}
                  transition={{ delay: 0.6 }}
                  whileHover={status === 'sending' ? {} : { scale: 1.02 }}
                  whileTap={status === 'sending' ? {} : { scale: 0.98 }}
                  className={`w-full py-4 font-bold text-sm tracking-[0.2em] uppercase rounded magnetic-btn relative overflow-hidden group transition-all duration-300 ${status === 'sending' ? 'bg-outline-variant text-surface cursor-wait' :
                      status === 'success' ? 'bg-green-600 text-white' :
                        status === 'error' ? 'bg-error text-error-container' :
                          'clinical-gradient text-on-primary'
                    }`}
                  id="contact-submit-btn"
                >
                  <span className="relative z-10">
                    {status === 'sending' ? 'TRANSMITTING...' :
                      status === 'success' ? 'HANDSHAKE SUCCESS' :
                        status === 'error' ? 'HANDSHAKE ERROR' :
                          'DEPLOY HANDSHAKE'}
                  </span>
                  {status === 'idle' && (
                    <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  )}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer — with stagger reveal */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface-container-low w-full py-12 border-t border-outline-variant/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 w-full max-w-7xl mx-auto gap-8">
            <div className="flex items-center">
              <img src="/logo/dn-logo.svg" alt="DN Logo" className="w-20 h-auto object-contain" />
            </div>
            <p className="text-sm tracking-wide text-on-surface-variant/80 font-medium whitespace-nowrap">
              © 2022 - 2026 Dinith Nimesha. All rights reserved.
            </p>
            <div className="flex justify-center gap-10">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/dinithi-nimesha-324a0819b/", icon: Linkedin },
                { label: "Medium", href: "https://medium.com/@dinithidnnimesha", icon: MediumIcon },
                { label: "GitHub", href: "https://github.com/DinithiN23", icon: Github },
              ].map((link, idx) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5, color: "#006592" }}
                    title={link.label}
                    className="text-on-surface-variant transition-all opacity-70 hover:opacity-100 group"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Icon size={24} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
