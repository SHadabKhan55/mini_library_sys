import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'
const PublicRoute = ({children}) => {
    const {user,loading} = useAuth()
    if(loading){
        return <h2>authentication checking...</h2>
    }
    if(user){
        if(user.role === "user"){
          return  <Navigate to="/home" replace/>
        }
        
        
    }

  return children
}

export default PublicRoute
