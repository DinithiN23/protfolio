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
  ChevronUp
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Icon aliases
const VerifiedIcon = UserCheck;
const EmailIcon = AtSign;
const LocationIcon = MapPin;
const ArrowRightIcon = ArrowRight;



// ——— Typing Effect Component ———
function TypingText({ texts, className }: { texts: string[]; className?: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {texts[currentTextIndex].substring(0, currentCharIndex)}
      <span className="typing-cursor" />
    </span>
  );
}

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
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg magnetic-btn"
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

  const [activeNavLink, setActiveNavLink] = useState("home");

  // Parallax scroll for hero
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Active section tracking
  useEffect(() => {
    const sections = ["home", "experience", "skills", "works", "blog", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNavLink(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "works", label: "Works" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary/20">
      <ScrollToTop />

      {/* TopNavBar — with active state animation */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-surface-container-lowest/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-outline-variant/10"
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-4 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-extrabold text-on-surface font-headline tracking-tight"
          >
            QA_PORTFOLIO
          </motion.div>
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                className={`nav-link-animated font-headline font-bold tracking-tight transition-colors duration-200 ${
                  activeNavLink === link.id
                    ? "text-on-surface border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                href={`#${link.id}`}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            href="#contact"
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest magnetic-btn flex items-center gap-2"
          >
            <EmailIcon size={14} />
            Contact
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section — with parallax + typing + floating particles */}
      <header ref={heroRef} className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 bg-surface overflow-hidden" id="home">
        <FloatingParticles />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-2"
            >
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="text-tertiary font-label font-semibold uppercase text-xs"
              >
                Precision Driven Engineering
              </motion.p>
              <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-on-surface tracking-tighter leading-none">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="block"
                >
                  Associate
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="block shimmer-text"
                >
                  QA Engineer
                </motion.span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-on-surface-variant max-w-lg text-lg leading-relaxed"
            >
              Dinithi Nimesha. Orchestrating digital resilience through{" "}
              <TypingText
                texts={[
                  "clinical testing methodologies",
                  "automated precision",
                  "fault-tolerant architecture",
                  "startup scaling"
                ]}
                className="text-tertiary font-semibold"
              />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* <button
                className="clinical-gradient text-on-primary px-8 py-4 rounded-lg font-bold text-sm tracking-wide magnetic-btn relative overflow-hidden group"
                id="hero-cta-primary"
              >
                <span className="relative z-10">VIEW DOCUMENTATION</span>
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </button> */}
              {/* <button
                className="text-primary font-bold text-sm px-8 py-4 border-b-2 border-transparent hover:border-primary transition-all"
                id="hero-cta-secondary"
              >
                EXPLORE REPOS
              </button> */}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden md:block relative"
          >
            <div className="absolute -inset-4 bg-primary-container/20 blur-3xl rounded-full animate-pulse-glow"></div>
            <div className="relative scan-line-overlay rounded-xl overflow-hidden">
              <img 
                className="relative z-10 w-full h-auto object-cover rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0iQj80Jy6C9c_GafmszmjnflYr8VITvUedb233iJopy1uMAtbLIGFnXYbfmnM2jXMEhsGWZKFcoizHp5u_PKuvWRxwS1JF2m3RTncVmfXD0qhlUfn1itIhZi77CnJkoc80K4MnWKhKmRzGO4ccoX7xLWQdqoubXorcHMfx9-tLTBcSLqiPU-16sc7burG3f6sdDTDYeF8Yv5v7b4lcA1kT3QvR_21Xu5YwXTCBlD_4Paik9J2aVP_MLBQD7cLc4n5S63PuRuOlQk"
                alt="Metallic digital processor representing QA precision engineering"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
      <section className="py-24 px-6 md:px-12 bg-surface-container-low" id="experience">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="mb-16">
            <div className="space-y-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-primary mb-4"
              />
              <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Experience Log</h2>
              <p className="text-on-surface-variant max-w-md">Chronological trace of technical impact across high-growth environments.</p>
            </div>
          </motion.div>

          <div className="space-y-1 bg-surface-variant/20 rounded-xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.01 }}
              className="bg-surface-container-lowest p-8 flex flex-col md:flex-row gap-8 items-start transition-colors hover:bg-primary-container/10"
            >
              <div className="w-32 flex-shrink-0">
                <span className="text-xs font-bold text-outline uppercase tracking-tighter">2026 — Present</span>
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Associate QA Engineer</h3>
                    <p className="text-tertiary font-semibold">ICIEOS</p>
                  </div>
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  >
                    Active 
                  </motion.span>
                </div>
                <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
                  Developing robust test suites using Selenium with Java and Playwright with TypeScript to ensure seamless feature delivery and regression stability.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.01 }}
              className="bg-surface-container-lowest p-8 flex flex-col md:flex-row gap-8 items-start transition-colors hover:bg-primary-container/10"
            >
              <div className="w-32 flex-shrink-0">
                <span className="text-xs font-bold text-outline uppercase tracking-tighter">2025 — 2026</span>
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">Intern QA Engineer</h3>
                    <p className="text-tertiary font-semibold">ICIEOS</p>
                  </div>
                  <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Completed</span>
                </div>
                <div className="space-y-3">
                  <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
                    Executed comprehensive manual testing and end-to-end test scenarios for a large-scale E-commerce platform.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {[
                      "Performance: JMeter, K6, Load Testing",
                      "Security: OWASP ZAP Auditing",
                      "API: Swagger & Postman Testing"
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1 h-1 bg-tertiary rounded-full"></div>
                        <span className="text-xs text-on-surface-variant font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QA Mindset Section — with staggered skill badges */}
      <section className="py-24 px-6 md:px-12 bg-surface" id="skills">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <img 
              className="rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBadf31hmvY7YlaSe4ukjKyCGwdgRnlbMbdBtK5o5aIaJ9GHMJ7pUSp7cXWDyuCoj7n80ZwMTrVOY25bIri6Xxa9QYg4ONi93WrJ1O6lCpdwhmmZncJOddPAfJThzVx4ZTRj2dkW9a35x2CdXHdpazVsWz1T-D_vM6i7x58UkdK_MVBGNO2Vv0pKTuD98KJX710dsTlOIIv4uQlFk2sup5Z2cUMfdeSNv0vYQ4SeNUvWFYqI72yD8sSMOs-IDdVqNfNZ8-B0LE8Afc"
              alt="Architectural blueprint representing QA methodology structure"
              referrerPolicy="no-referrer"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-surface-container-lowest p-8 shadow-lg max-w-[240px] border border-outline-variant/15"
            >
              <VerifiedIcon className="text-tertiary mb-4" size={32} />
              <p className="text-xs font-label text-on-surface-variant leading-relaxed">"Quality is not an act, it is a habit of architectural verification."</p>
            </motion.div>
          </motion.div>
          <motion.div {...fadeIn} className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-headline font-bold text-on-surface">The QA Mindset</h2>
              <p className="text-on-surface-variant">Moving beyond bug hunting into structural fortification.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Automation Proficiency",
                "CI/CD Integration",
                "Security Auditing",
                "Performance Testing",
                "API Testing",
                "Cloud Infrastructure",
                "Unit Testing",
                "Load Balancing",
                "Docker / K8s",
                "Cybersecurity"
              ].map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant/20 text-xs font-bold uppercase tracking-widest text-on-surface hover:bg-primary-container/20 hover:border-tertiary/30 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ x: 4 }}
                className="p-4 border-l-2 border-primary-container hover:border-tertiary transition-colors"
              >
                <h4 className="text-sm font-bold mb-1">Shift Left</h4>
                <p className="text-xs text-on-surface-variant">Integrating testing at the earliest design phases.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                whileHover={{ x: 4 }}
                className="p-4 border-l-2 border-primary-container hover:border-tertiary transition-colors"
              >
                <h4 className="text-sm font-bold mb-1">Zero-Trust</h4>
                <p className="text-xs text-on-surface-variant">Validating every input and edge case systematically.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Works/Projects Section — with hover glow + staggered cards */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-low" id="works">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-4">Technical Portfolio</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-primary"
            />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Automated Hostel Management",
                tags: ["Automation", "Node.js"],
                desc: "A robust testing framework for student housing portals, achieving 100% path coverage for booking workflows.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMaMkLssBXiKoxviqsRDQA5UMthw9M1sdT5nTarKdukb2imjyMAuK84mk1LR7p9sJHgcb_E5hKukiNJvXazvw_z-bGUy47iOB1yf8_6fCsNmJGqBJr_J0sVXntYuNxJCcB5K1kVtntJ-LsC8na93sjvdd7pYfqWijKxsa0FlXJ_k5sl0NwDxIr4qN3QJ9RTRt05N3ktlzKnO00h6jOmQCAzVtOYKU_PpRlORE0sxxx8NCY9k7izmexWncW0B1GWMqNnqfaky13PPE"
              },
              {
                title: "AI Chatbot QA Suite",
                tags: ["AI / LLM", "Python"],
                desc: "Diagnostic framework to evaluate hallucination rates and response latency in customer-facing AI agents.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxyMwjR6XkmSXa3sugMgdBJ3Bgv0_F8V7eL3UpaMUnrQiZTJP664TAbUmDHv9FLpY1DqD9_uxPeal_uaeSQHyoqE1nv0Mqg9noexy-zdBuuqu2fIB-1dZzWKiB4xn6vCXd2jRCQMiOCBaTbc_sfqBHZokt-VOEsZdEiQ1nAaQMJ1VtOZPWmSncEmhf0KOVFnOlnukfoZG_kh0SlP1Wo-3jd_GYWzl_aXuEYjv3M8vVFEWnemq1LcWP-YL-H7shSJyzfdzqTemMz6I"
              },
              {
                title: "Payment Sandbox",
                tags: ["Fintech", "REST API"],
                desc: "Simulating high-load transaction environments to stress test idempotency and database locks.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzMb5r_2SfWnxBDMnnu8rUQ5IKQz_IoHIoaACIBlDD_Pq3HCtd-6tX2XljemY_u2RKkwHGKextL7hjXTGFToNK1COs2VHf_UwmZpYBH6NfgIcr2silXQkZwNeEfQKEuNN0DapSxqqzH1fyJm6ep2P5db4TF3g8SgpVAaR-5pESyS2dzVbz01woFu_J2TdqDjXfU46jN5-B1qL1_5oQTddB0l0P6SJ34UF7SRqZE2yb7IE89FyCbTsqGd9mZdjv0v5dAkaC5iltA9c"
              }
            ].map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-surface-container-lowest p-8 rounded-lg transition-all duration-300 hover:bg-primary-container/30 glow-border"
              >
                <div className="mb-8 overflow-hidden rounded-md">
                  <motion.img 
                    className="w-full aspect-video object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    src={project.img} 
                    alt={`${project.title} — QA project showcase`}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-tertiary">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-on-surface leading-tight">{project.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{project.desc}</p>
                  <motion.a
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all"
                    whileHover={{ x: 5 }}
                    href="#"
                  >
                    VIEW CASE STUDY <ArrowRightIcon size={14} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section — with reveal animations */}
      <section className="py-24 px-6 md:px-12 bg-surface" id="blog">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16 space-y-4">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xs font-bold text-tertiary uppercase"
            >
              Intelligence Base
            </motion.p>
            <h2 className="text-4xl font-headline font-bold text-on-surface">Recent Insights</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.01 }}
              className="bg-surface-container p-12 hover:bg-surface-container-high transition-colors flex flex-col justify-between"
            >
              <div className="space-y-6">
                <span className="text-xs font-bold text-outline">AUG 12, 2024</span>
                <h3 className="text-3xl font-headline font-bold leading-tight">The Death of Manual Regression: Why AI Won't Replace QA Engineers.</h3>
                <p className="text-on-surface-variant text-sm line-clamp-3">The shift from execution to orchestration is the most significant change in our industry. We are no longer bug-hunters; we are resilience architects.</p>
              </div>
              <motion.a
                whileHover={{ x: 5 }}
                className="mt-8 text-sm font-bold tracking-widest uppercase hover:text-tertiary transition-colors inline-block"
                href="#"
              >
                Read Protocol →
              </motion.a>
            </motion.div>
            <div className="grid grid-rows-2 gap-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="bg-surface-container p-8 hover:bg-surface-container-high transition-colors flex flex-col justify-center"
              >
                <span className="text-[10px] font-bold text-outline mb-2">JUL 28, 2024</span>
                <h4 className="text-xl font-bold mb-4">Scalability Bottlenecks in Headless Testing.</h4>
                <motion.a whileHover={{ x: 5 }} className="text-xs font-bold text-tertiary uppercase inline-block" href="#">Explore Report</motion.a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ scale: 1.01 }}
                className="bg-surface-container p-8 hover:bg-surface-container-high transition-colors flex flex-col justify-center"
              >
                <span className="text-[10px] font-bold text-outline mb-2">JUN 15, 2024</span>
                <h4 className="text-xl font-bold mb-4">Designing for Fault-Tolerance in Distributed Systems.</h4>
                <motion.a whileHover={{ x: 5 }} className="text-xs font-bold text-tertiary uppercase inline-block" href="#">Explore Report</motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section — with staggered field reveals */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-low relative overflow-hidden" id="contact">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl morph-blob pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <h2 className="text-5xl font-headline font-extrabold text-on-surface tracking-tighter">
                Initialize <br/>
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
                    <p className="text-sm font-bold text-on-surface">hello@dinithinimesha.dev</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-on-primary group-hover:scale-110 transition-transform">
                    <LocationIcon size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Deployment Origin</p>
                    <p className="text-sm font-bold text-on-surface">Colombo, SL (Remote Friendly)</p>
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
              onSubmit={(e) => e.preventDefault()}
              id="contact-form"
            >
              {[
                { label: "Subject Name", placeholder: "Your Name", type: "text", field: "name" as const },
                { label: "Return Address", placeholder: "Email Address", type: "email", field: "email" as const },
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
                    onChange={(e) => setFormData({...formData, [input.field]: e.target.value})}
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
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Payload/Message</label>
                <textarea 
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 py-3 px-0 focus:ring-0 focus:border-primary transition-colors text-on-surface resize-none" 
                  placeholder="Brief technical requirement or inquiry..." 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  id="contact-message"
                ></textarea>
              </motion.div>
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full clinical-gradient text-on-primary py-4 font-bold text-sm tracking-[0.2em] uppercase rounded magnetic-btn relative overflow-hidden group"
                id="contact-submit-btn"
              >
                <span className="relative z-10">INITIALIZE CONTACT</span>
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
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
          <div className="text-lg font-bold text-on-surface font-headline">QA_PORTFOLIO</div>
          <p className="text-sm tracking-wide uppercase text-on-surface-variant">
            © 2024 QA Engineer Portfolio. Built for Precision.
          </p>
          <div className="flex gap-8">
            {["LinkedIn", "GitHub", "Twitter", "Email"].map((link, idx) => (
              <motion.a
                key={link}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -3, color: "#006592" }}
                className="text-on-surface-variant text-sm tracking-wide uppercase transition-colors opacity-80 hover:opacity-100"
                href="#"
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
