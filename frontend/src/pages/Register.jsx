import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    function handleChange(e) {
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value
        })

    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:7000/api/auth/register",user)
            navigate("/login")
        } catch (error) {
            console.log(error?.response?.data?.message)
            alert(error?.response?.data?.message)
        }
        
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Name</label><br />
            <input type="text" name="name" id="" onChange={handleChange}/><br />
            <label htmlFor="">Email</label><br />
            <input type="email" name="email" id="" onChange={handleChange}/><br />
            <label htmlFor="">Password</label><br />
            <input type="password" name="password" id="" onChange={handleChange}/><br />
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register