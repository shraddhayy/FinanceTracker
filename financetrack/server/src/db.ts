import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'financetrack',
  password: '123@nyc',
  port: 5432,
})