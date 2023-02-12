import { FunctionComponent, useEffect, useState } from "react";
import { Categorie } from "../models/Categorie";
import { getAllCategorie } from "../services/CategorieService";
import CategorieCard from "./categorie-card";



const CategorieList: FunctionComponent = () => {
    const [categories, setCategories] = useState<Categorie[]>([]);
    
    useEffect(() => {
      getAllCategorie().then(categories=> setCategories(categories))
    }, []);
    
    return (
            <div className="row">
              {categories.map(categorie => (
                <CategorieCard key={categorie.id} categorie={categorie} />
              ))}
            </div>
    );
  }
    
  export default CategorieList;
  