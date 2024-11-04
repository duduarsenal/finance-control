import { AuthProvider } from '@context'
import { Dashboard, LoginRegister, NotFound } from '@pages'
import '@style'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider> <Layout /> </AuthProvider> ,
    errorElement: <Layout error={<NotFound />} />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/login",
        element: <LoginRegister />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/home",
        element: <Dashboard />
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
