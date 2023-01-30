import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import '../css/IngredientSwiperSlide.css';
import { Ingredient } from "../models/Ingredient";

type PropsIngredient = {
    ingredient: Ingredient;
}

const IngredientSwiperSlide: FunctionComponent<PropsIngredient> = ({ ingredient }) => {


    return (
        <section id="swiperSlideIngredient" className="pt-2 pb-2">
             <NavLink to={'/recette/ingrdient/' + ingredient.id} style={{textDecoration: 'none'}}>
                <div id="slide" className="swiper-slide d-flex justify-content-center px-3 " >
                    <p className="aliment pe-0 scale" >{ingredient.name}</p>
                </div>
            </NavLink>
        </section>
    );
}

export default IngredientSwiperSlide
