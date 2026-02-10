import fs from 'node:fs'
import path from 'node:path'

export async function parseCsv(filename: string): Promise<any[]> {
  const filePath = path.join(process.cwd(), 'database', filename)
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n').filter((line) => line.trim())
  if (lines.length === 0) return []

  const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''))
  const rows = lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim().replace(/"/g, ''))
    const obj: any = {}
    headers.forEach((h, i) => (obj[h] = values[i] || null))
    return obj
  })

  return rows
}
