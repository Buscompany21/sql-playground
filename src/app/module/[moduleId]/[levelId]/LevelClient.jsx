'use client'

import { SqlEditor } from '../../../../components/sql-editor'

export default function LevelClient({ params }) {
  console.log('Rendering LevelPage component')
  console.log('Params:', params)
  
  const { moduleId, levelId } = params
  
  console.log('moduleId:', moduleId)
  console.log('levelId:', levelId)
  
  return <SqlEditor moduleId={moduleId} levelId={levelId} />
} 