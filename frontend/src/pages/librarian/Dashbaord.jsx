import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashbaord = () => {
const navigate = useNavigate();
const [students, setStudents] = useState([]);


async function fetchPendingStudents() {
    try {
        const res = await axios.get(
            "http://localhost:7000/api/auth/pending-students",
            { withCredentials: true }
        );

        if (res.data.success) {
            setStudents(res.data.students);
        }
    } catch (error) {
        console.log(
            error?.response?.data?.message || error.message
        );
    }
}

async function handleLogout() {
    try {
        const res = await axios.post(
            "http://localhost:7000/api/auth/logout",
            {},
            { withCredentials: true }
        );

        if (res.data.success) {
            navigate("/login");
        }
    } catch (error) {
        console.log(
            error?.response?.data?.message || error.message
        );
    }
}

useEffect(() => {
    fetchPendingStudents();
}, []);

return (
    <div>
        <button onClick={handleLogout}>Logout</button>

        <h1>Welcome Admin</h1>
        <h2>Pending Students</h2>

        {students.length === 0 ? (
            <p>No pending students found.</p>
        ) : (
            students.map((student) => (
                <div key={student._id}>
                    <p>Name: {student.name}</p>
                    <p>Email: {student.email}</p>
                    <p>Status: Pending Approval</p>
                    <hr />
                </div>
            ))
        )}
    </div>
);

};

export default Dashbaord;
