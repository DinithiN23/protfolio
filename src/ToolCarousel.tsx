import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Tools and language proficiency are taken from the supplied CV.
const tools = [
  { name: 'Jira', icon: 'jira.svg', detail: 'Defect tracking' },
  { name: 'Confluence', icon: 'confluence.svg', detail: 'Documentation' },
  { name: 'QMetry', icon: 'qmetry.png', detail: 'Test management' },
  { name: 'VS Code', icon: 'vscode.svg', detail: 'Development' },
  { name: 'Playwright', icon: 'playwright.svg', detail: 'Browser automation' },
  { name: 'TypeScript', icon: 'typescript.svg', detail: 'Test automation' },
  { name: 'Selenium', icon: 'selenium.svg', detail: 'WebDriver' },
  { name: 'Postman', icon: 'postman.svg', detail: 'API testing' },
  { name: 'Swagger', icon: 'swagger.svg', detail: 'API specifications' },
  { name: 'k6', icon: 'k6.svg', detail: 'Performance testing' },
  { name: 'Git', icon: 'git.svg', detail: 'Version control' },
  { name: 'JavaScript', icon: 'javascript.svg', detail: 'Programming' },
  { name: 'Java', icon: 'java.svg', detail: 'Programming' },
  { name: 'Python', icon: 'python.svg', detail: 'Fundamentals' },
];

export default function ToolCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ first: 1, last: 1, atStart: true, atEnd: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const bounds = element.getBoundingClientRect();
      const visible = Array.from(element.children).flatMap((child, index) => {
        const rect = child.getBoundingClientRect();
        return rect.right > bounds.left + 2 && rect.left < bounds.right - 2 ? [index + 1] : [];
      });
      setPosition({
        first: visible[0] ?? 1,
        last: visible.at(-1) ?? 1,
        atStart: element.scrollLeft < 2,
        atEnd: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    return () => { resize.disconnect(); element.removeEventListener('scroll', update); };
  }, []);

  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 150) + 12;
    const page = Math.max(1, Math.floor(element.clientWidth / step));
    element.scrollBy({
      left: direction * step * page,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return (
    <section className="tool-carousel" aria-labelledby="tools-heading" aria-roledescription="carousel">
      <div className="tool-carousel-heading">
        <h3 id="tools-heading">Tools I work with</h3>
        <div className="carousel-controls">
          <button type="button" aria-label="Previous tools" aria-controls="tool-track" disabled={position.atStart} onClick={() => move(-1)}><ArrowLeft size={18} /></button>
          <button type="button" aria-label="Next tools" aria-controls="tool-track" disabled={position.atEnd} onClick={() => move(1)}><ArrowRight size={18} /></button>
        </div>
      </div>
      <ul
        id="tool-track"
        className="tool-track"
        ref={track}
        tabIndex={0}
        aria-label="Tools and languages. Use left and right arrow keys to browse."
        onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        {tools.map(tool => (
          <li className="tool-card" key={tool.name}>
            <img src={`/tools/${tool.icon}`} alt="" width="34" height="34" />
            <span className="tool-name">{tool.name}</span>
            <span className="tool-detail">{tool.detail}</span>
          </li>
        ))}
      </ul>
      <div className="carousel-caption"><span>Swipe or use the arrows to browse</span><span>{position.first}–{position.last} of {tools.length}</span></div>
    </section>
  );
}
