import { useEffect, useState } from 'react'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './features/dashboard/Dashboard'
import Transactions from './features/transactions/Transactions'
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from './services/transactionService'
import type { Transaction } from './types/transaction'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch(() => setError('Unable to load transactions.'))
  }, [])

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
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      {error && <p className="form-error">{error}</p>}
      {activePage === 'dashboard' ? (
        <Dashboard transactions={transactions} />
      ) : (
        <Transactions
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onUpdateTransaction={handleUpdateTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
      )}
    </AppLayout>
  )
}

export default App
