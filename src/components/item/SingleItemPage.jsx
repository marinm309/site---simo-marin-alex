import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Item from "./Item";
import { ClientContext } from "../../context/clientContext"

function NextArrow(props) {
  return (
    <div onClick={props.onClick} className={`next-arrow arrow${props.extraClass ? props.extraClass : ''}`}>
      <i className="fa-solid fa-chevron-right"></i>
    </div>
  );
}

function PrevArrow(props) {
  return (
    <div onClick={props.onClick} className={`prev-arrow arrow${props.extraClass ? props.extraClass : ''}`}>
      <i className="fa-solid fa-chevron-left"></i>
    </div>
  );
}

function SingleItemPage() {
  const [index, setIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const sliderRef = useRef(null)
  const thumbnailSliderRef = useRef(null)

  const navigate = useNavigate();
  const client = useContext(ClientContext).client
  const [ productData, setProductData ] = useState({})
  const slug = useParams()
  const profileInfo = useContext(ClientContext).profileInfo

  useEffect(() => {
    client.get(`/products/${slug.itemName}`)
    .then(function(res){
        setProductData(res.data)
    })
    .catch(function(error){
        navigate('/')
    })
  }, [slug])

  console.log(productData)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const mainSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
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
  }

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
    lazyLoad: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    waitForAnimate: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex, newIndex) => {
      setIndex(newIndex)
      sliderRef.current?.slickGoTo(newIndex)
    }
  }

  const similarSettings = {
    dots: false,
    lazyLoad: true,
    infinite: false,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
    nextArrow: <NextArrow extraClass={' similar-arrows'} />,
    prevArrow: <PrevArrow extraClass={' similar-arrows'} />,
  }

  return (
    <div className="single-item-container">

      <div className="single-item-top-links-container">
        <p><Link>Главна страница</Link> / <Link>име на категория</Link> / <Link>подкатегория</Link> / име на обява</p>
      </div>

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
            <div>
              <img src={"/image6.jpg"} alt="Slide 4" />
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
                <div>
                  <img src={"/image6.jpg"} alt="Slide 4" />
                </div>
              </Slider>
            </div>
          </div>
        )}

        <div className="single-item-main-info">
          <p className="single-item-added">Последно обновена на {productData.last_updated}</p>
          <h1 className="single-item-name">{productData.title}</h1>
          <hr></hr>
          <h2 className="single-item-price">{productData.price} лв</h2>
          <p className="single-item-city">{productData.address}</p>
          <div className="single-item-main-info-profile-container">
            <div className="single-item-main-info-profile-image-container">
              <img src={productData.user?.image} />
            </div>
            <div className="single-item-main-info-profile-info">
              <h3 className="single-item-main-info-profile-name">{productData.user?.name}</h3>
              <p className="single-item-main-info-profile-since">профил от 2019г</p>
              <div className="single-item-main-info-profile-stars-container">
                <i className="fa-regular fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <p className="single-item-main-info-profile-total-stars">4 от 5 звезди</p>
              </div>
            </div>
          </div>
          <button className="single-item-message-btn single-item-btn">Съобщение</button>
          <button className="single-item-phone-btn single-item-btn">Обаждане</button>
        </div>

      </div>

      <div className="single-item-categories-report-container">
        <div>
          <ul className="single-item-categories-container">
            <li>Кате</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория</li>
            <li>Категория дълга асд дас са</li>
          </ul>
        </div>
        <div>
          <button className="single-item-report-btn"><i className="fa-solid fa-circle-exclamation"></i>Докладвай</button>
        </div>
      </div>

      <div className="single-item-description-profile-items-container">
        <div className="single-item-description-container">
          <h3>Описание</h3>
          <p>йфиодмио фсд фиосдйфсйс оаисфйявй йфсиосдйций асдасиоасд йдийай иасйодиасйодиасйиод йиод йиопасдх уиопх упсдфхуисдфуипасдфхасдфасдфх уасдфх асдфх д  хих йипсдфх х иедфруерфх уиерфх уиерфх уио хуиоерф хусерфх уи</p>
        </div>
        <div className="single-item-profile-items-container">
          <h3 className="single-item-profile-items-header">Обяви на потребителя</h3>
          <Link to={''}>Виж всички</Link>
          <ul className="single-item-profile-items">
            <Item></Item>
            <Item></Item>
          </ul>
        </div>
      </div>

      <div className="single-item-similar-items-container">
        <h3 className="single-item-similar-items-header">Подобни обяви</h3>
        <ul className="single-item-similar-items">
          <Slider {...similarSettings}>
            {productData.similarItems?.map((i) => <Item key={i.id} image={i.image} slug={i.slug} title={i.title} price={i.price} address={i.address} last_updated={i.last_updated}></Item>)}
          </Slider>

        </ul>

      </div>

    </div>
  );
}

export default SingleItemPage;
