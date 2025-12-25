import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Maximize2, Minimize2 } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import IframeContainer from '../components/common/IframeContainer'
import { apps, getDefaultApp, getAppById } from '../config/apps'
// #region agent log
fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Dashboard.tsx:7',message:'Import attempt - dashboardRoutes',data:{file:'../config/dashboardRoutes'},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{});
// #endregion
// REMOVED: import { getSubRouteByPath, getSubRouteById } from '../config/dashboardRoutes'
// REMOVED: import { AppSubItem } from '../types/app'

export default function Dashboard() {
  // #region agent log
  fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Dashboard.tsx:10',message:'Dashboard component entry',data:{pathname:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  const navigate = useNavigate()
  const [isMaximized, setIsMaximized] = useState(false)
  
  const [activeAppId, setActiveAppId] = useState(() => {
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Dashboard.tsx:16',message:'Setting activeAppId',data:{defaultAppId:getDefaultApp().id},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    return getDefaultApp().id
  })
  
  // REMOVED: Subroute logic - no longer needed
  // const [activeSubItem, setActiveSubItem] = useState<AppSubItem | null>(null)

  // REMOVED: Subroute sync effect - no longer needed
  // useEffect(() => {
  //   // Sync with URL changes
  // }, [location.pathname, activeAppId])

  const handleAppSelect = (appId: string) => {
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Dashboard.tsx:41',message:'handleAppSelect called',data:{appId},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    setActiveAppId(appId)
    if (appId === 'dashboard') {
      navigate('/dashboard')
    }
  }

  // REMOVED: handleSubItemSelect - no longer needed
  // const handleSubItemSelect = (appId: string, subItem: AppSubItem) => { ... }

  // Memoize URL calculation to prevent unnecessary recalculations
  const currentUrl = useMemo(() => {
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Dashboard.tsx:64',message:'Calculating currentUrl',data:{activeAppId},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    const app = getAppById(activeAppId) || getDefaultApp()
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Dashboard.tsx:68',message:'currentUrl calculated',data:{url:app.url},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    return app.url
  }, [activeAppId])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden">
      {!isMaximized && (
        <Sidebar
          apps={apps}
          activeAppId={activeAppId}
          onAppSelect={handleAppSelect}
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



