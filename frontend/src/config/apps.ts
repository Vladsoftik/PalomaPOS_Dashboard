import { App } from '../types/app'

export const apps: App[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: 'https://dashboard.apps.palomapos.com/',
    icon: '📊',
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
]

export const getAppById = (id: string): App | undefined => {
  return apps.find((app) => app.id === id)
}

export const getDefaultApp = (): App => {
  return apps[0] // Dashboard is default
}

