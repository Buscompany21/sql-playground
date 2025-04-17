import LevelClient from './LevelClient'
import { moduleConfig, getModuleLevels } from '../../../../config/moduleConfig'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const routes = []
  for (const moduleId in moduleConfig) {
    const numLevels = moduleConfig[moduleId].levels
    for (let level = 1; level <= numLevels; level++) {
      routes.push({
        moduleId: moduleId.toString(),
        levelId: level.toString()
      })
    }
  }
  return routes
}

export default function LevelPage(props) {
  return <LevelClient {...props} />
}
  