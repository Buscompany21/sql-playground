import LevelClient from './LevelClient'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const routes = []
  for (let moduleNum = 1; moduleNum <= 10; moduleNum++) {
    for (let level = 1; level <= 9; level++) {
      routes.push({
        moduleId: moduleNum.toString(),
        levelId: level.toString()
      })
    }
  }
  return routes
}

export default function LevelPage(props) {
  return <LevelClient {...props} />
}
  