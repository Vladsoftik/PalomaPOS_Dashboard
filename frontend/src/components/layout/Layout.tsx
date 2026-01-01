import { useParams, Navigate } from 'react-router-dom'
import { useMemo } from 'react'
import Tabs from './Tabs'
import IframeContainer from '../common/IframeContainer'
import { apps, getDefaultApp, getAppById } from '../../config/apps'

export default function Layout() {
  const { appId } = useParams<{ appId: string }>()
  
  const activeAppId = useMemo(() => {
    if (appId && getAppById(appId)) {
      return appId
    }
    return getDefaultApp().id
  }, [appId])

  const activeApp = useMemo(() => {
    return getAppById(activeAppId) || getDefaultApp()
  }, [activeAppId])

  // Redirect to default app if invalid appId
  if (appId && !getAppById(appId)) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden">
      <Tabs
        apps={apps}
        activeAppId={activeAppId}
      />
      <main className="flex-1 overflow-hidden">
        <IframeContainer url={activeApp.url} />
      </main>
    </div>
  )
}

