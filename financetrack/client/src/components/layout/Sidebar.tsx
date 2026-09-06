import logoMark from '../../assets/financetrack-mark.svg'

type SidebarProps = {
  activePage: string
  onNavigate: (page: string) => void
}

const navigationItems = [
  {
    icon: 'D',
    label: 'Dashboard',
    value: 'dashboard',
  },
  {
    icon: 'T',
    label: 'Transactions',
    value: 'transactions',
  },
  {
    icon: 'A',
    label: 'Analytics',
    value: 'analytics',
  },
  { icon: 'S', label: 'Settings', value: 'settings' },
]

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src={logoMark} alt="" />
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
            <span className="sidebar-link-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-upgrade">
        <span className="sidebar-upgrade-mark">+</span>
        <strong>Upgrade to Pro</strong>
        <p>Get advanced insights and budget alerts.</p>
        <button type="button">Upgrade</button>
      </div>
    </aside>
  )
}

export default Sidebar
