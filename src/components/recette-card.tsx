import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent, MouseEventHandler, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/recette-card.css';
import { Recette } from '../models/recette';
import { BoutonLiens } from './Bouton';
import { TitreH5 } from './children';
import DeleteModal from './modal_delete';




type Props = {
  recette: Recette,
  click: MouseEventHandler
};

const RecetteCard: FunctionComponent<Props> = ({ recette, click }) => {

  return (

    <div id="recetteCard" className=" col-12 col-md-6 col-lg-4" >
      <div className="card mb-4 custom-bg-vert custom-shadow-card text-light scale">
        <NavLink to={'/recettes/' + recette.id} style={{ textDecoration: 'none' }}>
          <div className="row g-0">
            <div className=" col-12 col-sm-6 image">
              <img src={recette.urlPicture}
                className="img-fluid rounded-start "
                alt="image de la recette"
                style={{ objectFit: 'scale-down' }} />
            </div>
            <div className=" col-12 col-sm-6">
              <div className="card-body text-light">
                <TitreH5 titre={recette.title} className="card-title overflow-elipsis" />

                <blockquote>
                  <p className="card-text overflow-elipsis">{recette.difficultyLevel}</p>
                  <p className="card-text overflow-elipsis">{recette.numberOfPeople} parts</p>
                  <p className="card-text overflow-elipsis">{recette.totalTimePreparation} min</p>
                </blockquote>
              </div>
            </div>

          </div>
        </NavLink>
        <div className="card-footer d-flex justify-content-end  ">
          <DeleteModal id={recette.id} click={click} />
          <div>
            <BoutonLiens href={'/recettes/edit/' + recette.id} icon={faPencil} />
          </div>


        </div>
      </div>


    </div>
  );
}


export default RecetteCard;


