import axios from "axios";
import { Ingredient } from "../models/Ingredient";


  const urlIngredient ='http://localhost:8082/ingredient';

  export  async function getAllIngredient() : Promise<Ingredient[]>{
     const ingredients = await axios.get<Ingredient[]>(urlIngredient + '/all')
  
     return ingredients.data;
    }
 
 