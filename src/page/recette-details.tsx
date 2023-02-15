import { faExclamation, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { error } from 'console';
import { FunctionComponent, MouseEventHandler, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import BarreVerte from '../components/barre-verte';
import { BoutonLiens } from '../components/Bouton';
import { TitreH2, TitreH3 } from '../components/children';
import EtapesPrepa from '../components/etapes-prepa';
import DeleteModal from '../components/modal_delete';
import { Retour } from '../components/Bouton';
import TableauIngredients from '../components/tableau-ingredients';
import TempsPrepa from '../components/Temps-prepa';
import { Recette } from '../models/recette';
import { deleteRecetteById, getRecetteById } from '../services/RecetteService';



type Params = {
  id: string
};
type Props = {
  click: MouseEventHandler<Element>
}

const RecetteDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }, { click }) => {



  const [recette, setRecette] = useState<Recette | null>(null);


  useEffect(() => {
    getRecetteById(+match.params.id).then(recette => setRecette(recette)).catch(error => error.value)
  }, [match.params.id]);



  async function deleteById() {
    await deleteRecetteById(+match.params.id);
    console.log(+match.params.id);
    console.log("recette supprimre pour id " + match.params.id);
    setRecette(null)

  }

  return (

    <div>
      {recette ? (
        <div className="row">
          <div className="col-12 col-sm col-md">
            <div className='container d-flex flex-row-reverse mt-4' >
              <DeleteModal id={recette.id} click={() => deleteById()} />
              <BoutonLiens href={'/recettes/edit/' + recette.id} icon={faPencil} />
            </div>
            <TitreH2 titre={recette.title} />
            <div className="card shadow-lg">
              <div className=" d-flex justify-content-center">
                <img src={recette.urlPicture} alt={`image de ${recette.title}`}
                  style={{ width: '450px', margin: '0 auto', marginBottom: '20px', marginTop: '20px' }} />
              </div>
              <TitreH3 titre={"Ingredients"} className={"ms-4 custom-color-dore"} />
              <hr />
              {
                recette.recettesIngredients?.map(recetteIngredient => (
                  <TableauIngredients
                    key={recetteIngredient.ingredient.id}
                    ingredient={recetteIngredient.ingredient}
                    uniteMesure={recetteIngredient.uniteMesure}
                    quantite={recetteIngredient.quantite}
                  />
                ))
              }
              <div className="">
                <div className="card-body">
                  <BarreVerte recette={recette} />
                  <TitreH3 titre={"Préparation"} className={"custom-color-dore ms-2"} />
                  <hr />
                  <TempsPrepa recette={recette} />
                  <EtapesPrepa recette={recette} />
                </div>
                <div className="custom-vert ">
                  <Link to="/livrerecettes"><Retour /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center alert alert-warning d-flex justify-content-center">
          <FontAwesomeIcon icon={faExclamation} style={{ color: 'rgb(106,53,53)', fontSize: '1.5rem' }} />
          &nbsp; Aucune recette à afficher
        </h4>
      )}
    </div>
  );
}

export default RecetteDetail;

