import { App } from '../types/app';
import { Brain, Clock, FileText, Gift, Globe, HandCoins, Home, ShoppingBag, Zap } from 'lucide-react';

export const apps: App[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    url: 'https://dashboard.apps.palomapos.com/',
  },
  {
    id: 'timeclock',
    label: 'Time Clock',
    icon: Clock,
    url: 'https://timeclock.apps.palomapos.com/',
  },
  {
    id: 'payroll',
    label: 'Payroll',
    icon: HandCoins,
    url: 'https://payroll.apps.palomapos.com/',
  },
  {
    id: 'log-operations',
    label: 'Log Operations',
    icon: FileText,
    url: 'https://logs.apps.palomapos.com/',
  },
  {
    id: 'orders',
    label: 'OrderOut',
    icon: ShoppingBag,
    url: 'https://order.out.apps.palomapos.com/',
  },
  {
    id: 'ai-manager',
    label: 'AI Manager',
    icon: Brain,
    url: 'https://ai-manager.apps.palomapos.com',
  },
  {
    id: 'loyalty',
    label: 'Loyalty',
    icon: Gift,
    url: 'https://loyalty.apps.palomapos.com',
  },
  {
    id: 'online-order',
    label: 'Online Order',
    icon: Globe,
    url: 'https://website.builder.apps.palomapos.com',
  },
  {
    id: 'instant-funding',
    label: 'Instant Funding',
    icon: Zap,
    url: 'https://neteva-register.apps.palomapos.com',
  },
]

export const getAppById = (id: string): App | undefined => {
  return apps.find((app) => app.id === id)
}

export const getDefaultApp = (): App => {
  return apps[0] // Dashboard is default
}

