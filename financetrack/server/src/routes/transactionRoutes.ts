import { parseCsv } from '../utils/csvParser.js'
import { Router } from 'express'
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService.js'
import { sendServerError } from '../utils/apiError.js'
import { requireAuth } from '../utils/auth.js'

const router = Router()
router.use(requireAuth)

router.post('/import', async (req, res) => {
  try {
    const csvText = req.body

    if (typeof csvText !== 'string' || csvText.trim() === '') {
      res.status(400).json({
        message: 'CSV content is required',
      })
      return
    }

    const result = parseCsv(csvText)

    if (result.errors.length > 0) {
      res.status(400).json({
        message: 'CSV validation failed',
        errors: result.errors,
      })
      return
    }

    const importedTransactions = []

    for (const transaction of result.validRows) {
      const createdTransaction =
        await createTransaction(transaction, res.locals.userId)

      importedTransactions.push(createdTransaction)
    }

    res.status(201).json({
      message: 'Transactions imported successfully',
      transactions: importedTransactions,
    })
  } catch {
    sendServerError(
      res,
      'Failed to import transactions',
    )
  }
})

router.get('/', async (_req, res) => {
  try {
    const transactions = await getAllTransactions(res.locals.userId)
    res.json(transactions)
  } catch {
    sendServerError(res, 'Failed to fetch transactions')
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
    }, res.locals.userId)

    res.status(201).json(transaction)
  } catch {
    sendServerError(res, 'Failed to create transaction')
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
    const transaction = await updateTransaction(
      req.params.id,
      {
        title: title.trim(),
        amount,
        type,
        category: category.trim(),
        date,
      }, res.locals.userId,
    )

    if (!transaction) {
      res.status(404).json({
        message: 'Transaction not found',
      })
      return
    }

    res.json(transaction)
  } catch {
    sendServerError(
      res,
      'Failed to update transaction',
    )
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteTransaction(
      req.params.id,
      res.locals.userId,
    )

    if (!deleted) {
      res.status(404).json({
        message: 'Transaction not found',
      })
      return
    }

    res.status(204).send()
  } catch {
    sendServerError(
      res,
      'Failed to delete transaction',
    )
  }
})

export default router
