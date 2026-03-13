import { useParams, useNavigate } from 'react-router-dom'
import { CHAPTERS } from '../data/chapters/index'
import NotFoundPage from './NotFoundPage'
import ContentBin from '../components/ContentBin'

function ChapterPage() {
  const { id, bin } = useParams()
  const navigate = useNavigate()

  const chapterIndex = CHAPTERS.findIndex((ch) => ch.id === Number(id))
  if (chapterIndex === -1) return <NotFoundPage />

  const chapter = CHAPTERS[chapterIndex]
  const prev = CHAPTERS[chapterIndex - 1] ?? null
  const next = CHAPTERS[chapterIndex + 1] ?? null

  const hasQuestions = chapter.questions.length > 0
  const activeTab = bin ?? 'content'

  function handleTabClick(tab) {
    navigate(`/chapter/${id}/${tab}`, { replace: true })
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Page hero */}
      <div className="bg-[#1a1a2e] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300 hover:text-white transition-colors mb-4"
          >
            ← All Chapters
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-1">
            Chapter {chapter.id}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">{chapter.title}</h1>
          <p className="text-indigo-200/70 mt-2 text-sm leading-relaxed">{chapter.summary}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 flex">
          <TabButton
            label="Content"
            active={activeTab === 'content'}
            onClick={() => handleTabClick('content')}
          />
          {hasQuestions && (
            <TabButton
              label="Questions"
              active={activeTab === 'questions'}
              onClick={() => handleTabClick('questions')}
            />
          )}
        </div>
      </div>

      {/* Tab content */}
      <main className="max-w-3xl mx-auto w-full px-6 py-8 flex-1">
        {activeTab === 'content' && <ContentBin content={chapter.content} />}
        {activeTab === 'questions' && (
          <div className="text-gray-400 text-sm">Questions coming soon.</div>
        )}
      </main>

      {/* Prev / Next navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <NavButton
            label={prev ? `← Ch ${prev.id}. ${prev.title}` : '← Previous'}
            disabled={!prev}
            onClick={() => prev && navigate(`/chapter/${prev.id}/content`)}
          />
          <NavButton
            label={next ? `Ch ${next.id}. ${next.title} →` : 'Next →'}
            disabled={!next}
            align="right"
            onClick={() => next && navigate(`/chapter/${next.id}/content`)}
          />
        </div>
      </div>
    </div>
  )
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-5 py-3 text-sm font-medium border-b-2 transition-colors',
        active
          ? 'border-[#1a1a2e] text-gray-900'
          : 'border-transparent text-gray-500 hover:text-gray-700',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function NavButton({ label, disabled, align = 'left', onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'text-sm font-medium max-w-[45%] truncate transition-colors',
        align === 'right' ? 'text-right ml-auto' : '',
        disabled
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-gray-600 hover:text-gray-900',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export default ChapterPage
