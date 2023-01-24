
import axios from 'axios';
import { log } from 'console';
import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BoutonAdd } from '../components/Bouton';
import { TitreH2 } from '../components/children';
import RecetteCard from '../components/recette-card';
import RECETTES from '../models/mock-recettes';
import Recette from '../models/recette';
import { findRecetteByCategorieId, getAllRecette } from '../services/RecetteService';


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

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <TitreH2 titre={'Recherche par Catégorie'} />
        </div>
        <div className="col-12 pe-4 d-flex justify-content-end">
          <BoutonAdd />
        </div>
      </div>

      <div className="row mx-auto mt-4">
        {recettes.map(recette => (
          <RecetteCard key={recette.id} recette={recette}/>
        ))}
      </div>
    </>
  );
}

export default RecetteListByCategorie;
