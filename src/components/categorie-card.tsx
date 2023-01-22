import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import '../css/bootstrap.css';
import '../css/categorie_card.css';
import { Categorie } from "../models/Categorie";


type Props = {
    categorie: Categorie
};

const CategorieCard: FunctionComponent<Props>= ({ categorie}) => {


    return (

            <div id="categarieCard"  className="col-12 col-sm-6 col-md-6 col-lg-3 ">
                <NavLink to={'recette/categorie/' + categorie.id} style={{textDecoration: 'none'}}>
                    <div className="card mt-4 px-3 custom-bg-vert custom-shadow-card custom-width-card scale">
                        <img src={categorie.urlPicture} className="card-img-top mt-2" alt="..."/>
                        <div className="card-body">
                            <h3 className="card-text text-light text-center">{categorie.name}</h3>
                        </div>
                    </div>
                </NavLink>
             </div>

    );
  }

  export default CategorieCard;