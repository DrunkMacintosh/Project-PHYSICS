import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-gray-50 px-6 text-center">
      <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
      <h1 className="text-xl font-semibold text-gray-800 mb-2">Page not found</h1>
      <p className="text-sm text-gray-500 mb-6">
        The page you're looking for doesn't exist or the URL is invalid.
      </p>
      <Link
        to="/"
        className="text-sm font-medium text-[#1a1a2e] underline underline-offset-4 hover:opacity-70 transition-opacity"
      >
        ← Back to syllabus
      </Link>
    </div>
  )
}

export default NotFoundPage
