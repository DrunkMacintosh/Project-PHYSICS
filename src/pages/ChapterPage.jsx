import { useParams, useNavigate } from 'react-router-dom'
import { CHAPTERS } from '../data/chapters/index'
import NotFoundPage from './NotFoundPage'
import ContentBin from '../components/ContentBin'

function ChapterPage() {
  const { id, bin } = useParams()
  const navigate = useNavigate()

  const chapter = CHAPTERS.find((ch) => ch.id === Number(id))
  if (!chapter) return <NotFoundPage />

  const hasQuestions = chapter.questions.length > 0
  const activeTab = bin ?? 'content'

  function handleTabClick(tab) {
    navigate(`/chapter/${id}/${tab}`, { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-200 transition-colors mb-3 flex items-center gap-1"
          >
            ← Physics
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Chapter {chapter.id}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">{chapter.title}</h1>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">{chapter.summary}</p>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 flex gap-0">
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
      <main className="max-w-3xl mx-auto px-6 py-8">
        {activeTab === 'content' && (
          <ContentBin content={chapter.content} />
        )}
        {activeTab === 'questions' && (
          <div className="text-gray-400 text-sm">Questions coming soon.</div>
        )}
      </main>
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
          ? 'border-gray-900 text-gray-900'
          : 'border-transparent text-gray-500 hover:text-gray-700',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export default ChapterPage
