import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import FrontPage from './pages/FrontPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<FrontPage/>}></Route>
      <Route path='/home' element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }></Route>
      <Route path='/profile' element= {
        <ProtectedRoute>
          <ProfilePage></ProfilePage>
        </ProtectedRoute>
      }></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
    </Routes>
  )
}

export default App