import { useState, useMemo } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import IframeContainer from '../components/common/IframeContainer'
import { apps, getDefaultApp, getAppById } from '../config/apps'

export default function Dashboard() {
  const [isMaximized, setIsMaximized] = useState(false)
  
  const [activeAppId, setActiveAppId] = useState(() => {
    return getDefaultApp().id
  })

  const handleAppSelect = (appId: string) => {
    setActiveAppId(appId)
  }

  const currentUrl = useMemo(() => {
    const app = getAppById(activeAppId) || getDefaultApp()
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



