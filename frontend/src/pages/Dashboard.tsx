import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Maximize2, Minimize2 } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import IframeContainer from '../components/common/IframeContainer'
import { apps, getDefaultApp, getAppById } from '../config/apps'
import { getSubRouteByPath, getSubRouteById } from '../config/dashboardRoutes'
import { AppSubItem } from '../types/app'

export default function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMaximized, setIsMaximized] = useState(false)
  
  const [activeAppId, setActiveAppId] = useState(() => {
    return getDefaultApp().id
  })
  
  const [activeSubItem, setActiveSubItem] = useState<AppSubItem | null>(() => {
    // Check if current path matches a dashboard sub-route
    const subRoute = getSubRouteByPath(location.pathname)
    if (subRoute) {
      return subRoute
    }
    // Default to main dashboard
    const defaultSubRoute = getSubRouteById('dashboard-main')
    return defaultSubRoute || null
  })

  useEffect(() => {
    // Sync with URL changes
    const subRoute = getSubRouteByPath(location.pathname)
    if (subRoute && activeAppId === 'dashboard') {
      setActiveSubItem(subRoute)
    } else if (location.pathname === '/dashboard' || location.pathname === '/') {
      const defaultSubRoute = getSubRouteById('dashboard-main')
      setActiveSubItem(defaultSubRoute || null)
    }
  }, [location.pathname, activeAppId])

  const handleAppSelect = (appId: string) => {
    setActiveAppId(appId)
    if (appId === 'dashboard') {
      // Select the first sub-item (main dashboard)
      const defaultSubRoute = getSubRouteById('dashboard-main')
      if (defaultSubRoute) {
        setActiveSubItem(defaultSubRoute)
        navigate(defaultSubRoute.path)
      } else {
        navigate('/dashboard')
      }
    } else {
      setActiveSubItem(null)
    }
  }

  const handleSubItemSelect = (appId: string, subItem: AppSubItem) => {
    setActiveAppId(appId)
    setActiveSubItem(subItem)
    navigate(subItem.path)
  }

  // Memoize URL calculation to prevent unnecessary recalculations
  const currentUrl = useMemo(() => {
    if (activeAppId === 'dashboard' && activeSubItem) {
      return activeSubItem.url
    }
    const app = getAppById(activeAppId) || getDefaultApp()
    return app.url
  }, [activeAppId, activeSubItem])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden">
      {!isMaximized && (
        <Sidebar
          apps={apps}
          activeAppId={activeAppId}
          activeSubItemId={activeSubItem?.id}
          onAppSelect={handleAppSelect}
          onSubItemSelect={handleSubItemSelect}
        />
      )}
      <main className={`${isMaximized ? 'w-full' : 'flex-1'} overflow-hidden relative`}>
        {/* Maximize/Minimize Button */}
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          <button
            onClick={toggleMaximize}
            className="p-2 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            title={isMaximized ? 'Minimize' : 'Maximize'}
            aria-label={isMaximized ? 'Minimize' : 'Maximize'}
          >
            {isMaximized ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <IframeContainer url={currentUrl} />
      </main>
    </div>
  )
}



