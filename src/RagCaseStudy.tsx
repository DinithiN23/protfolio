import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { projects } from './projects';

type Project = (typeof projects)[number];

const stack = [
  ['Application', 'Python'],
  ['PDF extraction', 'PyPDF'],
  ['Text chunking', 'RecursiveCharacterTextSplitter'],
  ['Embeddings', 'all-MiniLM-L6-v2 · 384 dimensions'],
  ['Vector store', 'ChromaDB'],
  ['Language model', 'Llama 3.1 8B Instant via Groq API'],
  ['Evaluation & tracing', 'LangSmith'],
];

const stages = [
  { title: 'PDF extraction', objective: 'Is the source content available to the rest of the pipeline?', checks: 'Check multi-page text, special characters and paragraphs; identify empty, invalid, or image-only PDFs with no extractable text.' },
  { title: 'Chunking', objective: 'Do chunks retain enough context to make sense?', checks: 'Inspect chunk boundaries and check whether related information is separated or lost in a way that affects retrieval.' },
  { title: 'Embeddings & storage', objective: 'Can the document content be represented and retrieved?', checks: 'Check that chunks produce 384-dimensional embeddings, are stored in ChromaDB, and can be retrieved for relevant questions.' },
  { title: 'Retrieval', objective: 'Does the system find the right context?', checks: 'Try direct, paraphrased, ambiguous, and unrelated questions; inspect the top-four results and the relative-margin relevance check.' },
  { title: 'Generated responses', objective: 'Is the answer supported by the source?', checks: 'Compare answers against the document for correctness, relevance, completeness, and unsupported claims; examine responses when context is missing or irrelevant.' },
];

export default function RagCaseStudy({ project }: { project: Project }) {
  return <article className="case-study wrap rag-case">
    <a className="text-link" href="#work"><ArrowLeft size={16} /> Back to selected work</a>
    <header className="case-header">
      <p className="eyebrow">PERSONAL PROJECT · AI / QA ENGINEERING</p>
      <h1 id="project-title" tabIndex={-1}>RAG-Based PDF Question-Answering System</h1>
      <p className="case-summary">A QA-focused case study on building and evaluating a retrieval-augmented generation application.</p>
      <dl className="case-meta">
        <div><dt>My role</dt><dd>RAG implementation & QA evaluation</dd></div>
        <div><dt>Project type</dt><dd>Personal technical prototype</dd></div>
        <div><dt>Status</dt><dd>Prototype</dd></div>
      </dl>
      <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </header>
    <nav className="rag-contents" aria-label="Case study contents"><span>ON THIS PAGE</span><button type="button" onClick={() => document.getElementById('rag-overview')?.scrollIntoView()}>Overview</button><button type="button" onClick={() => document.getElementById('rag-demo')?.scrollIntoView()}>Demo</button><button type="button" onClick={() => document.getElementById('rag-architecture')?.scrollIntoView()}>Architecture</button><button type="button" onClick={() => document.getElementById('rag-stack')?.scrollIntoView()}>Stack</button><button type="button" onClick={() => document.getElementById('rag-workflow')?.scrollIntoView()}>Workflow</button><button type="button" onClick={() => document.getElementById('rag-testing')?.scrollIntoView()}>QA strategy</button><button type="button" onClick={() => document.getElementById('rag-evaluation')?.scrollIntoView()}>Evaluation</button><button type="button" onClick={() => document.getElementById('rag-limitations')?.scrollIntoView()}>Limitations</button></nav>
    <div className="case-body">
      <section id="rag-overview"><p className="eyebrow">01 / OVERVIEW</p><h2>Why test the whole pipeline?</h2><p>This prototype answers natural-language questions using information extracted from an uploaded PDF. It retrieves relevant document content and supplies it to a language model as context for an answer.</p><p>My objective was to build the workflow and evaluate how extraction, chunking, embeddings, retrieval, and generation affect answer quality. An incorrect answer can begin at any of these stages; checking only the final response does not reveal the whole story.</p></section>
      <section id="rag-demo"><p className="eyebrow">VIDEO</p><h2>Understanding and testing a RAG system</h2><p>Watch the video for a closer look at AI testing and RAG systems.</p><div className="rag-video"><iframe src="https://www.youtube-nocookie.com/embed/GaWSsoFN-Dg" title="AI Testing for QA Engineers: Understanding and Testing a RAG System" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div><a className="text-link rag-video-link" href="https://youtu.be/GaWSsoFN-Dg?si=tjovbzxxnK-55Emh" target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowUpRight size={16} /></a></section>
      <section id="rag-architecture"><p className="eyebrow">02 / ARCHITECTURE</p><h2>From document to answer</h2><p>The document is processed and indexed first. A question then uses that index to retrieve context for the model.</p>
        <figure className="architecture" aria-labelledby="architecture-caption">
          <figcaption id="architecture-caption">High-level RAG workflow</figcaption>
          <div className="architecture-row"><span className="architecture-label">DOCUMENT INDEXING</span><ol><li>PDF document</li><li>Extract text<br/><small>PyPDF</small></li><li>Split into chunks</li><li>Generate embeddings</li><li>ChromaDB<br/><small>Vector store</small></li></ol></div>
          <div className="architecture-row"><span className="architecture-label">QUESTION ANSWERING</span><ol><li>User question</li><li>Retrieve context<br/><small>From ChromaDB</small></li><li>Prepare context</li><li>LLM<br/><small>Groq / Llama 3.1</small></li><li>Generated answer</li></ol></div>
        </figure>
      </section>
      <section id="rag-stack"><p className="eyebrow">03 / TECHNOLOGY</p><h2>Technology stack</h2><dl className="stack-list">{stack.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
      <section id="rag-workflow"><p className="eyebrow">04 / WORKFLOW</p><h2>How the system works</h2><ol className="workflow-list"><li><strong>Extract and prepare.</strong> PyPDF extracts document text, which RecursiveCharacterTextSplitter divides into smaller chunks.</li><li><strong>Index.</strong> The all-MiniLM-L6-v2 model generates 384-dimensional embeddings for the chunks, which are stored in ChromaDB.</li><li><strong>Retrieve.</strong> A user question is used to retrieve relevant document chunks. The configuration uses top-four results with a relative-margin relevance check.</li><li><strong>Generate.</strong> The retrieved content is prepared as context for Llama 3.1 8B Instant via Groq. Temperature is set to 0 to reduce response variability.</li></ol></section>
      <section id="rag-testing"><p className="eyebrow">05 / QA STRATEGY</p><h2>Testing at every stage</h2><p>I considered how defects in an earlier stage can carry through to the final answer. These validation areas describe the QA approach; detailed execution evidence and results are not included here.</p><div className="qa-stages">{stages.map((stage, i) => <article className="qa-stage" key={stage.title}><span className="qa-number">0{i + 1}</span><div><h3>{stage.title}</h3><p className="qa-objective">{stage.objective}</p><p>{stage.checks}</p></div></article>)}</div></section>
      <section id="rag-evaluation"><p className="eyebrow">06 / EVALUATION</p><h2>Golden dataset & LangSmith</h2><p>I created a golden question-and-answer dataset to compare expected information with generated answers. I used LangSmith to trace the workflow and inspect the relationship between a question, retrieved context, and the response.</p><p>The evaluation considered answer correctness, context relevance, groundedness, completeness, and unsupported information. The dataset size, quantitative results, and individual traces are not presented here.</p><div className="evaluation-note"><strong>Evidence to add</strong><p>A redacted dataset sample, LangSmith traces, and the detailed test-case spreadsheet can be added when available.</p></div></section>
      <section id="rag-limitations"><p className="eyebrow">07 / REFLECTION</p><h2>Findings, limitations & next steps</h2><p>A key QA insight is that a wrong answer should not automatically be treated as a model failure. Missing extracted text, separated context, and irrelevant retrieval can all contribute to a poor response.</p><p>This is a technical prototype, not a production-ready document intelligence platform. Potential improvements include:</p><ul><li>Adding OCR for scanned PDFs.</li><li>Expanding the golden dataset with more question types and edge cases.</li><li>Introducing structured, repeatable evaluation metrics.</li><li>Comparing embedding models and retrieval configurations, including with larger document collections.</li><li>Exploring a local LLM setup such as Ollama to reduce dependence on an external API.</li></ul></section>
    </div>
    <nav className="case-bottom" aria-label="Case study navigation"><a className="text-link" href="#work"><ArrowLeft size={16} /> All selected work</a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16} /></a></nav>
  </article>;
}
