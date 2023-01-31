import { getAllRecette } from "../services/RecetteService";
//import Recette from "./recette";

async function getRecettes() {
   const reponse = await getAllRecette();
   return reponse;
 }

 /*let RECETTES: Recette[] = [];
 const recettes = async () => {
   RECETTES = await getAllRecette();
   console.log(RECETTES);
   
}

recettes();

   
 
 
 /*[
 {
  id: 1,
  title: "Poulet Basquaise",
  urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
  totalTimePreparation: '60min',
  timePreparation:  '10min',
  cookingTime:  '50min',
  restTime:  '0min',
  stepPreparation:  'lorem bla bla bla',
  difficultyLevel:  'facile',
  numberOfPeople:  '4 personnes'
  
},
 {
    id: 2,
    title: "Bacalhau a Braz",
    urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes'
 },
 {
    id: 3,
    title: "Soupe haricots vert",
    urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes'
 },
 {
    id: 4,
    title: "Tarte tomate",
    urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes',
 },
 {
  id: 5,
  title: "Caldo verde",
  urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
  totalTimePreparation: '60min',
  timePreparation:  '10min',
  cookingTime:  '50min',
  restTime:  '0min',
  stepPreparation:  'lorem bla bla bla',
  difficultyLevel:  'facile',
  numberOfPeople:  '4 personnes'
 },
 {
  id: 6,
  title: "Canja de galinha",
  urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
  totalTimePreparation: '60min',
  timePreparation:  '10min',
  cookingTime:  '50min',
  restTime:  '0min',
  stepPreparation:  'lorem bla bla bla',
  difficultyLevel:  'facile',
  numberOfPeople:  '4 personnes'
 },
 {
    id: 7,
    title: "Bolo de Arroz",
    urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes',
  
 },
 {
    id: 8,
    title: "Bolo Rei",
    urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes'
 },
 {
    id: 9,
    title: "Pouler Basquaise",
    urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes'
 },
 {
    id: 10,
    title: "Pouler Basquaise",
    urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes'
 },
 {
    id: 11,
    title: "Pouler Basquaise",
    urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes'
 },
 {
  id: 12,
  title: "Pouler Basquaise",
  urlPicture: 'https://assets.afcdn.com/recipe/20160331/7225_origin.jpg',
  totalTimePreparation: '60min',
  timePreparation:  '10min',
  cookingTime:  '50min',
  restTime:  '0min',
  stepPreparation:  'lorem bla bla bla',
  difficultyLevel:  'facile',
  numberOfPeople:  '4 personnes'
 }
];*/
  
/*export default RECETTES;*/
