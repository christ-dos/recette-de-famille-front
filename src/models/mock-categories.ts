import { Categorie } from "./Categorie";
import { CategorieEnum } from "./CategorieEnum";

   
const CATEGORIES: Categorie[] = [
 {
  id: 1,
  name: CategorieEnum.APERITIFS,
  url: './images/apero.jpg',
},
{
   id: 2,
   name: CategorieEnum.ENTREES,
   url: './images/entree.jpg',
 },
 {
   id: 3,
   name: CategorieEnum.DESSERTS,
   url: './images/dessert.jpg',
 },
 {
   id: 4,
   name: CategorieEnum.PLATS,
   url: './images/plat.jpg',
 },
 
];
  
export default CATEGORIES;
