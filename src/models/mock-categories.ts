import { Categorie } from "./Categorie";
import { CategorieEnum } from "./CategorieEnum";

   
const CATEGORIES: Categorie[] = [
 {
  id: 1,
  name: CategorieEnum.APERITIFS,
  urlPicture: './images/apero.jpg',
},
{
   id: 2,
   name: CategorieEnum.ENTREES,
   urlPicture: './images/entree.jpg',
 },
 {
   id: 3,
   name: CategorieEnum.DESSERTS,
   urlPicture: './images/dessert.jpg',
 },
 {
   id: 4,
   name: CategorieEnum.PLATS,
   urlPicture: './images/plat.jpg',
 },
 
];
  
export default CATEGORIES;
