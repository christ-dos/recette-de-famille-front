import { FunctionComponent } from "react";
import { Recette } from "../models/recette";

type Props = {
    recette: Recette,
};

const TempsPrepa: FunctionComponent<Props> = ({ recette }) => {

    return (
        <div className="mb-5">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link disabled text-dark">Temps de préparation total : {recette.totalTimePreparation} min</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled text-dark">Préparation : {recette.timePreparation ? (recette.timePreparation) : (0)} min</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled text-dark">Repos : {recette.restTime ? (recette.restTime) : (0)} min</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled text-dark">Cuisson : {recette.cookingTime ? (recette.cookingTime) : (0)} min</a>
                </li>
            </ul>
        </div>
    )
}

export default TempsPrepa;














