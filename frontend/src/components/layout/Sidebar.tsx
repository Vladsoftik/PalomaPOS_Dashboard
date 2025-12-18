import { useState, useEffect } from 'react'
import { App } from '../../types/app'

interface SidebarProps {
  apps: App[]
  activeAppId: string
  onAppSelect: (appId: string) => void
}

const SIDEBAR_STORAGE_KEY = 'sidebar-collapsed'

export default function Sidebar({ apps, activeAppId, onAppSelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const sidebarWidth = isCollapsed ? '64px' : '256px'

  return (
    <div
      className="h-full bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300"
      style={{ width: sidebarWidth }}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end">
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

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-1">
        {apps.map((app) => {
          const isActive = app.id === activeAppId
          return (
            <button
              key={app.id}
              onClick={() => onAppSelect(app.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title={isCollapsed ? app.label : undefined}
            >
              <span className="text-xl flex-shrink-0">{app.icon}</span>
              {!isCollapsed && (
                <span className="text-sm font-medium truncate">{app.label}</span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

