import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import BarreVerte from '../components/barre-verte';
import { BoutonLiens } from '../components/Bouton';
import { TitreH2 } from '../components/children';
import EtapesPrepa from '../components/etapes-prepa';
import Retour from '../components/retour';
import TableauIngredients from '../components/tableau-ingredients';
import TempsPrepa from '../components/Temps-prepa';
import { Ingredient } from '../models/Ingredient';
import { Recette } from '../models/recette';
import { RecetteIngredient } from '../models/RecetteIngredient';
import { getRecetteById } from '../services/RecetteService';


type Params = { id: string };

const RecetteDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

  const [recette, setRecette] = useState<Recette | null>(null);
  const [ingredientsRecettes, setingredientsRecettes] = useState<RecetteIngredient[]>([]);

  useEffect(() => {
    getRecetteById(+match.params.id).then(recette=>setRecette(recette))
    
  }, [match.params.id]);

 
  

  return (

    <div>

      {recette ? (
        <div className="row">
          <div className="col-12 col-sm col-md">
            <div className='container d-flex flex-row-reverse mt-5' >
              <BoutonLiens href={''} icon={faTrash}/>
              <BoutonLiens href={''} icon={faPencil}/>
            </div>
        
            <TitreH2 titre={recette.title}/>
            <div className="card">
              <div className=" d-flex justify-content-center">
                <img src={recette.urlPicture} alt={recette.title} style={{ width: '450px', margin: '0 auto', marginBottom: '20px', marginTop: '20px' }} />
              </div>
              <h3>Ingredients</h3>
              <hr />
              {
                recette.recettesIngredients?.map(recetteIngredient=>(
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
                  <h3>Préparation</h3>
                  <hr />
                  <TempsPrepa recette={recette} />
                  <EtapesPrepa recette={recette} />

                </div>
                <div className="">
                  <Link to="/livrerecettes"><Retour/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center">Aucune Recette à afficher !</h4>
      )}
    </div>
  );}

export default RecetteDetail;

