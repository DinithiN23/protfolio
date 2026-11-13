import { projects } from './projects';
import ProjectDetail from './ProjectDetail';
import ToolCarousel from './ToolCarousel';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Menu, X, Github, Linkedin, Mail, Copy, Coffee, Monitor, Cpu, Sparkles } from 'lucide-react';

const email = 'dinithidnnimesha@gmail.com';
const navigation = ['About', 'Work', 'Experience', 'Skills', 'Writing'];
const skills = [
  { title: 'Test design', text: 'From requirements to the edge cases that are easy to miss.', tags: ['BRD / FRD analysis', 'Risk-based testing', 'Test plans & RTM', 'Exploratory testing', 'Regression', 'Cross-browser', 'End-to-end'] },
  { title: 'Test automation', text: 'Reusable browser tests that make regression testing more consistent.', tags: ['Playwright', 'TypeScript', 'Page Object Model', 'Selenium WebDriver', 'Locators & assertions'] },
  { title: 'API, performance & security', text: 'Checking the rules, responses, and behavior beneath the surface.', tags: ['Postman', 'Swagger / OpenAPI', 'REST & JSON', 'JMeter', 'k6', 'OWASP ZAP'] },
  { title: 'AI quality assurance', text: 'Evaluating answers against their sources, calculations, and intended behavior.', tags: ['LLM / RAG evaluation', 'Groundedness', 'Hallucination checks', 'Prompt injection', 'LangSmith', 'Chart & table accuracy'] },
];
const articles = [
  { date: '06 APR 2026', title: 'A wrong AI answer doesn’t always mean the AI model failed', text: 'Looking beyond the model when investigating an incorrect AI response.', url: 'https://medium.com/@dinithidnnimesha/a-wrong-ai-answer-doesnt-always-mean-the-ai-model-failed-e66e313a62bd' },
  { date: '10 AUG 2026', title: 'AI changed how we test. But have you changed how you read requirements?', text: 'Rethinking how we read and question requirements as AI changes software testing.', url: 'https://medium.com/@dinithidnnimesha/ai-changed-how-we-test-but-have-you-changed-how-you-read-requirements-1410291d0356' },
  { date: '01 APR 2026', title: 'The evolution of the quality architect', text: 'What a QA engineer actually does in 2026.', url: 'https://medium.com/@dinithidnnimesha/the-evolution-of-the-quality-architect-what-a-qa-engineer-actually-does-in-2026-c3f88fbed936' },
  { date: '21 DEC 2025', title: 'Quality assurance in the age of AI', text: 'From testing software to engineering confidence.', url: 'https://medium.com/@dinithidnnimesha/quality-assurance-in-the-age-of-ai-from-testing-software-to-engineering-confidence-63fa0600100d' },
  { date: '10 AUG 2025', title: 'Why email validation matters', text: 'A closer look at the details in software testing.', url: 'https://medium.com/@dinithidnnimesha/why-email-validation-matters-in-software-testing-9c0bbcedd873' },
];

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const isProjectPage = hash.startsWith('#/work/');
  const project = projects.find(item => hash === `#/work/${item.slug}`);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    document.title = project ? `${project.title} — Dinithi Nimesha` : isProjectPage ? 'Project not found — Dinithi Nimesha' : 'Dinithi Nimesha — Associate QA Engineer';
    setMenuOpen(false);
    const frame = requestAnimationFrame(() => {
      if (isProjectPage) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.getElementById('project-title')?.focus({ preventScroll: true });
      } else if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, isProjectPage, project]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (isProjectPage) return;
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [isProjectPage]);
  useEffect(() => { if (!copied) return; const timer = setTimeout(() => setCopied(false), 2500); return () => clearTimeout(timer); }, [copied]);
  useEffect(() => { const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  async function copyEmail() { try { await navigator.clipboard.writeText(email); setCopied(true); } catch { window.location.href = `mailto:${email}`; } }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#about" aria-label="Dinithi Nimesha, home"><img src="/logo/dn-logo.svg" alt="DN logo" width="72" height="45" /></a><nav aria-label="Main navigation" id="main-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'}>{navigation.map(item => <a key={item} href={`#${item.toLowerCase()}`} aria-current={(isProjectPage ? 'work' : active) === item.toLowerCase() ? 'location' : undefined} onClick={()=>setMenuOpen(false)}>{item}</a>)}<a className="nav-contact" href="#contact" onClick={()=>setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15}/></a></nav><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></header>
    <main id="main">
      {isProjectPage ? <ProjectDetail project={project} /> : <>
      <section className="hero wrap" id="about">
        <div className="hero-copy">
        <p className="eyebrow">ASSOCIATE QA ENGINEER</p>
        <h1>Dinithi Nimesha.</h1>
        <p className="hero-title">Quality assurance for web and AI applications.</p>
        <p className="hero-description">I test user journeys, build browser automation, and evaluate AI responses. My work combines careful investigation with practical test coverage to help teams deliver reliable software.</p>
        <div className="hero-actions"><a className="button primary" href="#work">View selected work <ArrowUpRight size={18}/></a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={17}/></a></div>
        </div>
        <div className="qa-cards" aria-label="A little about my approach to QA">
          {[
            { icon: Coffee, title: 'Fuel', desc: 'Powered by caffeine and deep-dive root cause analysis sessions.' },
            { icon: Monitor, title: 'Arsenal', desc: 'Selenium, Playwright, and a thirst for automated precision.' },
            { icon: Cpu, title: 'Mindset', desc: 'Zero-trust verification for every single micro-service node.' },
            { icon: Sparkles, title: 'Goal', desc: 'Zero-bug deployments and seamless user experiences at scale.' },
          ].map(({ icon: Icon, title, desc }) => (
            <article className="qa-card" key={title}>
              <div className="qa-card-icon"><Icon size={24} aria-hidden="true" /></div>
              <h2>{title}</h2>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="work-section section" id="work"><div className="wrap"><div className="section-heading split-heading"><div><h2>Selected work</h2></div><p>QA work across AI, e-commerce, and media, alongside a personal prototype in development.</p></div><div className="project-grid">{projects.map(p=><article className="project" key={p.slug}><a className="project-content project-link" href={`#/work/${p.slug}`} aria-label={`Read case study: ${p.title}`}><p className="eyebrow">{p.category}</p><h3>{p.title}</h3><p className="project-role">{p.type === 'Professional' ? 'My role · Quality assurance' : 'My role · Development & QA'}</p><p>{p.text}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><span className="project-cta">Read case study <ArrowUpRight size={16}/></span></a></article>)}</div></div></section>
      <section className="section wrap" id="experience"><div className="section-heading"><h2>Experience</h2></div><div className="experience-list"><article className="experience"><div className="experience-date">DEC 2025 — PRESENT</div><div><div className="role-line"><h3>Associate QA Engineer</h3></div><ul><li>Translate requirements and acceptance criteria into risk-based test plans, test cases, and traceability documentation.</li><li>Build Playwright and TypeScript regression tests using reusable Page Object Model classes, locators, and assertions.</li><li>Validate web workflows and REST APIs; run performance checks with JMeter and k6 and security scenarios with OWASP ZAP.</li><li>Evaluate LLM/RAG responses and AI-assisted Word and Excel reviews against source data, calculations, and business rules.</li><li>Report and verify defects in Jira, communicate risks, and guide QA interns through test-case and evidence reviews.</li></ul></div></article><article className="experience"><div className="experience-date">FEB 2025 — DEC 2025</div><div><h3>QA Intern</h3><ul><li>Performed functional, exploratory, smoke, integration, and regression testing of web applications.</li><li>Prepared test cases from requirements, documented defects with expected and actual results, and retested fixes.</li><li>Built foundations in API testing, automation, non-functional testing, and QA documentation alongside developers and analysts.</li></ul></div></article></div></section>
      <section className="section wrap" id="skills"><div className="section-heading"><h2>Skills & tools</h2></div><div className="skills-grid">{skills.map(skill=><article className="skill" key={skill.title}><h3>{skill.title}</h3><p>{skill.text}</p><div className="tags">{skill.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div><ToolCarousel /><div className="tool-notes"><div><h4>AI-assisted workflows</h4><p>ChatGPT, Claude, Google Antigravity IDE, and LangSmith. Testim evaluated for AI-powered automation.</p></div><div><h4>Languages</h4><p>TypeScript, JavaScript, Java, and fundamentals in Python and SQL.</p></div><div><h4>Collaboration</h4><p>Analytical problem-solving, attention to detail, risk prioritization, clear communication, collaboration, and QA intern guidance.</p></div></div></section>
      <section className="journal-section section" id="writing"><div className="wrap"><div className="section-heading split-heading"><div><h2>Writing</h2></div><a className="text-link" href="https://medium.com/@dinithidnnimesha" target="_blank" rel="noreferrer">Find me on Medium <ArrowUpRight size={18}/></a></div><div className="articles">{articles.map((article,i)=><a className="article" key={article.title} href={article.url} target="_blank" rel="noreferrer"><span className="article-index">0{i+1}</span><div><p className="eyebrow">{article.date ? `${article.date} · ON MEDIUM` : 'ON MEDIUM'}</p><h3>{article.title}</h3>{article.text && <p>{article.text}</p>}</div><ArrowUpRight className="article-arrow"/></a>)}</div></div></section>
      <section className="contact section" id="contact"><div className="wrap contact-inner"><div><h2>Get in touch</h2><p>Have a role, a project, or a testing question in mind?<br/>I’d love to hear about it.</p><a className="button cream-button" href={`mailto:${email}`}>Let’s talk <ArrowUpRight size={18}/></a></div><div className="contact-note"><a href={`mailto:${email}`}>{email}</a><button className="copy-email" onClick={copyEmail}>{copied ? <Check size={15}/> : <Copy size={15}/>}<span aria-live="polite">{copied ? 'Email copied' : 'Copy email address'}</span></button></div></div></section>
      </>}
    </main><footer className="footer wrap"><a className="wordmark" href="#about" aria-label="Back to top"><img src="/logo/dn-logo.svg" alt="DN logo" width="72" height="45" /></a><p>© {new Date().getFullYear()} Dinithi Nimesha.</p><div><a href="https://www.linkedin.com/in/dinithi-nimesha-324a0819b/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={19}/></a><a href="https://github.com/DinithiN23" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={19}/></a><a href={`mailto:${email}`} aria-label="Email Dinithi"><Mail size={19}/></a></div></footer>
  </>;
}
