type SidebarProps = {
  activePage: string
  onNavigate: (page: string) => void
}

const navigationItems = [
  {
    label: 'Dashboard',
    value: 'dashboard',
  },
  {
    label: 'Transactions',
    value: 'transactions',
  },
]

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>FinanceTrack</h1>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`sidebar-link ${
              activePage === item.value ? 'active' : ''
            }`}
            onClick={() => onNavigate(item.value)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar