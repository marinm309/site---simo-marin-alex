import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef } from "react";

function NextArrow(props) {
  return (
    <div onClick={props.onClick} className="next-arrow arrow">
      <i className="fa-solid fa-chevron-right"></i>
    </div>
  );
}

function PrevArrow(props) {
  return (
    <div onClick={props.onClick} className="prev-arrow arrow">
      <i className="fa-solid fa-chevron-left"></i>
    </div>
  );
}

function SingleItemPage() {
  const [index, setIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const sliderRef = useRef(null)
  const thumbnailSliderRef = useRef(null)


  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const mainSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div>
        <ul className="dots-container"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className={`dot ${index === i ? 'active' : ''}`}></div>
    ),
    beforeChange: (oldIndex, newIndex) => {
      setIndex(newIndex)
    }
  };

  const thumbSettings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={`/image${i + 1}.jpg`} />
        </a>
      );
    },
    initialSlide: index,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    waitForAnimate: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex, newIndex) => {
      setIndex(newIndex)
      sliderRef.current?.slickGoTo(newIndex)
    }
  };

  return (
    <div className="slider-container">

      <div className="mainslider-container">
        <button onClick={toggleFullscreen} className="mainslider-fullscreen-btn"><i className="fa-solid fa-expand"></i></button>
        <Slider {...mainSettings} ref={sliderRef}>
          <div>
            <img src={"/image1.jpg"} alt="Slide 1" />
          </div>
          <div>
            <img src={"/image2.jpg"} alt="Slide 2" />
          </div>
          <div>
            <img src={"/image3.jpg"} alt="Slide 3" />
          </div>
          <div>
            <img src={"/image4.jpg"} alt="Slide 4" />
          </div>
        </Slider>
      </div>

      {isFullscreen && (
        <div className="thumbnail-slider-contaienr fullscreen">
          <div className="thumbnail-slider">
            <button onClick={toggleFullscreen} className="thumbnail-fullscreen-btn"><i className="fa-solid fa-x"></i></button>
            <Slider {...thumbSettings} ref={thumbnailSliderRef}>
              <div>
                <img src="/image1.jpg" alt="Thumb 1" />
              </div>
              <div>
                <img src="/image2.jpg" alt="Thumb 2" />
              </div>
              <div>
                <img src="/image3.jpg" alt="Thumb 3" />
              </div>
              <div>
                <img src="/image4.jpg" alt="Thumb 4" />
              </div>
            </Slider>
          </div>
        </div>
      )}

    </div>
  );
}

export default SingleItemPage;
