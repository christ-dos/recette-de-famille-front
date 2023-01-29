import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoutonAdd } from '../components/Bouton';
import { TitreH2 } from '../components/children';
import RecetteCard from '../components/recette-card';
import Recette from '../models/recette';
import { deleteRecetteById, findRecetteByTitle, getAllRecette } from '../services/RecetteService';

const RecetteList: FunctionComponent = () => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    getAllRecette().then(recettes=> setRecettes(recettes))
  }, []);

  async function deleteById(id: number) {
    await deleteRecetteById(id);
    getAllRecette().then(recettes=> setRecettes(recettes))
  }

  const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>)=>{
   
    let value = e.target.value;
    value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
  }

  async function rechercherParTitre(e: any) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titre  = "%" + form.search.value + "%";
    console.log(titre);
  
    findRecetteByTitle(titre).then(recettes=> setRecettes(recettes))
    
  }

  return (
    <>
     {/* ******************* input search ****************************/}
    <div className='mt-2'>
        <form   
          className="row d-flex flex-row justify-content-end" 
          role="search"
          onSubmit={(e) => rechercherParTitre(e)}
          >
          <div className='col-10 col-sm-6 col-md-4 col-lg-3 pe-0'>
            <input className="form-control" type="search"
                    placeholder="Rechercher une recette"
                    aria-label="Search"
                    onChange={handleSearchTerm}
                    name="search"
                    id='search'
              />
          </div>
          <div className='col-2 col-sm-1 d-flex justify-content-md-end ps-0'>
            <button className="btn custom-bleu " type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
          </div> 
      </form>
    </div>

    {/* ******************* Titre et bouton add ****************************/}
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <TitreH2 titre={'Livre de Recettes'}/>
      </div>
      <div className="col-12 pe-4 d-flex justify-content-end">
        <Link to={'/recette/add'}>
          <BoutonAdd />
        </Link>
      </div>
    </div>

    {/* ******************* Liste de recettes****************************/}
    <div className="row mx-auto mt-4">
      {
        recettes
          .filter((recette)=>
            recette.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(recette => (
            <RecetteCard key={recette.id} recette={recette} click={() => deleteById(recette.id)}/>
            )) 
      }
       <h4 className="center" hidden={recettes.length !== 0}>Aucune Recette à afficher !</h4>
    </div>
    </> 
  );
}
  
export default RecetteList;
