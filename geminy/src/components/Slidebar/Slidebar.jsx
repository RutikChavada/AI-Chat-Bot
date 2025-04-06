import React, { useContext, useState } from "react";
import './Slidebar.css'
import { assets } from "../../Assests/assets";
import { Context } from "../../contex/contexz";
import { Link, redirect } from "react-router-dom";

const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const {onSent,prevPrompts,Newchat,setRecentPrompt} = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
                <div className="new-chat" onClick={Newchat}>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended
                    ? <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item,index) => {
                            return(
                                <div onClick={() => {loadPrompt(item)}} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0,18)}...</p>
                            </div>
                            )
                        })}
                       
                    </div>
                    : null
                }
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                <Link to="help">
                    <img src={assets.question_icon} alt="" />
                    {extended?<p>Help</p>:null}</Link>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended?<p>Activity</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended?<p>Settings</p>:null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar