'use client'

import { SqlEditor } from '../../../../components/sql-editor'

export default function LevelClient({ params }) {
  const { moduleId, levelId } = params
  return <SqlEditor moduleId={moduleId} levelId={levelId} />
} 