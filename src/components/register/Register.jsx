import '/src/styles/login-register.css'
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { ClientContext } from '../../context/clientContext.js'

function Register(props){

    function onRegister(e){
        e.preventDefault()

        if(credentials.password != rePassword){
            setErr(true)
            setErrMessage("Password doesn't match")
            return
        }

        const formData = new FormData();
        for (let key in credentials) {
            formData.append(key, credentials[key]);
        }
        client.post('/users/register', formData)
        .then(function(res){
            setCurrentUser(true)
            props.onRegisterClick()
        })
        .catch(function(error){
            console.log(error)
            setErr(true)
            setErrMessage(error.response.data.error)
        })
    }

    function handleChange(e){
        setCredentials((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    function rePasswordChange(e){
        setRePassword(e.target.value)
    }

    const [ credentials, setCredentials ] = useState({
        email: '',
        name: '',
        password: '',
    })

    const client = useContext(ClientContext).client
    const setCurrentUser = useContext(ClientContext).setCurrentUser
    const [ rePassword, setRePassword ] = useState('')
    const [ err, setErr ] = useState(false)
    const [ errMessage, setErrMessage ] = useState('')

    return(
        <div className="login-register-container">
            <div className="shadow-bg" onClick={props.onRegisterClick}></div>
            <div className="login-register-box register-box">
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
                        <button className="login-register-back-btn" onClick={props.onRegisterClick}><i className="fa-solid fa-arrow-left"></i><p>Назад</p></button>
                    </div>
                    <div className="login-register-main-method">
                        <button><img src="/facebook.jpg" />Влез чрез Facebook</button>
                        <button><img src="/google.jpg" />Влез чрез Google</button>
                    </div>
                    <div className="login-register-method-separator">
                        <p>или</p>
                    </div>
                    <div className="login-register-switch">
                        <button onClick={props.onLoginClick}>Вход</button>
                        <button>Регистрация</button>
                    </div>
                    <form onSubmit={onRegister}>
                        <label htmlFor="name">Име</label>
                        <input type="теьт" placeholder='Иван Иванов' autoComplete="name" name="name" onChange={handleChange} value={credentials.name} id="name"></input>
                        <label htmlFor="email">Имейл</label>
                        <input type="email" placeholder='emailname@idk.com' autoComplete="email" name="email" onChange={handleChange} value={credentials.email} id="email"></input>
                        <label htmlFor="password">Парола</label>
                        <input type="password" placeholder='********' autoComplete="new-password" name="password" onChange={handleChange} value={credentials.password} id="password"></input>
                        <label htmlFor="confirmPassword">Парола</label>
                        <input type="password" placeholder='********' autoComplete="new-password" name="confirmPassword" onChange={rePasswordChange} value={rePassword} id="confirmPassword"></input>
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

export default Register