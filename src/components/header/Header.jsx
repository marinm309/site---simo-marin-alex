import { useState } from "react"
import { Link } from "react-router-dom"
import Login from "../login/Login"
import Register from "../register/Register"
import ProfileDropdown from "../profile/ProfileDropdown"

function Header(){

    const [ showLogin, setShowLogin ] = useState(false)
    const [ showRegister, setShowRegister ] = useState(false)
    const [ showProfileDropdown, setShowProfileDropdown ] = useState(false)

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
        <div>
            <nav>

                <div className="logo-container"><Link to={'/'}><img src="logo.png" /></Link></div>

                <ul className="nav-items-container">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/'}>Home</Link></li>
                    <li className="profile-btn-container">
                        <button className="profile-btn" onClick={onProfileClick}><img src="profile_pic_default.png" id="pfp-img" /></button>
                        {showProfileDropdown && <ProfileDropdown onProfileClick={onProfileClick} showProfileDropdown={showProfileDropdown} />}
                    </li>
                    <li><button className="login-register-btn" onClick={onLoginClick}><i className="fa-solid fa-user"></i> Моят профил</button></li>
                    <li><button className="new-btn"><b>Добави обява</b></button></li>
                </ul>
                
            </nav>
            {showLogin && <Login onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />}
            {showRegister && <Register onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />}
        </div>
    )
}

export default Header