import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import IframeContainer from '../components/common/IframeContainer'
import { apps, getDefaultApp, getAppById } from '../config/apps'
import { getSubRouteByPath, getSubRouteById } from '../config/dashboardRoutes'
import { useAuth } from '../contexts/AuthContext'
import { AppSubItem } from '../types/app'

export default function Dashboard() {
  const { logout, isCredentialLogin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  
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

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden">
      <Sidebar
        apps={apps}
        activeAppId={activeAppId}
        activeSubItemId={activeSubItem?.id}
        onAppSelect={handleAppSelect}
        onSubItemSelect={handleSubItemSelect}
      />
      <main className="flex-1 overflow-hidden relative">
        {isCredentialLogin && (
          <div className="absolute bottom-4 left-4 z-10">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors shadow-lg"
            >
              Logout
            </button>
          </div>
        )}
        <IframeContainer url={currentUrl} />
      </main>
    </div>
  )
}



