type HeaderProps = {
  title: string
}

function Header({ title }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="app-header-label">FinanceTrack</p>
        <h2>{title}</h2>
      </div>

      <div className="app-header-user">
        <span className="user-avatar">U</span>
        <span>User</span>
      </div>
    </header>
  )
}

export default Header