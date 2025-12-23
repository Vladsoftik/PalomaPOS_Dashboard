import { AppSubItem } from '../types/app'

export const dashboardSubRoutes: AppSubItem[] = [
  {
    id: 'dashboard-main',
    label: 'Dashboard',
    path: '/dashboard',
    url: 'https://dashboard.apps.palomapos.com/',
  },
  {
    id: 'orders-report',
    label: 'Orders',
    path: '/reports/orders',
    url: 'https://dashboard.apps.palomapos.com/reports/orders',
  },
  {
    id: 'items-report',
    label: 'Items',
    path: '/reports/items',
    url: 'https://dashboard.apps.palomapos.com/reports/items',
  },
  {
    id: 'employees-report',
    label: 'Employees',
    path: '/reports/employees',
    url: 'https://dashboard.apps.palomapos.com/reports/employees',
  },
  {
    id: 'taxes-report',
    label: 'Taxes',
    path: '/reports/taxes',
    url: 'https://dashboard.apps.palomapos.com/reports/taxes',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    path: '/transactions',
    url: 'https://dashboard.apps.palomapos.com/transactions',
  },
  {
    id: 'employee-removals-report',
    label: 'Employee Removals',
    path: '/reports/employee-removals',
    url: 'https://dashboard.apps.palomapos.com/reports/employee-removals',
  },
  {
    id: 'sales-profit-report',
    label: 'Sales Profit',
    path: '/reports/sales-profit',
    url: 'https://dashboard.apps.palomapos.com/reports/sales-profit',
  },
  {
    id: 'dual-pricing-report',
    label: 'Dual Pricing',
    path: '/reports/dual-pricing',
    url: 'https://dashboard.apps.palomapos.com/reports/dual-pricing',
  },
  {
    id: 'customers-report',
    label: 'Customers',
    path: '/reports/customers',
    url: 'https://dashboard.apps.palomapos.com/reports/customers',
  },
  {
    id: 'sales-report',
    label: 'Sales Report',
    path: '/reports/sales',
    url: 'https://dashboard.apps.palomapos.com/reports/sales',
  },
]

export const getSubRouteByPath = (path: string): AppSubItem | undefined => {
  return dashboardSubRoutes.find((route) => route.path === path)
}

export const getSubRouteById = (id: string): AppSubItem | undefined => {
  return dashboardSubRoutes.find((route) => route.id === id)
}



