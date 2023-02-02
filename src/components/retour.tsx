import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";



const Retour: FunctionComponent = () => {

    return (
        <main>
             <div className="container  mt-5 ">
                <div className="me-4" >
                    <button type="button" className="btn custom-vert  ">
                        <FontAwesomeIcon icon={faArrowLeft} style={{fontSize:'30', color:'#83C5BE'}}/>
                    </button>
                </div>
             </div>
        </main>
    )
}

export default Retour;

