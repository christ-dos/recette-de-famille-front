import React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { Categorie } from "../models/Categorie";
import CATEGORIES from "../models/mock-categories";
import CategorieCard from "./categorie-card";



const CategorieList: FunctionComponent = () => {
    const [categories, setCategories] = useState<Categorie[]>([]);
    
    useEffect(() => {
        setCategories(CATEGORIES);
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
  