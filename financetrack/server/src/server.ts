import 'dotenv/config'
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