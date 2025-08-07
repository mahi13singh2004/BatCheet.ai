import React from 'react'
import { useAuthStore } from '../store/auth.store.js'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user, checkAuthLoading } = useAuthStore()

  // Don't show anything while checkAuth is loading - TopSpinner handles this
  if (checkAuthLoading) {
    return null
  }

  if (user) {
    return children
  }
  return <Navigate to="/login" />
}

export default ProtectedRoute