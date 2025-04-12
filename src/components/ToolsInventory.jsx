import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ToolsInventory = () => {
    const [tools, setTools] = useState([]);
    const [toolData, setToolData] = useState({
        name: "",
        category: "",
        image: "",
        quantity: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setToolData({ ...toolData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/tools/add', toolData);
            console.log(res.data);
            setToolData({ name: "", category: "", image: "", quantity: "" });

            // Fetch updated list
            const response = await axios.get('http://localhost:5000/api/tools/');
            setTools(response.data);
        } catch (error) {
            console.error("Add tool failed:", error);
        }
    };

    const deleteTool = async (toolId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tools/delete/${toolId}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Tool deleted:", result);
                setTools(prev => prev.filter(tool => tool._id !== toolId));
            } else {
                alert(result.message || 'Error deleting tool');
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/tools/')
            .then(res => setTools(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h2 className="headinf">Admin  DashBoard</h2>
            <div className="inventory-container">

                {/* Left Form */}
                <form className="tool-form" onSubmit={handleSubmit}>
                    <h2>Add Tool to Inventory</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Tool Title"
                        value={toolData.name}
                        onChange={handleChange}
                    />
                    <select name="category" value={toolData.category} onChange={handleChange}>
                        <option value="">Select Tool Category</option>
                        <option value="Screw Driver">Screw Driver</option>
                        <option value="Wrench">Wrench</option>
                        <option value="Plier">Plier</option>
                        <option value="Hammer">Hammer</option>
                    </select>
                    <input
                        type="text"
                        name="image"
                        placeholder="Tool Image URL"
                        value={toolData.image}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Inventory Quantity"
                        value={toolData.quantity}
                        onChange={handleChange}
                    />
                    <button type="submit">Add Tool</button>
                </form>

                {/* Right Display */}
                <div className="tool-list">
                    {tools.length === 0 ? (
                        <p>No tools added yet.</p>
                    ) : (
                        <table className="tool-table">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Tool Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Image</th>
                                    <th>issued</th>
                                    <th>return</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tools.map((tool, index) => (
                                    <tr key={tool._id}>
                                        <td>{index + 1}</td>
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
                                        <td>{tool.issuedCount}</td>
                                        <td>{tool.returnCount}</td>
                                        <td>
                                            <button onClick={() => deleteTool(tool._id)}>Delete</button>
                                            <button style={{ backgroundColor: "yellow", marginLeft: '5px', color: "black" }} onClick={() => navigate(`/update/${tool._id}`)}>Update</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div >

        </>
    );
};

export default ToolsInventory;
