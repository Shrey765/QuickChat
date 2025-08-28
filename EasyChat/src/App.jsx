import { useState, useContext } from 'react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

function App() {
  const {authUser} = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: '/',
      element: authUser ? <HomePage /> : <Navigate to="/login" />
    },
    {
      path: '/login',
      element: !authUser ? <LoginPage /> : <Navigate to='/' />
    },
    {
      path: '/profile',
      element: authUser ? <ProfilePage /> : <Navigate to='/login' />
    }
  ])

  return (
    <div className="min-h-screen w-full bg-[url('/bgImage.svg')] bg-cover text-white">
      <Toaster />
      <RouterProvider router={router} />
    </div>
)

}

export default App
