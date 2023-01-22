import { FunctionComponent, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Ingredient } from '../models/Ingredient';
import RECETTES from '../models/mock-recettes';
import Recette from '../models/recette';
import { getAllRecette, getRecetteById } from '../services/RecetteService';


type Params = { id: string };

const RcetteDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

  const [recette, setRecette] = useState<Recette | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient>();

  useEffect(() => {
    getRecetteById(+match.params.id).then(recette=>setRecette(recette))
  }, [match.params.id]);

  return (
    <div>
      {recette ? (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <h2 className="header center">{recette.title}</h2>
            <div className="card hoverable">
              <div className="card-image">
                <img src={recette.urlPicture} alt={recette.title} style={{ width: '250px', margin: '0 auto' }} />
              </div>

              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr>
                        <td>Titre</td>
                        <td><strong>{recette.title}</strong></td>
                      </tr>
                      <tr>
                        <td>Temps Total de Préparation</td>
                        <td><strong>{recette.totalTimePreparation}</strong></td>
                      </tr>
                      <tr>
                        <td>Temps Préparation</td>
                        <td><strong>{recette.timePreparation}</strong></td>
                      </tr>
                      <tr>
                        <td>Temps de Repos</td>
                        <td><strong>{recette.restTime}</strong></td>
                      </tr>
                      <tr>
                        <td>Temps  de Cuisson</td>
                        <td><strong>{recette.cookingTime}</strong></td>
                      </tr>
                      <tr>
                        <td>Niveau de Difficulté</td>
                        <td><strong>{recette.difficultyLevel}</strong></td>
                      </tr>
                      <tr>
                        <td>Nombre de parts</td>
                        <td><strong>{recette.numberOfPeople}</strong></td>
                      </tr>
                      <tr>
                        <td>Etapes de préparations</td>
                        <td><strong>{recette.stepPreparation}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center">Aucune Recette à afficher !</h4>
      )}
    </div>
  );
}

export default RcetteDetail;

