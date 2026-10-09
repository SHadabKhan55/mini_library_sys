import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.post(
                "http://localhost:7000/api/auth/login",
                user,
                {withCredentials:true}
            );
            let loginUser = res.data.user
            console.log(loginUser)
            if (loginUser.role === "librarian") {
                
                navigate("/lib-dashboard");
            }
            else if (loginUser.role === "student") {
                
                navigate("/student-dashboard");
            }
            
            
            
            
        } catch (error) {
            
            console.log(error);
            
            if (error.response) {
                alert(error?.response?.data?.message);
            } else {
                alert("Server error. Please try again.");
            }
        }
        
        finally{
            setLoading(false)
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>

                <label>Email</label>
                <br />

                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />

                <br />

                <label>Password</label>
                <br />

                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />

                <br />

                <button type="submit">
                    {loading ? "...Loading":"Login"}
                </button>

            </form>

        </div>
    );
};

export default Login;
