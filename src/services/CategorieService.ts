import axios from "axios";
import { Categorie } from "../models/Categorie";


  const urlCategorie ='http://localhost:8082/categorie';

  export  async function getAllCategorie() : Promise<Categorie[]>{
     const categories = await axios.get<Categorie[]>(urlCategorie + '/all')
     return categories.data;
    }
 
 