import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useState } from 'react';

function SingleItemPage(){

    const [mainImage, setMainImage] = useState(0);
    const fullScreenHandle = useFullScreenHandle();

    const images = [
        "/image1.jpg",
        "/image2.jpg",
        "/image3.jpg",
        "/image4.jpg",
    ];

    const settings = {
        customPaging: function(i) {
          return (
            <img src={images[i]} alt={`thumbnail-${i}`} className="thumbnail" />
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: index => setMainImage(index),
      };

    return (
        <div className="car-gallery">
        <button className="full-screen-button" onClick={fullScreenHandle.enter}>
          Enter Full Screen
        </button>
  
        <FullScreen handle={fullScreenHandle}>
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`car-${index}`} className="main-image" />
              </div>
            ))}
          </Slider>
          <button className="exit-fullscreen" onClick={fullScreenHandle.exit}>
            Exit Full Screen
          </button>
        </FullScreen>
      </div>
    )
}

export default SingleItemPage