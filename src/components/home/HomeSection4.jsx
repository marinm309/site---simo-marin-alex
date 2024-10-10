import React from 'react';
import Slider from 'react-slick';

const HomeSection4 = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: 1,
    waitForAnimate: false,
    lazyLoad: true,
  };

  return (
    <section className="home-section4 section">
      <h2 className="home-section4-title">Какво казват за <span className='light-text'>Нас</span></h2>
      <Slider {...settings}>

        <div className="home-section4-item">
          <div className="home-section4-image">
            <img src="product.jpg" />
          </div>
          <div className="home-section4-text">
            <p className="home-section4-author">Алекс Р.</p>
            <p className="home-section4-quote">"Цитат 1"</p>
          </div>
        </div>

        <div className="home-section4-item">
          <div className="home-section4-image">
            <img src="product.jpg" />
          </div>
          <div className="home-section4-text">
            <p className="home-section4-author">Симеон Г.</p>
            <p className="home-section4-quote">"Цитат 2"</p>
          </div>
        </div>

        <div className="home-section4-item">
          <div className="home-section4-image">
            <img src="product.jpg" />
          </div>
          <div className="home-section4-text">
            <p className="home-section4-author">Марин М.</p>
            <p className="home-section4-quote">"Цитат 3"</p>
          </div>
        </div>

      </Slider>
    </section>
  );
};

function NextArrow(props){
    const { onClick } = props;
    return (
    <div className="slick-next" onClick={onClick}>
        <i className="fa-solid fa-chevron-right"></i>
    </div>
    );
};

function PrevArrow(props){
    const { onClick } = props;
    return (
    <div className="slick-prev" onClick={onClick}>
        <i className="fa-solid fa-chevron-left"></i>
    </div>
    );
};

export default HomeSection4;
