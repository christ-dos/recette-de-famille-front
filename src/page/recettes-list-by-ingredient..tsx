
import { faArrowCircleLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TitreH2 } from '../components/children';
import RecetteCard from '../components/recette-card';
import Recette from '../models/recette';
import { deleteRecetteById, findRecetteByIngredientId } from '../services/RecetteService';



const RecetteListByIngredient: FunctionComponent = ({ }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const tabPath = window.location.pathname.split('/');

  //console.log(window.location.pathname.split('/'));
  //console.log(tabPath[3]);

  async function deleteById(id: number) {
    await deleteRecetteById(id);
    findRecetteByIngredientId(+tabPath[3]).then(recettes => setRecettes(recettes));
  }

  useEffect(() => {
    findRecetteByIngredientId(+tabPath[3]).then(recettes => setRecettes(recettes));
  }, []);

  const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>)=>{
    let value = e.target.value;
    console.log(value);
    
    value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
  }

  return (
    <>
      {/* ******************* input search ****************************/}
      <div className='mt-2'>
          <form className="row d-flex flex-row justify-content-end" role="search">
            <div className='col-10 col-sm-6 col-md-4 col-lg-3 pe-0'>
              <input className="form-control" type="search"
                      placeholder="Rechercher une recette"
                      aria-label="Search"
                      onChange={handleSearchTerm}
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
          <TitreH2 titre={'Recherche par Ingredient'} />
        </div>
        <div>
          <Link to={'/'}>
            <FontAwesomeIcon className='d-flex justify-content-start custom-vert ps-3' icon={faArrowCircleLeft} style={{ fontSize: '60px' }} />
          </Link>
        </div>
      </div>

       {/* ******************* Liste des recettes par ingredient****************************/}
      <div className="row mx-auto mt-4">
        {
        recettes
        .filter((recette)=>
          recette.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(recette => (
          <RecetteCard key={recette.id} recette={recette} click={() => deleteById(recette.id)} />
        ))}
      </div>
    </>
  );
}

export default RecetteListByIngredient;



