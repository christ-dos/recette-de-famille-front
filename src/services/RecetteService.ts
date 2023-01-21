import axios from "axios";
import { Categorie } from "../models/Categorie";
import Recette from "../models/recette";

//Requetes sur le Contôleur Recette
   const urlRecette = 'http://localhost:8082/recette';

  export  async function getAllRecette(){
    const recettes = await axios.get<Recette[]>(urlRecette + '/all')
    return recettes.data;
   }

   export async function deleteRecetteById(id: number){
      const reponse = await axios.delete<Recette>(urlRecette + '/delete/' + id);
   }

   export async function findRecetteByCategorieId(id: number){
      const reponse = await axios.get<Recette[]>(urlRecette + '/find/categorie', {
         params : {
            id: id
        }
      });
      return reponse.data;
   }
   //Requetes sur le Contôleur Categorie
   const urlCategorie ='http://localhost:8082/categorie';

   export  async function getAllCategorie(){
      const categories = await axios.get<Categorie[]>(urlCategorie + '/all')
      return categories.data;
     }
  
 

//}

//export default new RecetteService();