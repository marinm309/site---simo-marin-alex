import Header from '../header/Header.jsx'
import Footer from '../footer/Footer.jsx'

function HomePage(){
    return(
        <div className="home-container">
            <div className='hero-container'>
                <Header />
                <div className="home-top-container">
                    <div className="home-top-center">
                        <h2 className='slogan'>Създай обява на това което търсиш или преглагаш!</h2>
                        <div className='home-top-center-btn'>
                            <button className='btn home-btn'>Търси</button>
                            <button className='btn home-btn'>Продай</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-body'>
                    SOME CONTENT
            </div>
            <Footer />
        </div>
    )
}

export default HomePage