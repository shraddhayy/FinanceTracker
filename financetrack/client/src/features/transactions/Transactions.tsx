import { useState, type FormEvent } from 'react'
import type { Transaction } from '../../types/transaction'

type TransactionEditorProps = {
  transaction: Transaction | null
  onAddTransaction: (
    transaction: Omit<Transaction, 'id'>,
  ) => void | Promise<void>
  onUpdateTransaction: (
    id: string,
    transaction: Omit<Transaction, 'id'>,
  ) => void | Promise<void>
  onCancelEdit: () => void
}

function TransactionEditor({
  transaction,
  onAddTransaction,
  onUpdateTransaction,
  onCancelEdit,
}: TransactionEditorProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<Transaction['type']>('expense')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const isEditing = transaction !== null

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedCategory = category.trim()
    const numericAmount = Number(amount)

    if (!trimmedTitle || !trimmedCategory || !date) {
      setError('Please fill in all fields.')
      return
    }

    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError('Amount must be greater than 0.')
      return
    }

    const transactionData: Omit<Transaction, 'id'> = {
      title: trimmedTitle,
      amount: numericAmount,
      type,
      category: trimmedCategory,
      date,
    }

    if (isEditing) {
      onUpdateTransaction(transaction.id, transactionData)
    } else {
      onAddTransaction(transactionData)
    }

    setTitle('')
    setAmount('')
    setType('expense')
    setCategory('')
    setDate('')
    setError('')
  }

  function handleCancel() {
    setTitle('')
    setAmount('')
    setType('expense')
    setCategory('')
    setDate('')
    setError('')
    onCancelEdit()
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Groceries"
        />
      </div>

      <div className="form-field">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0"
        />
      </div>

      <div className="form-field">
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(event) => setType(event.target.value as Transaction['type'])}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="e.g. Food"
        />
      </div>

      <div className="form-field">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {isEditing ? 'Save Changes' : 'Add Transaction'}
        </button>

        {isEditing && (
          <button type="button" className="delete-button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

type TransactionsProps = {
  transactions: Transaction[]
  onAddTransaction: (
    transaction: Omit<Transaction, 'id'>,
  ) => void | Promise<void>
  onUpdateTransaction: (
    id: string,
    transaction: Omit<Transaction, 'id'>,
  ) => void | Promise<void>
  onDeleteTransaction: (id: string) => void | Promise<void>
}

function Transactions({
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
}: TransactionsProps) {
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)

  function handleUpdate(id: string, transaction: Omit<Transaction, 'id'>) {
    onUpdateTransaction(id, transaction)
    setEditingTransaction(null)
  }

  return (
    <section className="transactions-page">
      <div className="page-intro">
        <h2>Transactions</h2>
        <p>View and manage your income and expense transactions.</p>
      </div>

      <TransactionEditor
        transaction={editingTransaction}
        onAddTransaction={onAddTransaction}
        onUpdateTransaction={handleUpdate}
        onCancelEdit={() => setEditingTransaction(null)}
      />

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet.</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <article className="transaction-row" key={transaction.id}>
              <div>
                <strong>{transaction.title}</strong>
                <span>
                  {transaction.category} · {transaction.date}
                </span>
              </div>

              <div className="transaction-actions">
                <strong
                  className={
                    transaction.type === 'expense'
                      ? 'amount-expense'
                      : 'amount-income'
                  }
                >
                  {transaction.type === 'income' ? '+' : '-'}₹
                  {Number(transaction.amount).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </strong>

                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setEditingTransaction(transaction)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDeleteTransaction(transaction.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default Transactions
