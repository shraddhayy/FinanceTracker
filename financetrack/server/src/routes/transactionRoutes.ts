import { Router } from 'express'
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const transactions = await getAllTransactions()
    res.json(transactions)
  } catch {
    res.status(500).json({
      message: 'Failed to fetch transactions',
    })
  }
})

router.post('/', async (req, res) => {
  const { title, amount, type, category, date } = req.body

  if (
    typeof title !== 'string' ||
    title.trim().length === 0
  ) {
    res.status(400).json({
      message: 'Title is required',
    })
    return
  }

  if (
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    res.status(400).json({
      message: 'Amount must be a positive number',
    })
    return
  }

  if (type !== 'income' && type !== 'expense') {
    res.status(400).json({
      message: 'Type must be income or expense',
    })
    return
  }

  if (
    typeof category !== 'string' ||
    category.trim().length === 0
  ) {
    res.status(400).json({
      message: 'Category is required',
    })
    return
  }

  if (
    typeof date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    res.status(400).json({
      message: 'Date must be in YYYY-MM-DD format',
    })
    return
  }

  try {
    const transaction = await createTransaction({
      title: title.trim(),
      amount,
      type,
      category: category.trim(),
      date,
    })

    res.status(201).json(transaction)
  } catch {
    res.status(500).json({
      message: 'Failed to create transaction',
    })
  }
})

router.put('/:id', async (req, res) => {
  const { title, amount, type, category, date } = req.body

  if (
    typeof title !== 'string' ||
    title.trim().length === 0
  ) {
    res.status(400).json({
      message: 'Title is required',
    })
    return
  }

  if (
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    res.status(400).json({
      message: 'Amount must be a positive number',
    })
    return
  }

  if (type !== 'income' && type !== 'expense') {
    res.status(400).json({
      message: 'Type must be income or expense',
    })
    return
  }

  if (
    typeof category !== 'string' ||
    category.trim().length === 0
  ) {
    res.status(400).json({
      message: 'Category is required',
    })
    return
  }

  if (
    typeof date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    res.status(400).json({
      message: 'Date must be in YYYY-MM-DD format',
    })
    return
  }

  try {
    const transaction = await updateTransaction(req.params.id, {
      title: title.trim(),
      amount,
      type,
      category: category.trim(),
      date,
    })

    if (!transaction) {
      res.status(404).json({
        message: 'Transaction not found',
      })
      return
    }

    res.json(transaction)
  } catch {
    res.status(500).json({
      message: 'Failed to update transaction',
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteTransaction(req.params.id)

    if (!deleted) {
      res.status(404).json({
        message: 'Transaction not found',
      })
      return
    }

    res.status(204).send()
  } catch {
    res.status(500).json({
      message: 'Failed to delete transaction',
    })
  }
})

export default router