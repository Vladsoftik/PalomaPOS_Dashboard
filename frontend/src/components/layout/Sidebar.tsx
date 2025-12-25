import { useState } from 'react'
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

interface SidebarProps {
  apps: App[]
  activeAppId: string
  onAppSelect: (appId: string) => void
}

const SIDEBAR_STORAGE_KEY = 'sidebar-collapsed'

export default function Sidebar({ apps, activeAppId, onAppSelect }: SidebarProps) {
  const [isCollapsed] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    return saved ? JSON.parse(saved) : false
  })

  // Note: setIsCollapsed and toggleCollapse are kept for future use when toggle is enabled
  const toggleCollapse = () => {
    // Toggle functionality will be implemented when needed
  }

  const handleAppClick = (app: App) => {
    onAppSelect(app.id)
  }

  const sidebarWidth = isCollapsed ? '64px' : '256px'

  return (
    <div
      className="h-full bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300"
      style={{ width: sidebarWidth }}
    >
      {/* Toggle Button - Hidden for now */}
      {false && (
        <div className="p-[13px] border-b border-gray-200 dark:border-gray-700 flex items-center justify-end">
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 p-2 pt-4 space-y-1 overflow-y-auto">
        {apps.map((app) => {
          const isActive = app.id === activeAppId
          const IconComponent = appIcons[app.id]
          
          return (
            <div key={app.id}>
              <button
                onClick={() => handleAppClick(app)}
                className={`w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={isCollapsed ? app.label : undefined}
              >
                {IconComponent && (
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                )}
                {!isCollapsed && (
                  <span className="text-sm font-medium truncate text-left flex-1">{app.label}</span>
                )}
              </button>
            </div>
          )
        })}
      </nav>
    </div>
  )
}

