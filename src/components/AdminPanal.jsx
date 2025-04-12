import React from "react";
import { useNavigate } from "react-router-dom";
export default function AdminPanal() {

    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <h2>Welcome to AdminPanal</h2>

            <div className="dashboard-cards">
                <div className="card">
                    <h3>Tools Inventory</h3>
                    <p>View all available tools and details.</p>
                    <button onClick={() => navigate("/addTools")}>View Tools</button>
                </div>

                <div className="card">
                    <h3>Issue Tool</h3>
                    <p>Request a tool for maintenance work.</p>
                    <button onClick={() => alert("Navigate to Issue Tool")}>Issue Tool</button>
                </div>

                <div className="card">
                    <h3>Return Tool</h3>
                    <p>Mark tools as returned after work.</p>
                    <button onClick={() => alert("Navigate to Return Tool")}>Return Tool</button>
                </div>
            </div>


        </div>
    );
};

