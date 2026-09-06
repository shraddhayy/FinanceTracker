import { useRef, useState } from 'react'

type Props = { onImported: () => Promise<void> }
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function CsvImport({ onImported }: Props) {
  const inputRef = useRef<HTMLInputElement>(null); const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  async function importFile(file?: File) { if (!file) return; setMessage(''); setError(''); setBusy(true); try { const token = localStorage.getItem('financetrack_token'); const response = await fetch(`${API_URL}/api/transactions/import`, { method: 'POST', headers: { 'Content-Type': 'text/csv', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: await file.text() }); const data = await response.json(); if (!response.ok) throw new Error(data.errors?.map((item: { row: number; message: string }) => `Row ${item.row}: ${item.message}`).join(' · ') || data.message || 'Import failed'); await onImported(); setMessage(`${data.transactions.length} transactions imported successfully.`) } catch (reason) { setError(reason instanceof Error ? reason.message : 'Failed to import CSV file.') } finally { setBusy(false); if (inputRef.current) inputRef.current.value = '' } }
  return <div className="csv-import"><input ref={inputRef} id="csv-file" type="file" accept=".csv,text/csv" onChange={(event) => void importFile(event.target.files?.[0])} hidden /><label htmlFor="csv-file" className="csv-dropzone"><span className="csv-icon">↑</span><strong>{busy ? 'Importing your transactions…' : 'Choose a CSV file'}</strong><small>CSV files only · date, title, category, type, amount</small></label>{message && <p className="import-success">{message}</p>}{error && <p className="form-error">{error}</p>}</div>
}
