import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'

type AppLayoutProps = {
  activePage: string
  onNavigate: (page: string) => void
  userName: string
  children: ReactNode
}

function AppLayout({
  activePage,
  onNavigate,
  userName,
  children,
}: AppLayoutProps) {
  const pageTitle =
    activePage === 'dashboard'
      ? 'Dashboard'
      : activePage === 'analytics'
        ? 'Analytics'
        : activePage === 'settings' ? 'Settings' : 'Transactions'

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
      />

      <div className="app-main">
        <Header title={pageTitle} userName={userName} onProfile={() => onNavigate('settings')} />

        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout
