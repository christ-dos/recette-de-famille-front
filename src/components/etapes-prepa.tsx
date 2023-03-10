import { FunctionComponent } from "react"
import {Recette} from "../models/recette";

type Props = {
    recette: Recette,
  };
  
const EtapesPrepa: FunctionComponent<Props> = ({recette}) => {

    return (

        <main>
            <div className="container d-flex justify-content-center  ">
            <div className="card col-10 p-4 ">
            <textarea className="border-0" value={recette.stepPreparation} cols={100} rows={20} style={{width: '100%'}}> </textarea>

            </div>
           
            </div>
           
        </main>
    )


}

export default EtapesPrepa;