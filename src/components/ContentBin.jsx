import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const MD_PLUGINS = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
}

const ACCENT_COLOURS = [
  '#6366f1', // indigo
  '#0ea5e9', // sky
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
]

function Md({ children }) {
  return <ReactMarkdown {...MD_PLUGINS}>{children}</ReactMarkdown>
}

function Objectives({ objectives, colour }) {
  if (!objectives.length) return null
  return (
    <div className="mb-4">
      <p
        className="text-xs font-bold tracking-widest uppercase mb-2"
        style={{ color: colour }}
      >
        Learning Objectives
      </p>
      <ul className="space-y-1.5">
        {objectives.map((obj, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: colour }}
            />
            <span className="text-sm text-gray-600 leading-snug">{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Notes({ notes }) {
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

function Subsection({ subsection, index }) {
  const [open, setOpen] = useState(false)

  const colour = ACCENT_COLOURS[index % ACCENT_COLOURS.length]
  const number = subsection.title.split(' ')[0]

  const isEmpty =
    !subsection.notes &&
    subsection.examples.length === 0 &&
    subsection.diagrams.length === 0

  return (
    <div
      className="mb-4 rounded-xl shadow-md bg-white overflow-hidden"
      style={{ borderLeft: `4px solid ${colour}` }}
    >
      {/* Title bar */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-2.5 py-0.5 text-sm font-bold shrink-0"
            style={{ backgroundColor: `${colour}22`, color: colour }}
          >
            {number}
          </span>
          <span className="text-base font-semibold text-gray-800">
            {subsection.title.slice(number.length + 1)}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Collapsible body */}
      <div
        style={{
          maxHeight: open ? '2000px' : '0px',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <div className="px-5 pb-5 pt-2">
          <div className="border-t border-gray-100 mb-4" />
          <Objectives objectives={subsection.objectives} colour={colour} />
          {isEmpty ? (
            <p className="text-sm text-gray-400 italic text-center py-2">
              📖 Content coming soon.
            </p>
          ) : (
            <>
              <Notes notes={subsection.notes} />
              <Examples examples={subsection.examples} />
              <Diagrams diagrams={subsection.diagrams} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ContentBin({ content }) {
  return (
    <div className="max-w-3xl mx-auto">
      {content.subsections.map((subsection, index) => (
        <Subsection key={subsection.id} subsection={subsection} index={index} />
      ))}
    </div>
  )
}

export default ContentBin
