import React from 'react'
import logo from './logoHead.png'
import './LogoHeader.css'

export const LogoHeader = () => {
    return (
        <div className="LogoHeader">
            <img src={logo} className="App-logo" alt="Chat logo"/>
        </div>
    );   
}