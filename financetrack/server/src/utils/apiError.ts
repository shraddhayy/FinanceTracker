import type { Response } from 'express'

export function sendServerError(
  res: Response,
  message: string,
) {
  res.status(500).json({
    message,
  })
}