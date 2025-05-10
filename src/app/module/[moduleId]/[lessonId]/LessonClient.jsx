'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { moduleConfig } from '../../../../config/moduleConfig'
import { SQLEditor } from '../../../../components/sql-editor'

export default function LessonClient({ params }) {
  const router = useRouter()
  const { moduleId, lessonId } = params
  const [levelData, setLevelData] = useState(null)

  const numericLessonId = parseInt(lessonId)
  const moduleData = moduleConfig[moduleId]
  
  // Fetch level data for the title
  useEffect(() => {
    const fetchLevelData = async () => {
      const moduleLevelID = `${moduleId}${numericLessonId}`
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
  }, [moduleId, numericLessonId])

  if (!moduleData) {
    router.push('/')
    return null
  }

  const lesson = moduleData.lessons?.find(l => l.id === numericLessonId)

  if (!lesson) {
    router.push(`/module/${moduleId}`)
    return null
  }

  const nextLessonId = numericLessonId + 1
  const hasNextLesson = moduleData.lessons?.some(l => l.id === nextLessonId)
  
  const handleComplete = () => {
    if (hasNextLesson) {
      router.push(`/module/${moduleId}/${nextLessonId}`)
    } else {
      router.push(`/module/${moduleId}/complete`)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <SQLEditor
        key={`${moduleId}-${lessonId}`}
        moduleId={moduleId}
        levelId={numericLessonId}
        lesson={lesson}
        onComplete={handleComplete}
        hasNextLesson={hasNextLesson}
      />
    </div>
  )
} 