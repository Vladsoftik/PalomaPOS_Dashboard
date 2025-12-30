import { useState } from 'react'
import Tabs from './Tabs'
import IframeContainer from '../common/IframeContainer'
import { apps, getDefaultApp, getAppById } from '../../config/apps'

export default function Layout() {
  const [activeAppId, setActiveAppId] = useState(() => {
    return getDefaultApp().id
  })

  const handleAppSelect = (appId: string) => {
    setActiveAppId(appId)
  }

  const activeApp = getAppById(activeAppId) || getDefaultApp()

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden">
      <Tabs
        apps={apps}
        activeAppId={activeAppId}
        onAppSelect={handleAppSelect}
      />
      <main className="flex-1 overflow-hidden">
        <IframeContainer url={activeApp.url} />
      </main>
    </div>
  )
}

