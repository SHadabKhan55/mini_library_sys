import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'
const ProtectRoute = ({ allowedRole, children }) => {
    const { user, loading } = useAuth()
    
    if (loading) {
        return <h2>authentication checking...</h2>
    }
    if (!user) {
        console.log("user not found")
        return <Navigate to="/login" replace />
    }
    
    if (!allowedRole.includes(user.role)) {

        return <Navigate to="/login" replace />
    }


    return children
}

export default ProtectRoute
