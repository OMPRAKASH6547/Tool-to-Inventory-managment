import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateTool = () => {
    const { id } = useParams();
    const [toolData, setToolData] = useState({
        name: '',
        category: '',
        image: '',
        quantity: 0,
    });
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTool = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tools/get/${id}`);
                const { name, category, image, quantity } = response.data;
                setToolData({ name, category, image, quantity });
            } catch (error) {
                console.error('Failed to fetch tool data:', error);
            }
        };

        fetchTool();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setToolData((prevData) => ({
            ...prevData,
            [name]: name === 'quantity' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/tools/update/${id}`, toolData);
            navigate('/addTools')
        } catch (error) {
            console.error('Failed to update tool:', error);
            alert('Failed to update tool');
        }
    };

    return (
        <form className="tool-form" onSubmit={handleSubmit}>
            <h2>Update Tool Inventory</h2>
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
            <button type="submit">Update Tool</button>
        </form>
    );
};

export default UpdateTool;
