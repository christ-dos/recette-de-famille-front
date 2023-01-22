
import { NOTFOUND } from 'dns';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AjoutRecettePage from './page/Ajout-recette-page';
import HomePage from './page/home-page';
import PageNotFound from './page/not_found_page';
import ProfilePage from './page/Profile-page';
import RcetteDetail from './page/recette-details';
import RecetteList from './page/recettes-list';
import RecetteListByCategorie from './page/recettes-list-by-categorie';
import RecetteListByIngredient from './page/recettes-list-by-ingredient.';



const App: React.FC = () => {
  return(
    
      <Router>
        <div>
          {/*  la barre de navigation commun a ttes les pages*/}
          <nav id="nav_barre_principal" className='bg-primary'>
            <h2>Ma nav Barre</h2>
            <div> 
              <ul>
                <li><Link to="/" className="text-black">Home</Link></li>
                <li> <Link to="/livrerecettes" className="text-black">livrerecettes</Link></li>
                <li><Link to="/recettes/:id" className="text-black">DetailsREcette</Link></li>
                <li><Link to="/profile" className="text-black">Profile</Link></li>
                <li><Link to="/recette/add" className="text-black">Ajouter Recette</Link></li>

              
              </ul>
             
             
            </div>
          </nav>
          <div className='container'>
          {/* le systeme de gestion* de notre application*/}
            

            <Switch>
              <Route  exact path="/" component={HomePage}/> 
              <Route  exact path="/livrerecettes" component={RecetteList}/> 
              <Route  path="/recettes/:id" component={RcetteDetail}/> 
              <Route  path="/profile" component={ProfilePage}/> 
              <Route  path="/recette/add" component={AjoutRecettePage}/> 
              <Route  path="/recette/categorie/:id" component={RecetteListByCategorie}/> 
              <Route  path="/recette/ingrdient/:id" component={RecetteListByIngredient}/> 
              <Route  path="/*" component={PageNotFound}/> 
            </Switch>

          </div>
      </div>
    </Router>
  )
}

export default App;
