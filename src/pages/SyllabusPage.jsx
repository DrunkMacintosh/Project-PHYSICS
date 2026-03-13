import { useNavigate } from 'react-router-dom'
import { CHAPTERS } from '../data/chapters/index'

function ChapterCard({ chapter }) {
  const navigate = useNavigate()
  const hasQuestions = chapter.questions.length > 0

  return (
    <div
      onClick={() => navigate(`/chapter/${chapter.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-150"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
        Chapter {chapter.id}
      </p>
      <h2 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
        {chapter.title}
      </h2>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        {chapter.summary}
      </p>
      <div className="flex gap-2">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
          Content
        </span>
        {hasQuestions && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            Questions
          </span>
        )}
      </div>
    </div>
  )
}

function SyllabusPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            A-Level
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Physics</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {CHAPTERS.length} chapters &mdash; select one to begin
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHAPTERS.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default SyllabusPage
