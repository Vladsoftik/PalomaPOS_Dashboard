import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from '../components/common/ProtectedRoute'
import AppProviders from '../components/providers/AppProviders'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AppProviders>
        <Login />
      </AppProviders>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/orders',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/items',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/employees',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/taxes',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/transactions',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/employee-removals',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/sales-profit',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/dual-pricing',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/customers',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/reports/sales',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
])

