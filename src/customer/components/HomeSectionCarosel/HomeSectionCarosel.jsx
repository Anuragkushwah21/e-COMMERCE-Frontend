import React, { useState,useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";

function HomeSectionCarosel({ data, sectionName }) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: {
      items: 2,
      itemsFit: "contain",
    },
    568: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 5.5,
      itemsFit: "contain",
    },
  };
  const items = data?.slice(0, 10).map((item,i) => (
    <div key={i}>
    
      <HomeSectionCard product={item} />
    </div>
  ));

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-2xl font-extrabold text-gray-900 py-5">{sectionName}</h2>
      <div className="relative border p-5">
        <AliceCarousel
        ref={carouselRef}
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          animationType="fadeout"
          animationDuration={2000}
        />
        {activeIndex !== items.length - 5 && (
          <Button
             onClick={() => carouselRef.current.slideNext()}
            variant="contained"
            className="z-50 bg-[]"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
            }}
            color="white"
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              className=""
              sx={{ transform: "rotate(-90deg)" }}
            />
          </Button>
        )}

        {activeIndex !== 0 && (
          <Button
           onClick={() => carouselRef.current.slidePrev()}
            variant="contained"
            className="z-50 bg-[]"
            color="white"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%)  rotate(90deg)",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              className=""
              sx={{ transform: " rotate(90deg)" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export default HomeSectionCarosel;
