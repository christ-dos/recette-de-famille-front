
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import AjoutRecettePage from './page/Ajout-recette-page';
import Connexion from './page/connexion';
import HomePage from './page/home-page';
import { Inscription } from './page/inscription';
import PageNotFound from './page/not_found_page';
import ProfilePage from './page/Profile-page';
import RcetteDetail from './page/recette-details';
import RecetteList from './page/recettes-list';
import RecetteListByCategorie from './page/recettes-list-by-categorie';
import RecetteListByIngredient from './page/recettes-list-by-ingredient.';



const App: React.FC = () => {
  return (

    <Router>
      <Header />
      <div>
        <div className='container'>
          {/* le systeme de gestion* de notre application*/}

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/livrerecettes" component={RecetteList} />
            <Route path="/recettes/:id" component={RcetteDetail} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/recette/add" component={AjoutRecettePage} />
            <Route path="/recette/categorie/:id" component={RecetteListByCategorie} />
            <Route path="/recette/ingrdient/:id" component={RecetteListByIngredient} />
            <Route path="/inscription" component={Inscription} />
            <Route path="/connexion" component={Connexion} />
            <Route path="/*" component={PageNotFound} />
          </Switch>

        </div>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
