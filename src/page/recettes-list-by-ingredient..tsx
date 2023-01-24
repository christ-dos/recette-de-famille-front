
import { FunctionComponent, useEffect, useState } from 'react';
import { TitreH2 } from '../components/children';
import RecetteCard from '../components/recette-card';
import Recette from '../models/recette';
import { findRecetteByIngredientId } from '../services/RecetteService';


type Props = {
  IsClicked: boolean 
}

const RecetteListByIngredient: FunctionComponent<Props> = ({IsClicked}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [recettes, setRecettes] = useState<Recette[]>([]);


  const tabPath = window.location.pathname.split('/');

  console.log(window.location.pathname.split('/'));
  console.log(tabPath[3]);

  useEffect(() => {
    findRecetteByIngredientId(+tabPath[3]).then(recettes=>setRecettes(recettes));
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <TitreH2 titre={'Recherche par Ingredient'} />
        </div>
   
      </div>

      <div className="row mx-auto mt-4">
        {recettes.map(recette => (
          <RecetteCard key={recette.id} recette={recette} />
        ))}
      </div>
    </>
  );
}

export default RecetteListByIngredient;
