import { FunctionComponent, useState } from 'react';
import CarouselIngrdients from '../components/carousel_ingredient';
import CarouselPersonnes from '../components/carousel_personnes';
import CategorieList from '../components/categorie-list';
import { BienvenueComponent, TitreH2 } from '../components/children';
import Recette from '../models/recette';





const HomePage: FunctionComponent = () => {
  

  return (
    <>
      <BienvenueComponent />

      <TitreH2 titre={"Pour que votre savoir faire perdure ..."} />
      <CategorieList />

      <TitreH2 titre={"De quoi avez vous envie ?"} />
      <CarouselIngrdients />

      <TitreH2 titre={"Qui cuisine aujourd'hui ?"} />
      <CarouselPersonnes/>
    </>
  );
}

export default HomePage;

