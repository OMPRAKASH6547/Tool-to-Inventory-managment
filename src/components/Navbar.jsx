import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
};

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const userData = JSON.parse(storedUser);
            console.log("User Data:", userData);

            if (userData?.token) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        } else {
            setIsLogin(false);
        }
    }, []);

    return (
        <>
            <nav style={{ padding: '10px' }}>

                {isLogin ? <Link onClick={() => { handleLogout() }}>logOut</Link> :


                    <Link to="/" style={{ marginRight: '10px' }}>Login</Link>

                }
                <Link to="/register">Register</Link>

                {/* <button className="logout-btn" onClick={handleLogout}>Logout</button> */}
            </nav>

        </>
    )
}



export default Navbar;
