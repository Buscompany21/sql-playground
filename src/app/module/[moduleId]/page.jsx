import ModuleClient from './ModuleClient'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  // Generate routes for modules 1-2
  return [
    { moduleId: '1' },
    { moduleId: '2' },
    { moduleId: '3' },
    { moduleId: '4' },
    { moduleId: '5' },
    { moduleId: '6' },
    { moduleId: '7' },
    { moduleId: '8' },
    { moduleId: '9' },
    { moduleId: '10' },
  ]
}

export default function ModulePage(props) {
  return <ModuleClient {...props} />
}
