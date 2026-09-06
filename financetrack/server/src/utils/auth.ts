import crypto from 'node:crypto'
import type { NextFunction, Request, Response } from 'express'

const secret = process.env.AUTH_SECRET || 'replace-this-development-secret-before-production'
const encode = (value: string) => Buffer.from(value).toString('base64url')
const sign = (value: string) => crypto.createHmac('sha256', secret).update(value).digest('base64url')

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = await new Promise<string>((resolve, reject) => crypto.scrypt(password, salt, 64, (error, derived) => error ? reject(error) : resolve(derived.toString('hex'))))
  return `${salt}:${hash}`
}

export async function passwordMatches(password: string, stored: string) {
  const [salt, expected] = stored.split(':')
  if (!salt || !expected) return false
  const hash = await new Promise<Buffer>((resolve, reject) => crypto.scrypt(password, salt, 64, (error, derived) => error ? reject(error) : resolve(derived)))
  return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), hash)
}

export function createToken(userId: string) {
  const payload = encode(JSON.stringify({ sub: userId, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 }))
  return `${payload}.${sign(payload)}`
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
  if (!token) { res.status(401).json({ message: 'Authentication is required' }); return }
  const [payload, signature] = token.split('.')
  if (!payload || !signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(sign(payload)))) { res.status(401).json({ message: 'Invalid session' }); return }
  try { const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { sub: string; exp: number }; if (!data.sub || data.exp < Date.now()) throw new Error('Expired'); res.locals.userId = data.sub; next() } catch { res.status(401).json({ message: 'Session has expired' }) }
}
