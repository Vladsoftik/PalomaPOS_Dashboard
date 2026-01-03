import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import IframeContainer from '../components/common/IframeContainer'
import { apps, getAppById, getDefaultApp } from '@/config/apps'

export default function Dashboard() {
  const { appId } = useParams<{ appId: string }>()
  
  const activeAppId = useMemo(() => {
    if (appId && getAppById(appId)) {
      return appId
    }
    return getDefaultApp().id
  }, [appId])

  const currentUrl = useMemo(() => {
    const app = getAppById(activeAppId) || getDefaultApp()
    return app.url
  }, [activeAppId])

  // Redirect to default app if invalid appId
  if (appId && !getAppById(appId)) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg overflow-hidden">
      <Sidebar
        apps={apps}
        activeAppId={activeAppId}
      />
      <main className="flex-1 overflow-hidden m-3 rounded-xl">
        <IframeContainer url={currentUrl} />
      </main>
    </div>
  )
}



