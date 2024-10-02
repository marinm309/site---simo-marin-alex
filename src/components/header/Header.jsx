import { useState } from "react"
import { Link } from "react-router-dom"
import Login from "../login/Login"
import Register from "../register/Register"

function Header(){

    const [ showLogin, setShowLogin ] = useState(false)
    const [ showRegister, setShowRegister ] = useState(false)

    function onLoginClick(){
        setShowLogin((prevState) => !prevState)
    }

    function onRegisterClick(){
        setShowRegister((prevState) => !prevState)
    }

    return(
        <div>
            <nav>

                <div className="logo-container"><Link to={'/'}><img src="logo.png" /></Link></div>

                <ul className="nav-items-container">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><button className="login-btn" onClick={onLoginClick}>Вход</button></li>
                    <li><button className="register-btn" onClick={onRegisterClick}><b>Регистрация</b></button></li>
                </ul>
                
            </nav>
            {showLogin && <Login onLoginClick={onLoginClick} />}
            {showRegister && <Register onRegisterClick={onRegisterClick} />}
        </div>
    )
}

export default Header