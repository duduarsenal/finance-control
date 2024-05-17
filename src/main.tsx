import { AuthProvider } from '@context'
import { Home, Login, NotFound } from '@pages'
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
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/dashboard",
        element: <Home />
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
