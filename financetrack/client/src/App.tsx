import './App.css'
import { useEffect, useState } from 'react'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './features/dashboard/Dashboard'
import Analytics from './features/analytics/Analytics'
import Landing from './features/landing/Landing'
import Login from './features/auth/Login'
import Settings from './features/settings/Settings'
import type { User } from './services/authService'
import Transactions from './features/transactions/Transactions'
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from './services/transactionService'
import type { Transaction } from './types/transaction'

function App() {
  const [activePage, setActivePage] = useState('landing')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  async function loadTransactions() {
    setLoading(true)
    setError('')
    try {
      setTransactions(await getTransactions())
    } catch {
      setError('Unable to load transactions. Start the API server and refresh.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) void loadTransactions()
  }, [user])

  if (activePage === 'landing') {
    return <Landing onGetStarted={() => setActivePage('dashboard')} onSignIn={() => setActivePage('login')} />
  }

  if (activePage === 'login') {
    return <Login onBack={() => setActivePage('landing')} onContinue={(account) => { setUser(account); setActivePage('dashboard') }} />
  }

  if (!user) return <Login onBack={() => setActivePage('landing')} onContinue={(account) => { setUser(account); setActivePage('dashboard') }} />

  async function handleAddTransaction(
    transaction: Omit<Transaction, 'id'>,
  ) {
    try {
      const created = await createTransaction(transaction)
      setTransactions((current) => [...current, created])
    } catch {
      setError('Unable to add transaction.')
    }
  }

  async function handleUpdateTransaction(
    id: string,
    transaction: Omit<Transaction, 'id'>,
  ) {
    try {
      const updated = await updateTransaction(id, transaction)
      setTransactions((current) =>
        current.map((item) => (item.id === id ? updated : item)),
      )
    } catch {
      setError('Unable to update transaction.')
    }
  }

  async function handleDeleteTransaction(id: string) {
    try {
      await deleteTransaction(id)
      setTransactions((current) => current.filter((item) => item.id !== id))
    } catch {
      setError('Unable to delete transaction.')
    }
  }

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage} userName={user.name}>
      {error && <p className="form-error">{error}</p>}
      {activePage === 'dashboard' ? (
        <Dashboard transactions={transactions} />
      ) : activePage === 'analytics' ? (
        <Analytics transactions={transactions} />
      ) : activePage === 'settings' ? (
        <Settings user={user} onSignOut={() => { localStorage.removeItem('financetrack_token'); setUser(null); setTransactions([]); setActivePage('landing') }} />
      ) : (
        <Transactions
          transactions={transactions}
          loading={loading}
          onAddTransaction={handleAddTransaction}
          onUpdateTransaction={handleUpdateTransaction}
          onDeleteTransaction={handleDeleteTransaction}
          onImported={loadTransactions}
        />
      )}
    </AppLayout>
  )
}

export default App
