
import { log } from 'console';
import React, { ChangeEvent, ChangeEventHandler, FunctionComponent, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CustomRoutes from './components/CustomRoutes';
import Footer from './components/Footer';
import Header from './components/Header';
import AjoutRecettePage from './page/Ajout-recette-page';
import Connexion from './page/connexion';
import HomePage from './page/home-page';
import { Inscription } from './page/inscription';
import PageNotFound from './page/not_found_page';
import ProfilePage from './page/Profile-page';
import RecetteDetail from './page/recette-details';
import RecetteList from './page/recettes-list';
import RecetteListByCategorie from './page/recettes-list-by-categorie';
import RecetteListByIngredient from './page/recettes-list-by-ingredient.';


const App: FunctionComponent = () => {
  

  return (

    <Router>
      <Header/>
      <div>
        <div className='container'>
          {/* le systeme de gestion* de notre application */}
            <CustomRoutes/>
        </div>
      </div>
      <Footer/>
    </Router>
  )
}

export default App;
