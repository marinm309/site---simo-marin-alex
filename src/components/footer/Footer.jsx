import { Link } from "react-router-dom"

function Footer(){
    return(
        <footer>
            <ul className='footer-container'>
                <li><img src="/logo-placeholder.jpg" className='image' /></li>
                <hr className='hr'></hr>
                <li><Link to={'/privacy-policy'}>Privacy Policy</Link> | <Link to={'/terms-of-service'}>Terms of Service</Link></li>
                <li>Copyright © 2024 Logo</li>
            </ul>
        </footer>
    )
}

export default Footer