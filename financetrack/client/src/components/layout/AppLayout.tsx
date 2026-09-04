import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'

type AppLayoutProps = {
  activePage: string
  onNavigate: (page: string) => void
  children: ReactNode
}

function AppLayout({
  activePage,
  onNavigate,
  children,
}: AppLayoutProps) {
  const pageTitle =
    activePage === 'dashboard'
      ? 'Dashboard'
      : 'Transactions'

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
      />

      <div className="app-main">
        <Header title={pageTitle} />

        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout