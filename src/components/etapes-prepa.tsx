import { FunctionComponent } from "react"
import {Recette} from "../models/recette";

type Props = {
    recette: Recette,
  };
  
const EtapesPrepa: FunctionComponent<Props> = ({recette}) => {

    return (

        <main>
            <div className="container d-flex justify-content-center  ">
            <p className="card col-10 p-4 ">
                {recette.stepPreparation}
            </p>
            </div>

        </main>
    )


}

export default EtapesPrepa;