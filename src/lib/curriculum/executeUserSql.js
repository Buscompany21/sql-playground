import { sqlWasmUrl } from './paths'

let sqlFactoryPromise

async function getSqlFactory() {
  if (!sqlFactoryPromise) {
    const initSqlJs = (await import('sql.js')).default
    sqlFactoryPromise = initSqlJs({
      locateFile: () => sqlWasmUrl(),
    })
  }
  return sqlFactoryPromise
}

function splitStatements(userQuery) {
  return userQuery
    .split(';')
    .map((q) => q.trim())
    .filter(Boolean)
}

function rowsToObjects(columns, values) {
  if (!values?.length) return []
  return values.map((row) => {
    const obj = {}
    columns.forEach((col, i) => {
      obj[col] = row[i] ?? null
    })
    return obj
  })
}

function runSelect(db, query) {
  const exec = db.exec(query)
  if (exec.length === 0) return []
  const { columns, values = [] } = exec[0]
  return rowsToObjects(columns, values)
}

function runFinalStatement(db, query) {
  const statements = splitStatements(query)
  if (!statements.length) return { rows: [], columns: [] }
  const finalQuery = statements[statements.length - 1]
  for (let i = 0; i < statements.length - 1; i += 1) {
    db.run(statements[i])
  }
  const exec = db.exec(finalQuery)
  if (exec.length === 0) return { rows: [], columns: [] }
  return {
    rows: exec[0].values || [],
    columns: exec[0].columns || [],
  }
}

export async function executePreviewQuery({ schemaSql, query }) {
  const SQL = await getSqlFactory()
  const db = new SQL.Database()
  try {
    db.exec(schemaSql)
    return {
      output: runSelect(db, query),
      error: null,
    }
  } catch (e) {
    return {
      output: [],
      error: `SQL Error: ${e?.message || e}`,
    }
  } finally {
    db.close()
  }
}

/**
 * Mirrors backend/SQL-Code-Playground/lambda_function.py execute_query semantics.
 */
export async function executeUserSql({ schemaSql, userQuery, level }) {
  const solutionQuery = String(level.solution || '').trim()
  const hintMessage = level.hintMessage
  const successMessage = level.successMessage

  if (!solutionQuery) {
    return {
      output: [],
      passed: false,
      error: 'Invalid level configuration',
    }
  }

  const SQL = await getSqlFactory()
  const queries = splitStatements(userQuery)
  if (!queries.length) {
    return {
      output: [],
      passed: false,
      error: 'No valid SQL statements found',
    }
  }

  try {
    const userDb = new SQL.Database()
    const solutionDb = new SQL.Database()
    let userRows = []
    let userColumns = []
    let solutionRows = []
    try {
      userDb.exec(schemaSql)
      solutionDb.exec(schemaSql)
      const userResult = runFinalStatement(userDb, userQuery)
      const solutionResult = runFinalStatement(solutionDb, solutionQuery)
      userRows = userResult.rows
      userColumns = userResult.columns
      solutionRows = solutionResult.rows
    } finally {
      userDb.close()
      solutionDb.close()
    }

    const passed = JSON.stringify(userRows) === JSON.stringify(solutionRows)
    const output = rowsToObjects(userColumns, userRows)

    const response = {
      output,
      passed,
      message: passed
        ? successMessage || '🎉 Spell perfectly cast!'
        : hintMessage || 'Not quite right. Try again!',
    }

    if (!passed) {
      response.hint = hintMessage
    }

    return response
  } catch (e) {
    return {
      output: [],
      passed: false,
      error: `SQL Error: ${e?.message || e}`,
      hint: hintMessage,
      showSolution: true,
    }
  }
}
