import { ChangeEvent, FunctionComponent, useState } from "react";
import Recette from "../models/recette";

type Props = {
    recette: Recette
  };

type Field = {
    value: any,
    error?: string,
    isValid?: boolean
}

type Form ={
    titre: Field,
    ingredients: Field

}
    
  const RecetteForm: FunctionComponent<Props> = ({recette}) => {
    const [form, setForm] = useState<Form>({
        titre: {value: recette.title, isValid: true},
        ingredients: {value: ["tomate", "poulet"], isValid: true}
    }
    
    );

    
    const ingredients: string[] = [
      'tomate', 'poivron', 'farine', 'morue', 'poulet', 'pommme de terre',
      'pates', 'riz', 'oeufs', 'lait', 'sucre'
    ];

    const hasType= (ingredient: string): boolean => {
        return form.ingredients.value.includes(ingredient);
    }

    const handleInputCanges = (e: ChangeEvent<HTMLInputElement>)=>{
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = {
            [fieldName]: { value: fieldValue },
            value: undefined
        };
        console.log(newField);
        

        setForm({...form, ...newField});

    }
     

    return (
      <form>
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card"> 
                <img className="card-img-top" src={recette.urlPicture} alt={recette.title} style={{width: '250px', margin: '0 auto'}}/>
              <div className="card-stacked">
                <div className="card-body">
                  {/* recette titre */}
                  <div className="form-group">
                    <label htmlFor="titre">Titre</label>
                    <input id="titre" type="text" className="form-control" name="titre" value={form.titre.value} onChange={e=> handleInputCanges(e)}></input>
                  </div>
                  {/* Pokemon types */}
                  <div className="form-group">
                    <label>Ingredients</label>
                    {ingredients.map(ingredient => (
                      <div key={ingredient} style={{marginBottom: '10px'}}>
                        <label>
                          <input id={ingredient} type="checkbox" className="filled-in" value={ingredient} checked = {hasType(ingredient)}></input>
                          <span>
                            <p >{ ingredient }</p>
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>

                </div>
                <div className="card-action center">
                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary">Valider</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };
     
  export default RecetteForm;