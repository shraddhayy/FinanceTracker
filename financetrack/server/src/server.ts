import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import transactionRoutes from './routes/transactionRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { ensureSchema } from './migrate.js'

const app = express()
const PORT = Number(process.env.PORT) || 4000

app.use(cors())
app.use(express.json())
app.use(express.text({ type: ['text/csv', 'text/plain'] }))

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'FinanceTrack API is running',
  })
})

app.use('/api/transactions', transactionRoutes)
app.use('/api/auth', authRoutes)

await ensureSchema()

app.listen(PORT, () => {
  console.log(`FinanceTrack API running on http://localhost:${PORT}`)
})
