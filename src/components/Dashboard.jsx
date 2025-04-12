import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPanal from "./AdminPanal";
const Dashboard = () => {

    const navigate = useNavigate();

    return (
        <>
            <AdminPanal />

        </>
    );
};

export default Dashboard;
