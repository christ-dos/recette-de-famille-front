import { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import AjoutRecettePage from "../page/Ajout-recette-page";
import Connexion from "../page/connexion";
import RecetteEdit from "../page/Edit-recette-page";
import HomePage from "../page/home-page";
import { Inscription } from "../page/inscription";
import PageNotFound from "../page/not_found_page";
import ProfilePage from "../page/Profile-page";
import RecetteDetail from "../page/recette-details";
import RecetteList from "../page/recettes-list";
import RecetteListByCategorie from "../page/recettes-list-by-categorie";
import RecetteListByIngredient from "../page/recettes-list-by-ingredient.";

const CustomRoutes: FunctionComponent = () => {

    return (
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/livrerecettes" component={RecetteList}/>
        <Route exact path="/recettes/:id" component={RecetteDetail} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/recette/add" component={AjoutRecettePage} />
        <Route exact path="/recette/categorie/:id" component={RecetteListByCategorie} />
        <Route exact path="/recette/ingrdient/:id" component={RecetteListByIngredient} />
        <Route exact path="/inscription" component={Inscription} />
        <Route exact path="/connexion" component={Connexion} />
        <Route exact path="/recettes/edit/:id" component={RecetteEdit} />
        <Route exact path="/*" component={PageNotFound} />
      </Switch>

    );
   

}
export default CustomRoutes;