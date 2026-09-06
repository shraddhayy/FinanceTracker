export type ParsedCsvRow = {
  title: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
}

export type CsvRowError = {
  row: number
  message: string
}

export type CsvParseResult = {
  validRows: ParsedCsvRow[]
  errors: CsvRowError[]
}

export function parseCsv(csvText: string): CsvParseResult {
  const lines = csvText
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')

  if (lines.length === 0) {
    return {
      validRows: [],
      errors: [{ row: 1, message: 'CSV file is empty' }],
    }
  }

  const headers = lines[0]
    .split(',')
    .map((header) => header.trim().toLowerCase())

  const expectedHeaders = [
    'title',
    'amount',
    'type',
    'category',
    'date',
  ]

  const hasValidHeaders = expectedHeaders.every(
    (header, index) => headers[index] === header,
  )

  if (!hasValidHeaders) {
    return {
      validRows: [],
      errors: [
        {
          row: 1,
          message:
            'CSV headers must be: title, amount, type, category, date',
        },
      ],
    }
  }

  const validRows: ParsedCsvRow[] = []
  const errors: CsvRowError[] = []

  lines.slice(1).forEach((line, index) => {
    const rowNumber = index + 2
    const values = line.split(',').map((value) => value.trim())

    if (values.length !== 5) {
      errors.push({
        row: rowNumber,
        message: 'Row must contain exactly 5 columns',
      })
      return
    }

    const [title, amountValue, type, category, date] = values
    const amount = Number(amountValue)

    if (!title) {
      errors.push({
        row: rowNumber,
        message: 'Title is required',
      })
      return
    }

    if (
      !amountValue ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      errors.push({
        row: rowNumber,
        message: 'Amount must be a positive number',
      })
      return
    }

    if (type !== 'income' && type !== 'expense') {
      errors.push({
        row: rowNumber,
        message: 'Type must be income or expense',
      })
      return
    }

    if (!category) {
      errors.push({
        row: rowNumber,
        message: 'Category is required',
      })
      return
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push({
        row: rowNumber,
        message: 'Date must be in YYYY-MM-DD format',
      })
      return
    }

    validRows.push({
      title,
      amount,
      type,
      category,
      date,
    })
  })

  return {
    validRows,
    errors,
  }
}