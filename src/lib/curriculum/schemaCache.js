import { curriculumSchemaUrls } from './paths'

const cache = new Map()

export async function loadSchemaSql(moduleId) {
  const urls = curriculumSchemaUrls(moduleId)
  const key = urls.join('|')
  if (cache.has(key)) return cache.get(key)

  const parts = []
  for (const url of urls) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to load schema (${res.status}): ${url}`)
    }
    parts.push(await res.text())
  }

  const text = parts.join('\n\n')
  cache.set(key, text)
  return text
}
