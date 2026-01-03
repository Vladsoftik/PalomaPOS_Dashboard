import { useNavigate } from 'react-router-dom'
import { App } from '../../types/app'

interface SidebarProps {
  apps: App[]
  activeAppId: string
}

export default function Sidebar({ apps, activeAppId }: SidebarProps) {
  const navigate = useNavigate()

  const handleAppClick = (app: App) => {
    navigate(`/${app.id}`)
  }

  return (
    <div className="h-full bg-white dark:bg-dark-bg-secondary dark:border-gray-800 flex flex-col w-20">
      {/* App List */}
      <nav className="flex-1 flex flex-col items-center py-4 space-y-3 overflow-y-auto">
        {apps.map((app) => {
          const isActive = app.id === activeAppId
          const IconComponent = app.icon
          
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="flex flex-col items-center group"
              aria-label={app.label}
            >
              <div
                className={`rounded-[10px] p-3 flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-primary-500'
                    : 'bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-gray-800'
                }`}
              >
                {IconComponent && (
                  <IconComponent 
                    className={`w-5 h-5 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-[11px] font-medium mt-1 ${
                  isActive
                    ? 'text-primary-500 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 opacity-70'
                }`}
              >
                {app.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
