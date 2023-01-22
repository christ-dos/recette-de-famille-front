import axios from 'axios';
import { log } from 'console';
import { FunctionComponent, useEffect, useState } from 'react';
import { BoutonAdd } from '../components/Bouton';
import { TitreH2 } from '../components/children';
import RecetteCard from '../components/recette-card';
import RECETTES from '../models/mock-recettes';
import Recette from '../models/recette';
import { deleteRecetteById, getAllRecette } from '../services/RecetteService';

const RecetteList: FunctionComponent = () => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  

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

  useEffect(() => {
    
    getAllRecette().then(recettes=> setRecettes(recettes))
  
}, [recettes.length]);

async function deleteRecette(id: any): Promise<any> {
  console.log("click sur delete");
  await deleteRecetteById(id);
  getAllRecette().then(recettes=> setRecettes(recettes))
  
}
 
/*async function getRecettes() {
  const response = await getAllRecette();
  setRecettes(response);
}*/
  /*async function getAllRecette(){
    const recettes = await axios.get<Recette[]>('http://localhost:8082/recette/all')
    setRecettes(recettes.data);*/
    
  // setRecettes(recettes.data);

//}
 
  return (
    <>
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <TitreH2 titre={'Livre de Recettes'}/>
      </div>
      <div className="col-12 pe-4 d-flex justify-content-end">
          <BoutonAdd/>
      </div>
    </div>

    <div className="row mx-auto mt-4">
      {recettes.map(recette => (
        <RecetteCard key={recette.id} recette={recette}  />
      
         
        ))}
        
    </div>
    </> 
  );
}
  
export default RecetteList;
