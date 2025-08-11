import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import AuthProvider from '../context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import ChatContextProvider from '../context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ChatContextProvider>
          <App />
      </ChatContextProvider>
    </AuthProvider>
  </StrictMode>,
)
