import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)    
    const [loading,setLoading] = useState(true)    
    
    async function checkLogin() {
        try {
            const res = await axios.get("http://localhost:7000/api/auth/check-login",{
                withCredentials:true
            })
            
            if(res.data.success){

                setUser(res.data.user)
                
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
            alert(error?.response?.data?.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        checkLogin()
    },[])
  return (
    <div>
      <AuthContext.Provider 
      value={{
        user,loading
      }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
