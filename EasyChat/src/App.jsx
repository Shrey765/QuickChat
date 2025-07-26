import { useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/profile',
      element: <ProfilePage />
    }
  ])

  return (
    <div className="bg-[url('./assets/bgImage.svg')] bg-contain text-white">
      <RouterProvider router={router} />
    </div>
)

}

export default App
