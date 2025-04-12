import React, { useEffect, useState } from 'react';
import axios from 'axios';


const MechanicsPanel = () => {
    const [mechanic, setMechanic] = useState(null);
    const [availableTools, setAvailableTools] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const mechanicId = user?.id;

    const fetchDashboard = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/tools/dashboard/${mechanicId}`);
            setMechanic(res.data);
        } catch (err) {
            console.error("Error loading dashboard:", err);
        }
    };

    const fetchAvailableTools = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/tools/available-tools`);
            setAvailableTools(res.data);
        } catch (err) {
            console.error("Error loading tools:", err);
        }
    };

    const handleSelectTool = async (toolId) => {
        try {
            await axios.post(`http://localhost:5000/api/tools/select-tool`, { mechanicId, toolId });
            await fetchDashboard();
            await fetchAvailableTools();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to select tool");
        }
    };

    const handleReturnTool = async (toolId) => {
        try {
            await axios.post(`http://localhost:5000/api/tools/return-tool`, { mechanicId, toolId });
            await fetchDashboard();
            await fetchAvailableTools();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to return tool");
        }
    };

    useEffect(() => {
        if (mechanicId) {
            const load = async () => {
                setLoading(true);
                await fetchDashboard();
                await fetchAvailableTools();
                setLoading(false);
            };
            load();
        }
    }, [mechanicId]);

    if (!mechanicId) return <p>Please login as a mechanic.</p>;
    if (loading) return <p>Loading dashboard...</p>;

    return (

        <>
            <h2 className='headinf'>Welcome, {mechanic?.name}</h2>

            <div className="mechanic-panel-container">


                <div className="table-wrapper">
                    {/* Selected Tools */}
                    <div className="table-section">
                        <h3>Selected Tools</h3>
                        <table className="tool-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mechanic?.selectedTools?.length > 0 ? (
                                    mechanic.selectedTools.map(tool => (
                                        <tr key={tool._id}>
                                            <td>{tool.name}</td>
                                            <td>{tool.category}</td>
                                            <td>
                                                <img
                                                    src={tool.image}
                                                    alt={tool.name}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                />
                                            </td>
                                            <td>
                                                <button className="btn red" onClick={() => handleReturnTool(tool._id)}>Return</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No tools selected.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Available Tools */}
                    <div className="table-section">
                        <h3>Available Tools</h3>
                        <table className="tool-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Qty</th>
                                    <th>image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availableTools.length > 0 ? (
                                    availableTools.map(tool => (
                                        <tr key={tool._id}>
                                            <td>{tool.name}</td>
                                            <td>{tool.category}</td>
                                            <td>{tool.quantity}</td>
                                            <td>
                                                <img
                                                    src={tool.image}
                                                    alt={tool.name}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                />
                                            </td>
                                            <td>
                                                <button className="btn green" onClick={() => handleSelectTool(tool._id)}>Select</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No tools available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MechanicsPanel;
