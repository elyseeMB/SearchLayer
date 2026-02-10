import fs from 'node:fs'
import { parse } from 'csv-parse'
import app from '@adonisjs/core/services/app'

export async function parseCsv(fileName: string) {
  const filePath = app.publicPath(fileName)
  const doc: any[] = []

  const readStream = fs.createReadStream(filePath)

  const parser = readStream.pipe(
    parse({
      columns: true,
      trim: true,
      skip_empty_lines: true,
    })
  )

  for await (const record of parser) {
    doc.push(record)
    console.log(record)
  }
  return doc
}
