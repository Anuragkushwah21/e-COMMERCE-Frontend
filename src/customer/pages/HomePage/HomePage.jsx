import MainCrosel from "../../components/HomeCrosel/MainCrosel";
import HomeSectionCarosel from "../../components/HomeSectionCarosel/HomeSectionCarosel";
import { mensKurta } from "../../../Data/mens_kurta";

function HomePage() {
  return (
    <div>
      <MainCrosel />
      <div className="space-y-1  flex-col justify-center px-4 lg:px-8 ">
        <HomeSectionCarosel data={mensKurta} sectionName={"Men's Kurta"} />
        <HomeSectionCarosel data={mensKurta} sectionName={"Men's Shoes"}/>
        <HomeSectionCarosel data={mensKurta} sectionName={"Men's Shirt"}/>
        <HomeSectionCarosel data={mensKurta} sectionName={"Women's Saree"}/>
        <HomeSectionCarosel data={mensKurta} sectionName={"Women's Kurti"}/>
      </div>
    </div>
  );
}

export default HomePage;
