export default class Recette {
    // 1. Typage des propiétés d'une recette.
    id: number;
    title: string;
    urlPicture: string;
    totalTimePreparation: string;
    timePreparation: string;
    cookingTime: string;
    restTime: string;
    stepPreparation:string;
    difficultyLevel:string;
    numberOfPeople:string;
     
    // 2. Définition des valeurs par défaut des propriétés d'une recette.
    constructor(
    id: number,
    title: string = 'ma recette',
    urlPicture: string =  './assets/gettyimages-1201586372-612x612.jpg',
    totalTimePreparation: '60min',
    timePreparation:  '10min',
    cookingTime:  '50min',
    restTime:  '0min',
    stepPreparation:  'lorem bla bla bla',
    difficultyLevel:  'facile',
    numberOfPeople:  '4 personnes'
    ) {
     
     this.id = id;
     this.title = title;
     this.urlPicture = urlPicture;
     this.totalTimePreparation = timePreparation;
     this.timePreparation = timePreparation;
     this.cookingTime = cookingTime;
     this.restTime= restTime;
     this.stepPreparation=  stepPreparation;
     this.difficultyLevel= difficultyLevel;
     this.numberOfPeople= numberOfPeople;
    
    }
   }