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

/**
 * Resolve the SQL schema files to load before running a level.
 *
 * A level JSON may set `schema` to a schema basename (or array of basenames)
 * to override the module's default — useful when one lesson in a module needs
 * a different starting state (e.g. an empty DB for a CREATE TABLE lesson
 * while the rest of the module shares a pre-populated table).
 */
export function curriculumSchemaUrls(moduleId, levelSchemaOverride = null) {
  if (levelSchemaOverride) {
    const list = Array.isArray(levelSchemaOverride)
      ? levelSchemaOverride
      : [levelSchemaOverride]
    const cleaned = list.map((name) => String(name).trim()).filter(Boolean)
    if (cleaned.length) {
      return cleaned.map((name) =>
        withBasePath(`/curriculum/schemas/${name}`)
      )
    }
  }

  const m = Number(moduleId)
  if (m >= 1 && m <= 4) {
    return [withBasePath('/curriculum/schemas/top_songs.sql')]
  }
  if (m === 5) {
    // Module 5 lessons each declare their own per-lesson `schema` field
    // (module5_lesson1.sql .. module5_lesson5.sql) so the per-lesson
    // override path is the one that actually fires. This empty-DB fallback
    // only matters if a new module-5 lesson ever forgets to set `schema`.
    return [withBasePath('/curriculum/schemas/module5_lesson1.sql')]
  }
  if (m === 6 || m === 7) {
    return [
      withBasePath('/curriculum/schemas/top_songs.sql'),
      withBasePath('/curriculum/schemas/album_info.sql'),
    ]
  }
  if (m >= 8 && m <= 10) {
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
