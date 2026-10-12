import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'
const PublicRoute = ({children}) => {
    const {user,loading} = useAuth()
    if(loading){
        return <h2>authentication checking...</h2>
    }
    if(user){
        if(user.role === "student"){
          return  <Navigate to="/student-dashboard" replace/>
        }
        else if(user.role === "librarian"){
          return  <Navigate to="/lib-dashboard" replace/>
        }
        
    }

  return children
}

export default PublicRoute
