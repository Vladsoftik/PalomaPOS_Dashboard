import { createBrowserRouter, Navigate } from 'react-router-dom'
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
    path: '/',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Navigate to="/dashboard" replace />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
  {
    path: '/:appId',
    element: (
      <AppProviders>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppProviders>
    ),
  },
])

