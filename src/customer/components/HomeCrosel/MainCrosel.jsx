import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouse1Data } from "./MainCaroselData";

const MainCrosel = () => {
  const items = mainCarouse1Data.map((item) => (
    <img
      src={item.image}
      alt="carousel"
      role="presentation"
      className="cursor-pointer w-full h-full object-cover"
    />
  ));

  return (
    <>
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
      />
    </>
  );
};

export default MainCrosel;
