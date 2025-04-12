import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(formData.password)) {
            newErrors.password =
                "Password must be alphanumeric and include a special character.";
        }


        return newErrors;
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await axios.post("http://localhost:5000/api/auth/login", formData);
                console.log(res.data)
                setMessage(res.data);
                localStorage.setItem("user", JSON.stringify({
                    token: res.data.token,
                    name: res.data.user.name,
                    email: res.data.user.email,
                    id: res.data.user.id,
                    role: res.data.user.role

                }));

                if (res.data.user.role == "admin") {
                    navigate('/addTools')
                } else {
                    navigate('/userDashboard')
                }
                window.location.reload();
            } catch (err) {
                setMessage(err.response?.data?.error || "Login failed");
            }
        } else {
            setErrors(validationErrors);

        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
                {errors.email && <p className="error">{errors.email}</p>}

                <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
                {errors.password && <p className="error">{errors.password}</p>}

                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
