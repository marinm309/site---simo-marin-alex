import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { ClientContext } from '../../context/clientContext.js';

function Login(props){

    function onLogin(e){
        e.preventDefault()
        client.post('/users/login', credentials)
        .then(function(res){
            setCurrentUser(true)
            props.onLoginClick()
        })
        .catch(function(error){
            setErr(true)
        })
    }

    function handleChange(e){
        setCredentials((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const [ credentials, setCredentials ] = useState({
        email: '',
        password: '',
    })

    const client = useContext(ClientContext).client
    const setCurrentUser = useContext(ClientContext).setCurrentUser
    const [ err, setErr ] = useState(false)

    return(
        <div className="login-register-container">
            <div className="shadow-bg" onClick={props.onLoginClick}></div>
            <div className="login-register-box login-box">
                <div className="login-register-box-left">
                    <h3 className="login-register-box-left-header">Една крачка по-близо до <span className="light-text">успехът</span></h3>
                    <ul>
                        <li><i className="fa-solid fa-check"></i>Неограничен брой обяви</li>
                        <li><i className="fa-solid fa-check"></i>Качествени услуги</li>
                        <li><i className="fa-solid fa-check"></i>Оптимизирана платформа</li>
                    </ul>
                </div>
                <div className="login-register-box-right">
                    <div>
                        <button className="login-register-back-btn" onClick={props.onLoginClick}><i className="fa-solid fa-arrow-left"></i><p>Назад</p></button>
                    </div>
                    <div className="login-register-main-method">
                        <button><img src="facebook.jpg" />Влез чрез Facebook</button>
                        <button><img src="google.jpg" />Влез чрез Google</button>
                    </div>
                    <div className="login-register-method-separator">
                        <p>или</p>
                    </div>
                    <div className="login-register-switch">
                        <button>Вход</button>
                        <button onClick={props.onRegisterClick}>Регистрация</button>
                    </div>
                    <form onSubmit={onLogin}>
                        <label>Имейл</label>
                        <input type="email" placeholder='emailname@idk.com' autoComplete="email" name="email" value={credentials.email} onChange={handleChange}></input>
                        <label>Парола</label>
                        <input type="password" placeholder='********' autoComplete="current-password" name="password" value={credentials.password} onChange={handleChange}></input>
                        <button className="login-register-submit-btn"></button>
                    </form>
                    <div>
                        <p className="login-register-bottom-text">Влизайки в профила си приемам <Link>общите условия</Link> на сайта.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login