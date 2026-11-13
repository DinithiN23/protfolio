import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from './projects';
import RagCaseStudy from './RagCaseStudy';

type Project = (typeof projects)[number];

// Replace these sample sections with the author's final case-study writing.
const draftContent: Record<string, { challenge: string; approach: string[]; example: string }> = {
  'ai-financial-intelligence': {
    challenge: 'An AI response can sound convincing while using the wrong source, calculation, or agent. This sample case study explores how to separate these failure points and make the expected behavior testable.',
    approach: ['Choose a small reference dataset with answers that can be checked independently.', 'Compare the response, chart, and table against the same source figures.', 'Vary the question to examine routing, missing information, and business-rule handling.'],
    example: 'Ask for a monthly sales total using a reference table, then compare the written answer and chart. Record any discrepancy with the input, source values, and expected calculation.',
  },
  'e-commerce-platform': {
    challenge: 'A purchase moves through several connected steps. This sample case study looks at the risks where catalog data, stock, checkout, and payment behavior meet.',
    approach: ['Map the customer journey and identify the rules at each step.', 'Prepare valid, invalid, and boundary cases for stock, addresses, and payments.', 'Check the resulting order state and permissions across customer and admin views.'],
    example: 'Add an item to a basket, change its available stock, and attempt checkout. Check that the customer receives a clear response and the system does not create an inconsistent order.',
  },
  'digital-music-platform': {
    challenge: 'Playback issues can depend on the browser, device, or cached response. This sample case study outlines how to isolate those differences instead of treating every playback failure as the same defect.',
    approach: ['Define a repeatable playback, search, and download flow.', 'Compare the flow across browsers and devices using the same content.', 'Capture response headers and compare fresh sessions with cached sessions.'],
    example: 'Play the same track in Safari and a second browser, then repeat after a reload. Compare visible behavior and HTTP/cache headers to identify a useful reproduction path.',
  },
  'pdf-knowledge-base-chatbot': {
    challenge: 'A PDF chatbot needs to retrieve useful context and keep its answer grounded in that context. This sample case study explores evaluation scenarios for the prototype while it is in development.',
    approach: ['Prepare questions with known answers and identifiable source passages.', 'Include questions whose answers are missing from the uploaded document.', 'Review retrieval traces, source attribution, and responses to conflicting instructions.'],
    example: 'Ask a question that the PDF cannot answer. Check whether the prototype acknowledges missing evidence rather than inventing a source or unsupported answer.',
  },
};

export default function ProjectDetail({ project }: { project?: Project }) {
  if (!project) return (
    <section className="case-study wrap">
      <a className="text-link" href="#work"><ArrowLeft size={16} /> Back to selected work</a>
      <h1 id="project-title" tabIndex={-1}>Project not found</h1>
      <p className="case-summary">This project link isn’t available. Browse the selected work to find a case study.</p>
    </section>
  );
  if (project.slug === 'pdf-knowledge-base-chatbot') return <RagCaseStudy project={project} />;
  const draft = draftContent[project.slug];
  return (
    <article className="case-study wrap">
      <a className="text-link" href="#work"><ArrowLeft size={16} /> Back to selected work</a>
      <header className="case-header">
        <p className="eyebrow">{project.category}</p>
        <h1 id="project-title" tabIndex={-1}>{project.title}</h1>
        <p className="case-summary">{project.text}</p>
        <dl className="case-meta">
          <div><dt>My role</dt><dd>{project.type === 'Professional' ? 'Quality assurance' : 'Development & QA'}</dd></div>
          <div><dt>Project type</dt><dd>{project.type === 'Personal' ? 'Personal prototype · In development' : 'Professional testing engagement'}</dd></div>
        </dl>
        <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </header>
      <aside className="draft-notice"><strong>Case study draft</strong><p>The overview above is based on my experience. The sections below contain illustrative placeholder writing and will be replaced with the full case study. They do not describe confirmed findings or results.</p></aside>
      <div className="case-body">
        <section><h2>The challenge</h2><p>{draft.challenge}</p></section>
        <section><h2>Testing approach</h2><ol>{draft.approach.map(step => <li key={step}>{step}</li>)}</ol></section>
        <section><h2>Example scenario</h2><p>{draft.example}</p></section>
        <section><h2>Findings & reflection</h2><p>Final findings, supporting evidence, and lessons learned will be added here. This section will explain what was observed, how it was investigated, and what the experience changed about the testing approach.</p></section>
      </div>
      <nav className="case-bottom" aria-label="Case study navigation"><a className="text-link" href="#work"><ArrowLeft size={16} /> All selected work</a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16} /></a></nav>
    </article>
  );
}
