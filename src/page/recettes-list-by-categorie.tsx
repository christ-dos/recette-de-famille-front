
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TitreH2 } from '../components/children';
import RecetteCard from '../components/recette-card';
import Recette from '../models/recette';
import { deleteRecetteById, findRecetteByCategorieId } from '../services/RecetteService';


type Props = {
  id: number
}

const RecetteListByCategorie: FunctionComponent<Props> = () => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const tabPath = window.location.pathname.split('/');

  console.log(window.location.pathname.split('/'));
  console.log(tabPath[3]);

  useEffect(() => {
    findRecetteByCategorieId(+tabPath[3]).then(recettes=>setRecettes(recettes));
  }, []);

  useEffect(() => {
    //setCategories
    console.log('rectte mit à jour');
  }, [recettes]);

  async function deleteById(id: number) {
    await deleteRecetteById(id);
    findRecetteByCategorieId(+tabPath[3]).then(recettes => setRecettes(recettes));
  }

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <TitreH2 titre={'Recherche par Catégorie'} />
        </div>
        <div>
          <Link to={'/'}> 
            <FontAwesomeIcon className='d-flex justify-content-start custom-vert ps-3' icon={faArrowCircleLeft} style={{fontSize:'60px'}}/>
          </Link>
        </div>
      </div>
      <div className="row mx-auto mt-4">
        {recettes.map(recette => (
          <RecetteCard key={recette.id} recette={recette} click={() => deleteById(recette.id)}/>
        ))}  
      </div>
    </>
  );
}

export default RecetteListByCategorie;
