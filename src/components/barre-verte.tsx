import { FunctionComponent } from "react"
import {Recette}from "../models/recette";

type Props = {
    recette: Recette,
  };

const BarreVerte : FunctionComponent<Props> = ({recette}) => {

    return (
    <div className="container col-8 mb-3">
        <ul className="nav justify-content-center rounded-pill mt-5 custom-bg-vert">
            <li className="nav-item">
                <a className="nav-link disabled taillePolice text-light">{recette.difficultyLevel}</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled taillePolice text-light">{recette.totalTimePreparation}</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled taillePolice text-light">{recette.numberOfPeople} personne(s)</a>
            </li>
        </ul>
    </div>
    )
}

export default BarreVerte;









