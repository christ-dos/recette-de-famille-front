import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/recette-card.css';
import Recette from '../models/recette';
import { deleteRecetteById } from '../services/RecetteService';
import { BoutonLiens } from './Bouton';
import DeleteModal from './modal_delete';


type Props = {
  recette: Recette
};

const RecetteCard: FunctionComponent<Props> = ({ recette}) => {

  /*async function deleteRecette(id: any): Promise<any> {
    console.log("click sur delete");
    await deleteRecetteById(id);
    
  }*/

  return (

    <div id="recetteCard" className=" col-12 col-md-6 col-lg-4" >
        <div className=" card mb-4 custom-bg-vert custom-shadow-card text-light scale">
        <NavLink to={'/recettes/' + recette.id} style={{ textDecoration: 'none' }}>
          <div className="row g-0">
            <div className=" col-12 col-sm-6 image">
              <img src={recette.urlPicture} className="img-fluid rounded-start " alt="image de la recette" style={{}} />
            </div>
            <div className=" col-12 col-sm-6">
              <div className="card-body text-light">
                <h5 className="card-title overflow-elipsis">{recette.title}</h5>
                <blockquote>
                  <p className="card-text">{recette.difficultyLevel}</p>
                  <p className="card-text">{recette.numberOfPeople} parts</p>
                  <p className="card-text">{recette.totalTimePreparation}</p>
                </blockquote>
              </div>
            </div>
           
          </div>
          </NavLink>
          <div className="card-footer d-flex justify-content-end  ">
              <DeleteModal id={recette.id} />
              <BoutonLiens href={'/'} icon={faPencil} />
              
            </div>
        </div>
       
      
    </div>
  );
}


export default RecetteCard;