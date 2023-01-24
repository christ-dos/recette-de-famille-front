import { FunctionComponent, useEffect, useState } from "react";
import { Ingredient } from "../models/Ingredient";
import IngredientSwiperSlide from "./IngredientSwiperSlide";
// Import Swiper React components
import { A11y, Navigation, Pagination, Scrollbar, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllIngredient } from "../services/IngredientService";

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
    getAllIngredient().then(ingredients => setIngredients(ingredients));
    
   //setIngredients(INGREDIENTS);
  }, []);

  return (
    <>
  
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
        onSlideChange={() => console.log("change de direction")}
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
