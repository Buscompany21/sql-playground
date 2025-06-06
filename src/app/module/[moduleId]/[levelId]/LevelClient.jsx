'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { moduleConfig } from '../../../../config/moduleConfig'
import { SQLEditor } from '../../../../components/sql-editor'

export default function LevelClient({ params }) {
  const router = useRouter()
  const { moduleId, levelId } = params
  const [levelData, setLevelData] = useState(null)

  const numericLevelId = parseInt(levelId)
  const moduleData = moduleConfig[moduleId]
  
  // Fetch level data for the title
  useEffect(() => {
    const fetchLevelData = async () => {
      const moduleLevelID = `${moduleId}${numericLevelId}`
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leveldata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ moduleLevelID }),
        })
  
        if (response.ok) {
          const data = await response.json()
          setLevelData(data)
        }
      } catch (error) {
        console.error('Error fetching level data:', error)
      }
    }
    
    fetchLevelData()
  }, [moduleId, numericLevelId])

  if (!moduleData) {
    router.push('/')
    return null
  }

  const nextLevelId = numericLevelId + 1
  const hasNextLevel = nextLevelId <= moduleData.levels
  
  const handleComplete = () => {
    if (hasNextLevel) {
      router.push(`/module/${moduleId}/${nextLevelId}`)
    } else {
      router.push(`/module/${moduleId}/complete`)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <SQLEditor
        key={`${moduleId}-${levelId}`}
        moduleId={moduleId}
        levelId={numericLevelId}
        lesson={levelData}
        onComplete={handleComplete}
        hasNextLesson={hasNextLevel}
      />
    </div>
  )
} 