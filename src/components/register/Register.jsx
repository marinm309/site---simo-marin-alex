import { Link } from "react-router-dom"

function Register(props){
    return(
        <div className="login-container">
            <div className="shadow-bg" onClick={props.onRegisterClick}></div>
            <div className="login-box">
                <div className="login-box-left">
                    <h3 className="login-box-left-header">Една крачка по-близо до <span className="light-text">успехът</span></h3>
                    <ul>
                        <li><i className="fa-solid fa-check"></i>Неограничен брой обяви</li>
                        <li><i className="fa-solid fa-check"></i>Качествени услуги</li>
                        <li><i className="fa-solid fa-check"></i>Оптимизирана платформа</li>
                    </ul>
                </div>
                <div className="login-box-right">
                    <div>
                        <button className="login-back-btn" onClick={props.onRegisterClick}><i className="fa-solid fa-arrow-left"></i><p>Назад</p></button>
                    </div>
                    <form>
                        <label>Име</label>
                        <input type="теьт" placeholder='Иван Иванов' autoComplete="name" name="name"></input>
                        <label>Имейл</label>
                        <input type="email" placeholder='emailname@idk.com' autoComplete="email" name="email"></input>
                        <label>Парола</label>
                        <input type="password" placeholder='********' autoComplete="new-password" name="password"></input>
                        <label>Парола</label>
                        <input type="password" placeholder='********' autoComplete="new-password" name="confirmPassword"></input>
                        <button className="login-submit-btn"></button>
                    </form>
                    <div>
                        <p className="login-bottom-text">Влизайки в профила си приемам <Link>общите условия</Link> на сайта.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register