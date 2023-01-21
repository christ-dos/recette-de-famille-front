import axios from "axios";
import Recette from "../models/recette";

//class RecetteService {
   // const url = 'http://localhost:8082/recette';

  export  async function getAllRecette(){
    const recettes = await axios.get<Recette[]>('http://localhost:8082/recette/all')
    console.log('service:' + recettes.data);
    return recettes.data;
   }
 

//}

//export default new RecetteService();