import { Progress } from "./ui/progress"
import { ModuleHomeButton } from "./ModuleHomeButton"
import { getModuleLevels } from '../config/modules'
import { Card } from "./ui/card"

export function NavBar({ moduleId, levelId }) {
  return (
    <Card className="bg-white bg-opacity-90 backdrop-blur-sm border-4 border-indigo-200 shadow-lg">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <ModuleHomeButton />
          <div className="px-4 py-1 bg-purple-100 rounded-full">
            <span className="text-sm font-bold text-purple-700">
              Module {moduleId} • Level {levelId}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-1/3">
          <span className="text-sm font-medium text-purple-600 whitespace-nowrap">
            Level Progress
          </span>
          <Progress
            value={((levelId - 1) / (getModuleLevels(moduleId.toString()) - 1)) * 100}
            className="h-2 bg-pink-200"
            indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </div>
    </Card>
  )
}