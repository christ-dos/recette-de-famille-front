import { FunctionComponent } from "react";
import { Ingredient } from "../models/Ingredient";
import { UniteMesureEnum } from "../models/RecetteIngredient";

type Props = {
    ingredient: Ingredient,
    uniteMesure : UniteMesureEnum,
    quantite: number
  };
const TableauIngredients: FunctionComponent<Props> = ({ ingredient ,uniteMesure, quantite }) => {

    return (
    
       <div className="mt-0">
            <div className="container ">
                <section className="row d-flex justify-content-center mb-1 ">
                    <div className="col-12 col-md-12 col-lg-6 col-xxl-6  ">
                        <ul className="list-group ">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {ingredient.name.toLocaleUpperCase()}
                                <span className="badge rounded-pill custom-bg-bleu text-light ">{quantite} {uniteMesure}</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>


    
    
    )
}

export default TableauIngredients;