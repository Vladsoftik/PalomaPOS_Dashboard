import { App } from '../types/app'
import { dashboardSubRoutes } from './dashboardRoutes'

export const apps: App[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: 'https://dashboard.apps.palomapos.com/',
    icon: '📊',
    subItems: dashboardSubRoutes,
  },
  {
    id: 'timeclock',
    label: 'Time Clock',
    url: 'https://timeclock.apps.palomapos.com/',
    icon: '⏰',
  },
  {
    id: 'orders',
    label: 'UberEats,Doordash,Groobhub',
    url: 'https://order.out.apps.palomapos.com/',
    icon: '🍔',
  },
  {
    id: 'ai-manager',
    label: 'AI Manager',
    url: 'https://ai-manager.apps.palomapos.com',
    icon: '🤖',
  },
  {
    id: 'loyalty',
    label: 'Loyalty System',
    url: 'https://loyalty.apps.palomapos.com',
    icon: '🎁',
  },
  {
    id: 'online-order',
    label: 'Online Order',
    url: 'https://website.builder.apps.palomapos.com',
    icon: '🌐',
  },
  {
    id: 'instant-funding',
    label: 'Instant Funding',
    url: 'https://neteva-register.apps.palomapos.com',
    icon: '⚡',
  },
]

export const getAppById = (id: string): App | undefined => {
  return apps.find((app) => app.id === id)
}

export const getDefaultApp = (): App => {
  return apps[0] // Dashboard is default
}

