type HeaderProps = {
  title: string
  userName: string
  onProfile: () => void
}

function Header({ title, userName, onProfile }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="app-header-label">FinanceTrack</p>
        <h2>{title}</h2>
      </div>

      <div className="app-header-tools">
        <label className="header-search">
          <span aria-hidden="true">/</span>
          <input placeholder="Search transactions, categories..." />
        </label>
        <button className="notification-button" type="button" aria-label="Notifications">
          !
        </button>
        <button className="app-header-user" type="button" onClick={onProfile} aria-label="Open profile settings">
          <span className="user-avatar">{userName.charAt(0).toUpperCase()}</span>
          <span>{userName}</span>
          <span className="user-chevron" aria-hidden="true">v</span>
        </button>
      </div>
    </header>
  )
}

export default Header
