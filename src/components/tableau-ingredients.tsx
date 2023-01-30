import { FunctionComponent } from "react";
import { Ingredient } from "../models/Ingredient";

type Props = {
    ingredients: Ingredient
  };
const TableauIngredients: FunctionComponent<Props> = ({ ingredients }) => {

    return (
        
        <div className="mt-0">
            <div className="container ">
                <section className="row d-flex justify-content-center mb-1 ">
                    <div className="col-12 col-md-12 col-lg-6 col-xxl-6  ">
                        <ul className="list-group ">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {ingredients.name}
                                <span className="badge rounded-pill custom-bg-bleu text-light ">3Kg</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>

    
    )
}

export default TableauIngredients;