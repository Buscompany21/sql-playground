/**
 * Prefix for static assets when the app is served under a subpath (e.g. GitHub Pages).
 * Set NEXT_PUBLIC_BASE_PATH to match next.config `basePath` if you use one.
 */
export function withBasePath(path) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (!base) return normalized
  return `${base.replace(/\/$/, '')}${normalized}`
}

export function curriculumModuleUrl(moduleId) {
  return withBasePath(`/curriculum/modules/${moduleId}.json`)
}

export function curriculumSchemaUrls(moduleId) {
  const m = Number(moduleId)
  if (m >= 1 && m <= 4) {
    return [withBasePath('/curriculum/schemas/top_songs.sql')]
  }
  if (m === 5) {
    return [
      withBasePath('/curriculum/schemas/empty.sql'),
      withBasePath('/curriculum/schemas/top_songs.sql'),
    ]
  }
  if (m === 6) {
    return [withBasePath('/curriculum/schemas/top_songs.sql')]
  }
  if (m >= 7 && m <= 10) {
    return [
      withBasePath('/curriculum/schemas/top_songs.sql'),
      withBasePath('/curriculum/schemas/venues.sql'),
      withBasePath('/curriculum/schemas/festival_performances.sql'),
    ]
  }
  return [withBasePath('/curriculum/schemas/top_songs.sql')]
}

export function sqlWasmUrl() {
  return withBasePath('/sql-wasm.wasm')
}
