import axios from "axios";
import { Recette } from "../models/recette";

//Requetes sur le Contôleur Recette
   const urlRecette = 'http://localhost:8082/recette';

  export  async function getAllRecette() : Promise<Recette[]>{
    const recettes = await axios.get<Recette[]>(urlRecette + '/all')
    return recettes.data;
   }

   export  async function getAllRecettePagine(page: number, size:number) : Promise<Recette[]>{
      const recettes = await axios.get<Recette[]>(urlRecette + '/all', 
      {
         params : {
            page: page,
            size:size
        }
      });
      console.log(recettes.data);
      return recettes.data;
     }

   export async function deleteRecetteById(id: number){
      const reponse = await axios.delete<Recette>(urlRecette + '/delete/' + id);
   }

   export async function findRecetteByCategorieId(id: number) : Promise<Recette[]>{
      const reponse = await axios.get<Recette[]>(urlRecette + '/find/categorie', {
         params : {
            id: id
        }
      });
      return reponse.data;
   }

   export async function findRecetteByTitle(titre: string): Promise<Recette[]>{
      const reponse = await axios.get<Recette[]>(urlRecette + '/find/title', {
         params : {
            title: titre
        }
      });

      return reponse.data;

   }

   export async function findRecetteByTitleAndCategorieId(id: number,titre: string): Promise<Recette[]>{
      const reponse = await axios.get<Recette[]>(urlRecette + '/find/categorie/title', {
         params : {
            title: titre,
            id: id
        }
      });

      return reponse.data;

   }

   export async function findRecetteByTitleAndIngredientId(id: number,titre: string): Promise<Recette[]>{
      const reponse = await axios.get<Recette[]>(urlRecette + '/find/ingredient/title', {
         params : {
            title: titre,
            id: id
        }
      });

      return reponse.data;

   }

   export async function getRecetteById(id: number): Promise<Recette> {
      const reponse = await axios.get<Recette>(urlRecette + '/find/' + id);
      return reponse.data;
    }

    export async function findRecetteByIngredientId(id: number): Promise<Recette[]> {
      const reponse = await axios.get<Recette[]>(urlRecette + '/find/ingredient/' + id);
      return reponse.data;
    }
    
  
  