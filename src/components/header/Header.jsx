import { useState } from "react"
import { Link } from "react-router-dom"
import Login from "../login/Login"
import Register from "../register/Register"
import ProfileDropdown from "../profile/ProfileDropdown"
import { ClientContext } from "../../context/clientContext"
import { useContext } from 'react'

function Header(){

    const [ showLogin, setShowLogin ] = useState(false)
    const [ showRegister, setShowRegister ] = useState(false)
    const [ showProfileDropdown, setShowProfileDropdown ] = useState(false)

    const profileInfo = useContext(ClientContext).profileInfo

    function onLoginClick(){
        showRegister ? setShowRegister((prevState) => !prevState) : ''
        setShowLogin((prevState) => !prevState)
    }

    function onRegisterClick(){
        showLogin ? setShowLogin((prevState) => !prevState) : ''
        setShowRegister((prevState) => !prevState)
    }

    function onProfileClick(){
        setShowProfileDropdown((prevState) => !prevState)
    }

    return(
        <div className="nav">
            <nav className="navigation-container">

                <div className="logo-container"><Link to={'/'}><img src="/logo.png" /></Link></div>

                <ul className="nav-items-container">
                    <li><Link to={profileInfo ? '/add-item' : '#'} className="new-btn" onClick={profileInfo ? '' : onLoginClick}><b>Добави обява</b></Link></li>
                    <li><Link to={'/'}><i className="fa-regular fa-message"></i> Чатове</Link></li>
                    <li><Link to={'/'}><i className="fa-regular fa-heart"></i></Link></li>
                    <li className="profile-btn-container">
                        <button id="pfp-btn" className="login-register-btn" onClick={profileInfo ? onProfileClick : onLoginClick}><i className="fa-solid fa-user"></i> Моят профил</button>
                        {showProfileDropdown && <ProfileDropdown onProfileClick={onProfileClick} showProfileDropdown={showProfileDropdown} />}
                    </li>
                </ul>
                
            </nav>
            {showLogin && <Login onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />}
            {showRegister && <Register onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />}
        </div>
    )
}

export default Header