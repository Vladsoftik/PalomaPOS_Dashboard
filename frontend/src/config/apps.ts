import { App } from '../types/app'

export const apps: App[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: 'https://dashboard.apps.palomapos.com/',
  },
  {
    id: 'timeclock',
    label: 'Time Clock',
    url: 'https://timeclock.apps.palomapos.com/',
  },
  {
    id: 'orders',
    label: 'UberEats,Doordash,Groobhub',
    url: 'https://order.out.apps.palomapos.com/',
  },
  {
    id: 'ai-manager',
    label: 'AI Manager',
    url: 'https://ai-manager.apps.palomapos.com',
  },
  {
    id: 'loyalty',
    label: 'Loyalty System',
    url: 'https://loyalty.apps.palomapos.com',
  },
  {
    id: 'online-order',
    label: 'Online Order',
    url: 'https://website.builder.apps.palomapos.com',
  },
  {
    id: 'instant-funding',
    label: 'Instant Funding',
    url: 'https://neteva-register.apps.palomapos.com',
  },
]

export const getAppById = (id: string): App | undefined => {
  return apps.find((app) => app.id === id)
}

export const getDefaultApp = (): App => {
  return apps[0] // Dashboard is default
}

