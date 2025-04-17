import ModuleClient from './ModuleClient'
import { moduleConfig } from '../../../config/moduleConfig'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  // Generate routes for all modules in the config
  return Object.keys(moduleConfig).map(moduleId => ({
    moduleId
  }))
}

export default function ModulePage(props) {
  return <ModuleClient {...props} />
}
