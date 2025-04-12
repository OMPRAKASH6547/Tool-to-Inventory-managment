import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        level: "",
        picture: null,
    });

    const [message, setMessage] = useState("");

    const levels = ["Expert", "Medium", "New Recruit", "Trainee"];
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";

        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile number must be exactly 10 digits.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(formData.password)) {
            newErrors.password =
                "Password must be alphanumeric and include a special character.";
        }

        if (!formData.level) {
            newErrors.level = "Please select mechanic level.";
        }

        return newErrors;
    };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const form = new FormData();
            for (let key in formData) {
                form.append(key, formData[key]);
            }

            try {
                const res = await axios.post("http://localhost:5000/api/auth/register", formData);
                setMessage(res.data.message);
                navigate('/');
            } catch (err) {
                setMessage(err.response?.data?.error || "Something went wrong");
            }
        } else {
            setErrors(validationErrors);
        }
    };


    return (
        <div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Mechanic Registration</h2>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} /><br />
                {errors.name && <p className="error">{errors.name}</p>}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
                {errors.email && <p className="error">{errors.email}</p>}
                <input type="text" name="mobile" placeholder="Mobile No" maxLength="10" onChange={handleChange} /><br />
                {errors.mobile && <p className="error">{errors.mobile}</p>}
                <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
                {errors.password && <p className="error">{errors.password}</p>}
                <select name="level" onChange={handleChange} >
                    <option value="">Select Level</option>
                    {levels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select><br />
                {errors.level && <p className="error">{errors.level}</p>}
                <input type="file" name="picture" onChange={handleChange} accept="image/*" /><br />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;
