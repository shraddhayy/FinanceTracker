// console.log('SERVER FILE STARTED')
// import { pool } from '../src/db.js'
// import type { Transaction } from '../src/types/transaction.js'

// export async function getAllTransactions(): Promise<Transaction[]> {
//   const result = await pool.query(
//     `SELECT
//       id,
//       title,
//       amount,
//       type,
//       category,
//       date
//     FROM transactions
//     ORDER BY date DESC, created_at DESC`,
//   )

//   return result.rows
// }

// export async function createTransaction(
//   transaction: Omit<Transaction, 'id'>,
// ): Promise<Transaction> {
//   const id = crypto.randomUUID()

//   const result = await pool.query(
//     `INSERT INTO transactions
//       (id, title, amount, type, category, date)
//      VALUES ($1, $2, $3, $4, $5, $6)
//      RETURNING id, title, amount, type, category, date`,
//     [
//       id,
//       transaction.title,
//       transaction.amount,
//       transaction.type,
//       transaction.category,
//       transaction.date,
//     ],
//   )

//   return result.rows[0]
// }

// export async function deleteTransaction(id: string): Promise<boolean> {
//   const result = await pool.query(
//     'DELETE FROM transactions WHERE id = $1',
//     [id],
//   )

//   return result.rowCount !== 0
// }
import express from 'express'
import cors from 'cors'
import transactionRoutes from './routes/transactionRoutes.js'

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'FinanceTrack API is running',
  })
})

app.use('/api/transactions', transactionRoutes)

app.listen(PORT, () => {
  console.log(`FinanceTrack API running on http://localhost:${PORT}`)
})