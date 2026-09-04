// const API_URL = 'http://localhost:4000/api/transactions'
// import type { Transaction } from '../types/transaction'


// export async function getTransactions(): Promise<Transaction[]> {
//   const response = await fetch(API_URL)

//   if (!response.ok) {
//     throw new Error('Failed to fetch transactions')
//   }

//   return response.json()
// }

// export async function createTransaction(
//   transaction: Omit<Transaction, 'id'>,
// ): Promise<Transaction> {
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(transaction),
//   })

//   if (!response.ok) {
//     throw new Error('Failed to create transaction')
//   }

//   return response.json()
// }

// export async function updateTransaction(
//   id: string,
//   transaction: Omit<Transaction, 'id'>,
// ): Promise<Transaction> {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(transaction),
//   })

//   if (!response.ok) {
//     throw new Error('Failed to update transaction')
//   }

//   return response.json()
// }

// export async function deleteTransaction(id: string): Promise<void> {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE',
//   })

//   if (!response.ok) {
//     throw new Error('Failed to delete transaction')
//   }
// }
import type { Transaction } from '../types/transaction'

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  throw new Error('VITE_API_URL is not configured')
}

const TRANSACTIONS_URL = `${API_URL}/api/transactions`

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(TRANSACTIONS_URL)

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
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(
      `Failed to delete transaction: ${response.status}`,
    )
  }
}