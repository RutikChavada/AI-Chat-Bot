import React, { useContext, useEffect, useState } from "react";
import './Main.css';
import { assets } from "../../Assests/assets";
import { Context } from "../../contex/contexz";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user data directly from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));  // Parse stored user data
        }
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user"); // Remove user data from localStorage
        setUser(null);
        navigate("/");
    };

    const cardclick = (text) => {
        console.log("Card clicked with text:", text);
        setInput(text);
        onSent(text);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSent(input);
        }
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Greny</p>
                <div className="button">
                    {user ? (
                        <div className="user-info">
                            <p>Welcome, {user.fname}</p>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </div>
                    ) : (
                        <>
                            <div className="login"><Link to="/login">Login</Link></div>
                            <div className="signup"><Link to="/registration">Sign up</Link></div>
                        </>
                    )}
                </div>
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, {user?.fname || "Guest"}</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => cardclick("Suggest beautiful places to see on a mountain road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => cardclick("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => cardclick("Brainstorm team bonding activities for our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => cardclick("Improve the readability of the following code")}>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="searchbox">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                            onKeyPress={handleKeyPress}
                        />
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input ? <img onClick={() => onSent(input)} src={assets.send_icon} alt="" /> : null}
                    </div>
                    <p className="bottom-info">
                        Greny may display info, including about people, so double-check its responses. Your privacy and Greny Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
