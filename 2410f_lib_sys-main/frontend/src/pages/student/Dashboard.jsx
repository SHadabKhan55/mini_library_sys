import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashbaord = () => {
    const navigate = useNavigate()
    async function handleLogout() {
        try {
            const res = await axios.post("http://localhost:7000/api/auth/logout", {},
                {
                    withCredentials: true
                }
            )
            console.log(res.data)
            if (res.data.success) {
                navigate("/login")
            }
            console.log(res)
        } catch (error) {
            console.log(error?.response?.data?.message)
            alert(error?.response?.data?.message)
        }
    }
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <h1>welcome Student</h1>
        </div>
    )
}

export default Dashbaord
