import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { App } from '../../types/app'
import { useAuth } from '../../contexts/AuthContext'

interface SidebarProps {
  apps: App[]
  activeAppId: string
}

export default function Sidebar({ apps, activeAppId }: SidebarProps) {
  const navigate = useNavigate()
  const { logout, validateToken } = useAuth()

  const handleAppClick = async (app: App) => {
    // Validate token before switching apps
    const isValid = await validateToken()

    if (!isValid) {
      // Token validation failed, user will be redirected to login by handleTokenError
      return
    }

    navigate(`/${app.id}`)
  }

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="h-full bg-white dark:bg-dark-bg-secondary dark:border-gray-800 flex flex-col w-20 px-3">
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

      {/* Sign Out Button */}
      <div className="flex flex-col items-center py-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleSignOut}
          className="flex flex-col items-center group"
          aria-label="Sign Out"
        >
          <div className="rounded-[10px] p-3 flex items-center justify-center transition-all bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-gray-800">
            <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <span className="text-[11px] font-medium mt-1 text-gray-600 dark:text-gray-400 opacity-70">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  )
}
