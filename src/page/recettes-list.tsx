import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoutonAdd } from '../components/Bouton';
import { TitreH2 } from '../components/children';
import RecetteCard from '../components/recette-card';
import Recette from '../models/recette';
import { deleteRecetteById, getAllRecette } from '../services/RecetteService';

const RecetteList: FunctionComponent = () => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [data, setData] = useState<Recette[]>([]);
  

  useEffect(() => {
      /*const recettes = async () => {
      const response = await getAllRecette();
      setRecettes(response);
    }
    recettes();*/
    //setRecettes(RECETTES);
   // getRecettes();
   getAllRecette().then(recettes=> setRecettes(recettes))
  }, []);

  async function deleteById(id: number) {
    await deleteRecetteById(id);
    getAllRecette().then(recettes=> setRecettes(recettes))
  }

  return (
    <>
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <TitreH2 titre={'Livre de Recettes'}/>
      </div>
      <p></p>
      <div className="col-12 pe-4 d-flex justify-content-end">
        <Link to={'/recette/add'}>
          <BoutonAdd />
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
  
export default RecetteList;
