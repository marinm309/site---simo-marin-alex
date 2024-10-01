import { Link } from "react-router-dom"

function Header(){
    return(
        <nav>

            <div className="logo-container"><Link to={'/'}><img src="logo.png" /></Link></div>

            <ul className="nav-items-container">
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>Home</Link></li>
                <li><button><b>Join</b></button></li>
            </ul>
            
        </nav>
    )
}

export default Header