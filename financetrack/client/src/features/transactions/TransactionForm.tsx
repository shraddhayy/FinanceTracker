import { useState, type FormEvent } from 'react'
import type { Transaction, TransactionType } from '../../types/transaction'

type TransactionFormProps = {
  onAddTransaction: (transaction: Transaction) => void
}

function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<TransactionType>('expense')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

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

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      amount: numericAmount,
      type,
      category: trimmedCategory,
      date,
    }

    onAddTransaction(newTransaction)

    setTitle('')
    setAmount('')
    setCategory('')
    setDate('')
    setType('expense')
    setError('')
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
          onChange={(event) =>
            setType(event.target.value as TransactionType)
          }
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

      <button type="submit" className="primary-button">
        Add Transaction
      </button>
    </form>
  )
}

export default TransactionForm