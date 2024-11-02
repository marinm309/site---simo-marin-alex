import '/src/styles/footer.css'
import { Link } from "react-router-dom"

function Footer(){
    return(
        <div className="footer">
            <footer>
                <div className="footer-logo">
                    <img src="/logo.png" />
                    <p>Huinqkis Bulgarian Ltd. 2024</p>
                </div>
                <div className="footer-socials">
                    <Link href="/"><i className="fa-brands fa-tiktok"></i></Link>
                    <Link href="/"><i className="fa-brands fa-instagram"></i></Link>
                </div>
            </footer>
        </div>
    )
}

export default Footer