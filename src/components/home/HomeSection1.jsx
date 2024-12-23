import '/src/styles/home-section1.css'
import { Link } from "react-router-dom"

function HomeSection1(){
    return(
        <section className="home-section1 section">

            <div className="home-section1-top-container">

                <div className="home-section1-top-header-container">
                    <p className="home-section1-top-header">Свържи се лесно и бързо <br/>с <span className="light-text">правилния партньор</span><span className="home-section1-white-text">!</span></p>
                </div>

                <div className="home-section1-btn-container">

                    <div className="home-section1-top-subheader">

                        <div>
                            <span className="home-section1-btn-header">Търсиш</span>
                            <button></button>
                        </div>

                        <div>
                            <span className="home-section1-between-headers">или</span>
                        </div>

                        <div>
                            <span className="home-section1-btn-header">Предлагаш</span>
                            <button></button>
                        </div>

                    </div>

                </div>

            </div>

            <ul className="home-section1-middle-container">
                <li>
                    <Link className="home-section1-middle-single-item">
                        <img src="p.png" />
                        <p>Програмиране</p>
                    </Link>
                </li>
                <li>
                    <Link className="home-section1-middle-single-item">
                        <img src="p.png" />
                        <p>Програмиране</p>
                    </Link>
                </li>
                <li>
                    <Link className="home-section1-middle-single-item">
                        <img src="p.png" />
                        <p>Програмиране</p>
                    </Link>
                </li>
                <li>
                    <Link className="home-section1-middle-single-item">
                        <img src="p.png" />
                        <p>Програмиране</p>
                    </Link>
                </li>
                <li>
                    <Link className="home-section1-middle-single-item">
                        <img src="p.png" />
                        <p>Програмиране</p>
                    </Link>
                </li>
                <li>
                    <Link className="home-section1-middle-single-item">
                        <img src="p.png" />
                        <p>Програмиране</p>
                    </Link>
                </li>
            </ul>

        </section>
    )
}

export default HomeSection1