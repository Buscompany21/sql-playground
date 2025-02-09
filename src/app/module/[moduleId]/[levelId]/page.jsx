import LevelClient from './LevelClient'
import { MODULE_CONFIG, getModuleLevels } from '../../../../config/modules'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const routes = []
  for (const moduleId in MODULE_CONFIG) {
    const numLevels = getModuleLevels(moduleId)
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
  