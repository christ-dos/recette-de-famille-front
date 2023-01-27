
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TitreH2 } from '../components/children';
import RecetteCard from '../components/recette-card';
import Recette from '../models/recette';
import { deleteRecetteById, findRecetteByIngredientId } from '../services/RecetteService';



const RecetteListByIngredient: FunctionComponent = ({ }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [recettes, setRecettes] = useState<Recette[]>([]);

  const tabPath = window.location.pathname.split('/');

  //console.log(window.location.pathname.split('/'));
  //console.log(tabPath[3]);

  async function deleteById(id: number) {
    await deleteRecetteById(id);
    findRecetteByIngredientId(+tabPath[3]).then(recettes => setRecettes(recettes));
  }

  useEffect(() => {
    findRecetteByIngredientId(+tabPath[3]).then(recettes => setRecettes(recettes));
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <TitreH2 titre={'Recherche par Ingredient'} />
        </div>
        <div>
          <Link to={'/'}>
            <FontAwesomeIcon className='d-flex justify-content-start custom-vert ps-3' icon={faArrowCircleLeft} style={{ fontSize: '60px' }} />
          </Link>
        </div>

      </div>

      <div className="row mx-auto mt-4">
        {recettes.map(recette => (
          <RecetteCard key={recette.id} recette={recette} click={() => deleteById(recette.id)} />
        ))}
      </div>
    </>
  );
}

export default RecetteListByIngredient;



