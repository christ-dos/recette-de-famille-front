import { FunctionComponent } from "react";
import { Ingredient } from "../models/Ingredient";
import '../css/IngredientSwiperSlide.css';
import { NavLink } from "react-router-dom";

type PropsIngredient = {
    ingredient: Ingredient;
}

const IngredientSwiperSlide: FunctionComponent<PropsIngredient> = ({ ingredient }) => {

    function searchByIngredient(id: number | undefined) {
        console.log("mon id:" + id);
    }

    return (
        <main id="swiperSlideIngredient" className="pt-2 pb-2">
             <NavLink to={'/recette/ingrdient/' +ingredient.id} style={{textDecoration: 'none'}}>
                <div id="slide" className="swiper-slide d-flex justify-content-center px-3 " >
                    <p className="aliment pe-0" onClick={() => searchByIngredient(ingredient.id)}>{ingredient.name}</p>
                </div>
            </NavLink>
        </main>
    );
}

export default IngredientSwiperSlide
