import { FunctionComponent, useEffect, useState } from "react";
import { Ingredient } from "../models/Ingredient";
import INGREDIENTS from "../models/mock-ingredients";
import IngredientSwiperSlide from "./IngredientSwiperSlide";
// Import Swiper React components
import { A11y, Navigation, Pagination, Scrollbar, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function getProductOne(): number {
  var windowWidth = window.innerWidth;
  var slidesPerView = '0';
  //= window.innerWidth <= 720 ? '1' : '5';
  if (windowWidth <= 320) {
    slidesPerView = '1';
  } else if (windowWidth <= 720) {
    slidesPerView = '2';
  } else if (windowWidth >= 721 && windowWidth <= 800) {
    slidesPerView = '3';
  } else if (windowWidth >= 801 && windowWidth <= 1000) {
    slidesPerView = '4';
  }
  else if (windowWidth >= 1000) {
    slidesPerView = '5';
  }
  return +slidesPerView;
}


const CarouselIngrdients: FunctionComponent = () => {
const [ingredients, setIngredients] = useState<Ingredient[]>([]);


  useEffect(() => {
    setIngredients(INGREDIENTS);
  }, []);

  return (
    <>
   {/* <main  className="row">
        <div className="col-12 col-md-12 col-lg-12 col-xxl-12 mt-5 mb-5">
          <div className="swiper">
            <div className="swiper-wrapper">
            {ingredients.map(ingredient => (
              <SwiperSlide>
                  <IngredientSwiperSlide key={ingredient.id} ingredient={ingredient} />
              </SwiperSlide>
               ))}
              <div
                className="swiper-button-next ">
              </div>

              <div
                className="swiper-button-prev">
              </div>
            </div>
          </div>
        </div>
      </main>
      todo clean code
 */ }
      <main id="carousel_ingredient" className="row">
      <Swiper virtual className="mt-4 pb-4"
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Virtual]}
        spaceBetween={50}
        slidesPerView={getProductOne()}
        navigation={{}}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={(swiper) => console.log("change de direction")}
        >
      
          {ingredients.map(ingredient => (
          <SwiperSlide key={ingredient.id}>
            <IngredientSwiperSlide  ingredient={ingredient} />
          </SwiperSlide>
        ))}
      </Swiper>
</main>

    </>
  );
}

export default CarouselIngrdients;
