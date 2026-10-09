import React from "react";
import { useNavigate } from "react-router-dom";

const Pending = () => {


const navigate = useNavigate();

return (
    <div>
        <h1>Approval Pending</h1>

        <p>
            Your account is waiting for librarian approval.
        </p>

        <p>
            Please wait until the librarian approves your account.
        </p>

        <button onClick={() => navigate("/login")}>
            Back to Login
        </button>
    </div>
);


};

export default Pending;
