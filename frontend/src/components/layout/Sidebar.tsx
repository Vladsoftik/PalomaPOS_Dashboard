import { useState, useEffect } from 'react'
import { LayoutDashboard, Clock, ShoppingBag, Brain, Gift, Globe, Zap, ChevronDown, ChevronRight } from 'lucide-react'
import { App, AppSubItem } from '../../types/app'

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
  activeSubItemId?: string
  onAppSelect: (appId: string) => void
  onSubItemSelect?: (appId: string, subItem: AppSubItem) => void
}

const SIDEBAR_STORAGE_KEY = 'sidebar-collapsed'

export default function Sidebar({ apps, activeAppId, activeSubItemId, onAppSelect, onSubItemSelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    return saved ? JSON.parse(saved) : false
  })

  const [expandedApps, setExpandedApps] = useState<Set<string>>(() => {
    // Auto-expand dashboard if it's active
    if (activeAppId === 'dashboard') {
      return new Set(['dashboard'])
    }
    return new Set()
  })

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isCollapsed))
  }, [isCollapsed])

  useEffect(() => {
    // Auto-expand Dashboard when it becomes active
    if (activeAppId === 'dashboard') {
      setExpandedApps((prev) => {
        const newSet = new Set(prev)
        newSet.add('dashboard')
        return newSet
      })
    }
  }, [activeAppId])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleExpand = (appId: string) => {
    setExpandedApps((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(appId)) {
        newSet.delete(appId)
      } else {
        newSet.add(appId)
      }
      return newSet
    })
  }

  const handleAppClick = (app: App) => {
    if (app.subItems && app.subItems.length > 0) {
      if (!isCollapsed) {
        toggleExpand(app.id)
      }
      // If clicking on dashboard with sub-items, select the first sub-item
      if (app.id === 'dashboard' && onSubItemSelect && app.subItems.length > 0) {
        onSubItemSelect(app.id, app.subItems[0])
      } else {
        onAppSelect(app.id)
      }
    } else {
      onAppSelect(app.id)
    }
  }

  const sidebarWidth = isCollapsed ? '64px' : '256px'

  return (
    <div
      className="h-full bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300"
      style={{ width: sidebarWidth }}
    >
      {/* Toggle Button */}
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

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {apps.map((app) => {
          const isActive = app.id === activeAppId
          const isExpanded = expandedApps.has(app.id)
          const hasSubItems = app.subItems && app.subItems.length > 0
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
                  <>
                    <span className="text-sm font-medium truncate text-left flex-1">{app.label}</span>
                    {false && hasSubItems && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(app.id)
                        }}
                        className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </>
                )}
              </button>
              
              {/* Sub-items - Hidden for now */}
              {false && !isCollapsed && hasSubItems && isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {app.subItems?.map((subItem) => {
                    const isSubActive = activeSubItemId === subItem.id
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          if (onSubItemSelect) {
                            onSubItemSelect(app.id, subItem)
                          }
                        }}
                        className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                          isSubActive
                            ? 'bg-primary-500 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current opacity-50"></span>
                        <span className="text-sm font-medium truncate text-left">{subItem.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

