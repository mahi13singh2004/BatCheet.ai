import React from 'react'
import { useAuthStore } from '../store/auth.store.js'
import { Navigate } from 'react-router-dom'
import Spinner from './Spinner.jsx'

const ProtectedRoute = ({children}) => {
  const {user,loading}=useAuthStore()
  if(loading){
    return <Spinner/>
  }
  if(user){
    return children
  }
  return <Navigate to="/login"/>
}

export default ProtectedRoute