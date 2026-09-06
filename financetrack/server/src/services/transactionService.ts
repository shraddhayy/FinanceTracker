import { pool } from '../db.js'
import type { Transaction } from '../types/transaction.js'

export async function getAllTransactions(userId: string): Promise<Transaction[]> {
  const result = await pool.query(
    `SELECT
      id,
      title,
      amount::float8 AS amount,
      type,
      category,
      TO_CHAR(date, 'YYYY-MM-DD') AS date
    FROM transactions
    WHERE user_id = $1
    ORDER BY date DESC, created_at DESC`, [userId]
  )

  return result.rows
}

export async function createTransaction(
  transaction: Omit<Transaction, 'id'>,
  userId: string,
): Promise<Transaction> {
  const id = crypto.randomUUID()

  const result = await pool.query(
    `INSERT INTO transactions
      (id, title, amount, type, category, date, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING
      id,
      title,
      amount::float8 AS amount,
      type,
      category,
      TO_CHAR(date, 'YYYY-MM-DD') AS date`,
    [
      id,
      transaction.title,
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.date,
      userId,
    ],
  )

  return result.rows[0]
}

export async function updateTransaction(
  id: string,
  transaction: Omit<Transaction, 'id'>,
  userId: string,
): Promise<Transaction | null> {
  const result = await pool.query(
    `UPDATE transactions
     SET
       title = $1,
       amount = $2,
       type = $3,
       category = $4,
       date = $5
     WHERE id = $6 AND user_id = $7
     RETURNING
      id,
      userId,
      title,
      amount::float8 AS amount,
      type,
      category,
      TO_CHAR(date, 'YYYY-MM-DD') AS date`,
    [
      transaction.title,
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.date,
      id,
    ],
  )

  return result.rows[0] ?? null
}

export async function deleteTransaction(id: string, userId: string): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM transactions WHERE id = $1 AND user_id = $2',
    [id, userId],
  )

  return result.rowCount !== 0
}
