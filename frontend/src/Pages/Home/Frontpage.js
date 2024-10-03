import React, { useState } from 'react';
import Login from "../Components/Authentication/Login";
import Register from "../Auth/Register";
import { useNavigate } from 'react-router-dom';
const Frontpage = () => {

    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));


        if (userInfo) navigate("/home");
        // This dependency array ensures the effect runs only when the `navigate` function changes,
        // which should only happen when the component mounts, thus it behaves like `componentDidMount`.
    }, [navigate]);
    return (
        <div className="container">
            <div className="box header">
                <h1 style={{ textAlign: 'center' }}>Chatify</h1>
            </div>
            <div className="box content">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`tab ${activeTab === 'Register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Register')}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'login' && <Login />}
                    {activeTab === 'Register' && <Register />}
                </div>
            </div>
            <footer className="footer">
                <p>©Abhibhi</p>
            </footer>
        </div>
    )
}

export default Frontpage
