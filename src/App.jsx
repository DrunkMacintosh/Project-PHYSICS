import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import SyllabusPage from './pages/SyllabusPage'
import ChapterPage from './pages/ChapterPage'
import NotFoundPage from './pages/NotFoundPage'

const VALID_BINS = ['content', 'questions']

function ChapterBinGuard() {
  const { bin } = useParams()
  if (!VALID_BINS.includes(bin)) return <NotFoundPage />
  return <ChapterPage />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SyllabusPage />} />
        <Route path="/chapter/:id" element={<ChapterPage />} />
        <Route path="/chapter/:id/:bin" element={<ChapterBinGuard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
