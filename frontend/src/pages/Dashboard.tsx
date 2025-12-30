import { useState, useMemo } from 'react'
import Tabs from '../components/layout/Tabs'
import IframeContainer from '../components/common/IframeContainer'
import { apps, getDefaultApp, getAppById } from '../config/apps'

export default function Dashboard() {
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

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden">
      <Tabs
        apps={apps}
        activeAppId={activeAppId}
        onAppSelect={handleAppSelect}
      />
      <main className="flex-1 overflow-hidden">
        <IframeContainer url={currentUrl} />
      </main>
    </div>
  )
}



