import type { Transaction } from '../../types/transaction'

type DashboardProps = {
  transactions: Transaction[]
}

function Dashboard({ transactions }: DashboardProps) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <section>
      <div className="page-intro">
        <h3>Overview</h3>
        <p>
          Track your income, expenses, and overall financial position.
        </p>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span>Total Balance</span>
          <strong>₹{balance.toLocaleString('en-IN')}</strong>
        </article>

        <article className="summary-card">
          <span>Total Income</span>
          <strong>₹{totalIncome.toLocaleString('en-IN')}</strong>
        </article>

        <article className="summary-card">
          <span>Total Expenses</span>
          <strong>₹{totalExpenses.toLocaleString('en-IN')}</strong>
        </article>
      </div>

      <section className="transactions-preview">
        <h3>Recent Transactions</h3>

        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <strong>{transaction.title}</strong>
            <span>
              {transaction.type === 'expense' ? '-' : '+'}
              ₹{transaction.amount.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </section>
    </section>
  )
}

export default Dashboard