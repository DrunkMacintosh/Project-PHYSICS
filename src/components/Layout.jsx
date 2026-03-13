import { Link } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="sticky top-0 z-50 bg-[#1a1a2e] text-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-3">
          <Link to="/" className="flex items-baseline gap-2.5 hover:opacity-80 transition-opacity">
            <span className="text-base font-bold tracking-tight leading-none">
              Cambridge AS Physics
            </span>
            <span className="text-xs font-medium text-indigo-300 leading-none">
              AS Level 9702
            </span>
          </Link>
        </div>
      </nav>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default Layout
