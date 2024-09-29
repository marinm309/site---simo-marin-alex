import { Link } from "react-router-dom"

function HomeSection1Main(){
    return(
        <section className="home-section1main">

            <div className="home-section1main-container">

                <div className="home-section1main-inputs">

                    <div className="search-bar">

                        <input
                            type="text"
                            placeholder="Какво търсиш?"
                            className="search-input"
                        />

                        <button className="search-button">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <div className="city-dropdown">

                        <select
                            className="dropdown-input"
                        >
                            <option value="" disabled>
                            Град?
                            </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>

                        <button className="dropdown-button">
                            <i class="fa-solid fa-location-dot"></i>
                        </button>

                    </div>

                </div>

                <div className="home-section1main-categories">

                    <h2 className="home-section1main-categories-header"><span className="home-section1main-whitetext">Главни</span> <span className="home-section1-light">категории</span></h2>

                    <ul>

                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <img src="" />
                                <p>категория<br/>категория</p>
                            </Link>
                        </li>

                    </ul>

                </div>

            </div>

        </section>
    )
}

export default HomeSection1Main