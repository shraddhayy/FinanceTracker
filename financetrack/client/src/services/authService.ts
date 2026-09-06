const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
export type User = { id: string; name: string; email: string }
type AuthResult = { user: User; token: string }
async function request(path: string, body?: unknown): Promise<AuthResult> { const response = await fetch(`${API_URL}/api/auth/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); const text = await response.text(); let data: Partial<AuthResult> & { message?: string } = {}; try { data = JSON.parse(text) } catch { throw new Error('The API returned an unexpected response. Confirm that the FinanceTrack server is running on port 4000.') } if (!response.ok) throw new Error(data.message || 'Authentication failed.'); return data as AuthResult }
export const signIn = (email: string, password: string) => request('login', { email, password })
export const signUp = (name: string, email: string, password: string) => request('signup', { name, email, password })
