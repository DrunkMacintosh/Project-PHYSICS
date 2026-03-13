import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const MD_PLUGINS = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
}

function Md({ children }) {
  return <ReactMarkdown {...MD_PLUGINS}>{children}</ReactMarkdown>
}

function Objectives({ objectives }) {
  if (!objectives.length) return null
  return (
    <ul className="mb-4 space-y-1.5">
      {objectives.map((obj, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-gray-900 accent-gray-900"
            readOnly
          />
          <span className="text-sm text-gray-700 leading-snug">{obj}</span>
        </li>
      ))}
    </ul>
  )
}

function Notes({ notes }) {
  if (!notes) {
    return (
      <p className="text-sm text-gray-400 italic">Content coming soon.</p>
    )
  }
  return (
    <div className="prose prose-sm prose-gray max-w-none">
      <Md>{notes}</Md>
    </div>
  )
}

function Examples({ examples }) {
  if (!examples.length) return null
  return (
    <div className="mt-5 space-y-4">
      {examples.map((example, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Example {i + 1}
              {example.title ? ` — ${example.title}` : ''}
            </p>
          </div>
          <ol className="divide-y divide-gray-100">
            {example.steps.map((step, j) => (
              <li key={j} className="flex gap-3 px-4 py-3">
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                  {j + 1}
                </span>
                <div className="prose prose-sm prose-gray max-w-none">
                  <Md>{step}</Md>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  )
}

function Diagrams({ diagrams }) {
  if (!diagrams.length) return null
  const visible = diagrams.filter((d) => d.svg != null || d.src != null)
  if (!visible.length) return null
  return (
    <div className="mt-5 space-y-4">
      {visible.map((diagram, i) => (
        <figure key={i} className="flex flex-col items-center gap-2">
          {diagram.type === 'svg' ? (
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: diagram.svg }}
            />
          ) : (
            <img
              src={diagram.src}
              alt={diagram.label ?? ''}
              className="max-w-full rounded"
            />
          )}
          {diagram.label && (
            <figcaption className="text-xs text-gray-500 text-center">
              {diagram.label}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

function Subsection({ subsection }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
        {subsection.title}
      </h2>
      <Objectives objectives={subsection.objectives} />
      <Notes notes={subsection.notes} />
      <Examples examples={subsection.examples} />
      <Diagrams diagrams={subsection.diagrams} />
    </section>
  )
}

function ContentBin({ content }) {
  return (
    <div>
      {content.subsections.map((subsection) => (
        <Subsection key={subsection.id} subsection={subsection} />
      ))}
    </div>
  )
}

export default ContentBin
