import { LayoutDashboard, Clock, ShoppingBag, Brain, Gift, Globe, Zap } from 'lucide-react'
import { App } from '../../types/app'

// Map app IDs to Lucide React icons
const appIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  timeclock: Clock,
  orders: ShoppingBag,
  'ai-manager': Brain,
  loyalty: Gift,
  'online-order': Globe,
  'instant-funding': Zap,
}

interface TabsProps {
  apps: App[]
  activeAppId: string
  onAppSelect: (appId: string) => void
}

export default function Tabs({ apps, activeAppId, onAppSelect }: TabsProps) {
  const handleAppClick = (app: App) => {
    onAppSelect(app.id)
  }

  return (
    <div className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-gray-700">
      <div className="flex overflow-x-auto">
        {apps.map((app) => {
          const isActive = app.id === activeAppId
          const IconComponent = appIcons[app.id]

          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className={`
                px-5 py-3 text-sm
                border-0 border-b-2 border-l-0 border-r-0 border-t-0
                flex items-center gap-2 whitespace-nowrap
                transition-colors duration-150
                ${
                  isActive
                    ? 'text-primary-500 dark:text-primary-400 border-b-primary-500'
                    : 'text-gray-600 dark:text-gray-400 border-b-transparent hover:text-gray-900 dark:hover:text-white'
                }
                focus:outline-none
                active:border-l-0 active:border-r-0 active:border-t-0
              `}
              title={app.label}
              aria-label={`Switch to ${app.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {IconComponent && (
                <IconComponent 
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive 
                      ? 'text-primary-500 dark:text-primary-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`} 
                />
              )}
              <span className="truncate">{app.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

