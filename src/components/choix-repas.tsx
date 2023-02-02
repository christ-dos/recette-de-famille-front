import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, FunctionComponent, MouseEvent } from "react";
import "../css/common.css"
import { TitreH2 } from "./children";
import RecetteCard from "./recette-card";
import ExempleRecetteCard from "./recette-card-exemple";

const ChoixRepas: FunctionComponent = () => {

    function rechercherParTitre(e: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }
    const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
    }

    return (
        <main>
            <TitreH2 titre={'Menu de la semaine'} />
            <form role="search"
                onSubmit={(e) => rechercherParTitre(e)}>
                <div className="mb-3 mt-5 d-flex justify-content-center">
                    <select className="form-select w-50 text-center" aria-label="Default select example">
                        <option selected >--Merci de selectionner un jour--</option>
                        <option value="1">Lundi</option>
                        <option value="2">Mardi</option>
                        <option value="3">Mercredi</option>
                        <option value="4">Jeudi</option>
                        <option value="5">Vendredi</option>
                        <option value="6">Samedi</option>
                        <option value="7">Dimanche</option>
                    </select>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <select className="form-select w-50 text-center" aria-label="Default select example">
                        <option selected className="text-center">--Merci de selectionner un repas--</option>
                        <option value="1">Déjeuner</option>
                        <option value="2">Diner</option>
                    </select>
                </div>
                <div className='mb-3 d-flex justify-content-center  '>
                    <div className='ms-5 mb-3 col-10 col-sm-6 col-md-4 col-lg-3  d-flex justify-content-center'>
                        <input className="form-control" type="search"
                            placeholder="Rechercher une recette"
                            aria-label="Search"
                            onChange={handleSearchTerm}
                            name="search"
                            id='search'
                        />
                    </div>
                    <div className=''>
                        <button className="btn custom-bleu " type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn custom-bg-vert text-light  ">Ajouter au menu</button>
                </div>
            </form>


            <div className="d-flex justify-content-center mt-3">
                <table className="table table-striped mt-5 w-75 ">
                    <thead>
                        <tr>
                            <th ></th>
                            <th  className="text-center">Déjeuner</th>
                            <th  className="text-center">Diner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="justify-content-center">
                            <th className="align-middle" >Lundi</th>
                            <td className=""><ExempleRecetteCard></ExempleRecetteCard></td>
                            <td className=""><ExempleRecetteCard></ExempleRecetteCard></td>

                        </tr>
                        <tr className="align-middle">
                            <th >Mardi</th>
                            <td></td>
                            <td></td>

                        </tr>
                        <tr className="align-middle">
                            <th >Mercredi</th>
                            <td ></td>
                            <td></td>
                        </tr>
                        <tr className="align-middle">
                            <th >Jeudi</th>
                            <td ></td>
                            <td></td>
                        </tr>
                        <tr className="align-middle">
                            <th >Vendredi</th>
                            <td ></td>
                            <td></td>
                        </tr>
                        <tr className="align-middle">
                            <th >Samedi</th>
                            <td ></td>
                            <td></td>
                        </tr>
                        <tr className="align-middle">
                            <th >Dimanche</th>
                            <td ></td>
                            <td></td>
                        </tr>
                    </tbody>

                </table>
            </div>




        </main>
    )
}

export default ChoixRepas;

function setSearchTerm(value: string) {
    throw new Error("Function not implemented.");
}

