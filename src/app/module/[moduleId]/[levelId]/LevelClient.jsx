'use client'

import { useRouter } from 'next/navigation'
import { moduleConfig } from '../../../../config/moduleConfig'
import { SQLEditor } from '../../../../components/sql-editor'

export default function LevelClient({ params }) {
  const router = useRouter()
  const { moduleId, levelId } = params

  const numericLevelId = parseInt(levelId, 10)
  const moduleData = moduleConfig[moduleId]

  if (!moduleData) {
    router.push('/')
    return null
  }

  return (
    <div className="h-full flex flex-col">
      <SQLEditor
        key={`${moduleId}-${levelId}`}
        moduleId={moduleId}
        levelId={numericLevelId}
      />
    </div>
  )
} 