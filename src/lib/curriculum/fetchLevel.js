import { curriculumModuleUrl } from './paths'

const REQUIRED = [
  'title',
  'task',
  'initialCode',
  'solution',
  'hintMessage',
  'successMessage',
  'table',
]

/** Normalize `table` from JSON: string or string[] → trimmed non-empty names. */
export function normalizeLessonTables(table) {
  if (table == null) return null
  if (typeof table === 'string') {
    const t = table.trim()
    return t ? [t] : null
  }
  if (Array.isArray(table)) {
    const out = table.map((x) => String(x).trim()).filter(Boolean)
    return out.length ? out : null
  }
  return null
}

/** First table in the lesson’s `table` list — used for initial result preview. */
export function getPreviewTableName(level) {
  const list = normalizeLessonTables(level?.table)
  return list?.[0] ?? null
}

export function stripLevelForClient(level) {
  if (!level) return null
  const { solution: _s, ...rest } = level
  return rest
}

export async function fetchLevelDefinition(moduleId, levelId) {
  const url = curriculumModuleUrl(moduleId)
  const res = await fetch(url)
  if (!res.ok) {
    const err = new Error(
      res.status === 404
        ? `No module file at curriculum/modules/${moduleId}.json`
        : `Failed to load module (${res.status})`
    )
    err.status = res.status
    throw err
  }
  const moduleData = await res.json()
  const levels = Array.isArray(moduleData.levels) ? moduleData.levels : []
  const data = levels.find((level) => Number(level.id) === Number(levelId))

  if (!data) {
    throw new Error(`No level ${levelId} found in module ${moduleId}`)
  }

  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null) {
      throw new Error(`Level JSON missing required field "${key}"`)
    }
  }

  const tables = normalizeLessonTables(data.table)
  if (!tables?.length) {
    throw new Error(
      `Level JSON "table" must be a non-empty string or array of table names (level ${levelId} in module ${moduleId})`
    )
  }
  data.table = tables

  return data
}
