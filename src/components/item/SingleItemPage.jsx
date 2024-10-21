import { useState, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Inline from "yet-another-react-lightbox/plugins/inline";


function SingleItemPage(){

  const lightRef = useRef(null)
  const slides=[
    { src: "/image1.jpg" },
    { src: "/image2.jpg" },
    { src: "/image3.jpg" },
    { src: "/image4.jpg" },
    { src: "/image5.jpg" },
    
    { src: "/image1.jpg" },
    { src: "/image2.jpg" },
    { src: "/image3.jpg" },
    { src: "/image4.jpg" },
    { src: "/image5.jpg" },
  ]
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  let dotClickDiff = 0

  const toggleOpen = (state) => () => setOpen(state)

  const updateIndex = ({ index: currentIndex }) => {
    setIndex(currentIndex)
  }

  const dotsUpdateIndex = (clickedIndex) => {
    if(clickedIndex > index){
      dotClickDiff = clickedIndex - index
      for(let i=0; i<dotClickDiff; i++){
        lightRef.current.next() 
      }
    }else{
      dotClickDiff = index - clickedIndex
      for(let i=0; i<dotClickDiff; i++){
        lightRef.current.prev()
      }
    }
  }

  return (
    <div className="single-item-container">
      <div className="single-item-gallery-container">

        <Lightbox
          controller={{ref: lightRef}}
          index={index}
          slides={slides}
          plugins={[Inline]}
          on={{
            view: updateIndex,
            click: toggleOpen(true),
          }}
          carousel={{
            padding: 0,
            spacing: 0,
            imageFit: "contain",
          }}
          inline={{
            style: {
              width: "100%",
              maxWidth: "750px",
              aspectRatio: "3 / 2",
              margin: "0 auto",
            },
          }}
        />

        <Lightbox
          carousel={{finite: true, preload: 4}}
          open={open}
          close={toggleOpen(false)}
          index={index}
          slides={slides}
          plugins={[Thumbnails]}
          on={{ view: updateIndex }}
          animation={{ fade: 0, swipe: 500 }}
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        />

        <div className="dots-container">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => {dotsUpdateIndex(i)}}
            ></span>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default SingleItemPage