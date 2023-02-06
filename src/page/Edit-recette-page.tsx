import { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RecetteEditForm from '../components/recette-modifier-form';
import RecetteForm from '../components/recette-modifier-form';
import {Recette} from '../models/recette';
import { getRecetteById } from '../services/RecetteService';

type Params = { id: string };
  
const RecetteEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    const [recette, setRecette] = useState<Recette | null>(null);
  
    useEffect(() => {
      getRecetteById(+match.params.id).then(recette=>setRecette(recette))
    }, [match.params.id]);

  
  return (
    <div>
      { recette ? (
        <div className="row">
             <RecetteEditForm recette={recette}></RecetteEditForm>
        </div>
      ) : (
        <h4 className="center">Aucun Recette à afficher !</h4>
      )}
    </div>
  );
}
  
export default RecetteEdit;


