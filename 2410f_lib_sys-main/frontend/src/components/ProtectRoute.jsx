import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'
const ProtectRoute = ({ allowedRole, children }) => {
    const { user, loading } = useAuth()
    // console.log("protect",user)
    if (loading) {
        return <h2>authentication checking...</h2>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (!allowedRole.includes(user.role)) {
        return <Navigate to="/login" replace />
    }

    if (user.role === "student" && !user.isApproved) {
        return <Navigate to="/pending" replace />;
    }

    return children
}

export default ProtectRoute
