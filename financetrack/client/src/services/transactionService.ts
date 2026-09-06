import type { Transaction } from '../types/transaction'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const TRANSACTIONS_URL = `${API_URL}/api/transactions`
const authHeaders = (): Record<string, string> => { const token = localStorage.getItem('financetrack_token'); return token ? { Authorization: `Bearer ${token}` } : {} }

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(TRANSACTIONS_URL, { headers: authHeaders() })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch transactions: ${response.status}`,
    )
  }

  return response.json()
}

export async function createTransaction(
  transaction: Omit<Transaction, 'id'>,
): Promise<Transaction> {
  const response = await fetch(TRANSACTIONS_URL, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to create transaction: ${response.status}`,
    )
  }

  return response.json()
}

export async function updateTransaction(
  id: string,
  transaction: Omit<Transaction, 'id'>,
): Promise<Transaction> {
  const response = await fetch(`${TRANSACTIONS_URL}/${id}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to update transaction: ${response.status}`,
    )
  }

  return response.json()
}

export async function deleteTransaction(
  id: string,
): Promise<void> {
  const response = await fetch(`${TRANSACTIONS_URL}/${id}`, {
    method: 'DELETE', headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to delete transaction: ${response.status}`,
    )
  }
}
