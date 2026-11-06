import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentLayout = () => {
    return (
        <div>
            {/* Student Sidebar / Navbar yahan hoga */}

            <Outlet />
        </div>
    )
}

export default StudentLayout