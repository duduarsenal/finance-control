import { AuthProvider } from '@context'
import { DashboardPage, AuthPage, NotFoundPage } from '@pages'
import '@style'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider> <Layout /> </AuthProvider> ,
    errorElement: <Layout error={<NotFoundPage />} />,
    children: [
      {
        path: "/",
        element: <DashboardPage />
      },
      {
        path: "/auth",
        element: <AuthPage />
      },
      {
        path: "/dashboard",
        element: <DashboardPage />
      },
      {
        path: "/home",
        element: <DashboardPage />
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
