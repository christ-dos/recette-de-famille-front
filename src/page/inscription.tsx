import { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/inscription.css';


export function Inscription() {
    const [isFamily, setIsFamily] = useState(false)
    return (

        <>
            <section id="inscription" className='container mx-auto mt-4'>
                <fieldset className="fieldset">
                    <legend className="legend">Inscription</legend>

                    <form action="" >
                        <div id="email" className="row g-3 align-items-center mb-2">
                            <div className='col-12 col-md-6 label-div'>
                                <label htmlFor="email" className="form-label ">Votre adresse e-mail* :</label>
                            </div>
                            <div className='col-12 col-md-6 d-flex mt-0' > 
                                <input className='form-control mx-4' type="email" name="email" id="mail"/>
                            </div>
                        </div>
                        <div id="nom" className="row g-3 align-items-center mb-2">
                            <div className='col-12 col-md-6 label-div'>
                                <label htmlFor="nom" className="form-label">Votre nom *:</label>
                            </div>
                            <div className='col-12 col-md-6 d-flex mt-0' > 
                                <input className='form-control mx-4' type="text" name="nom" id="nom"/>
                            </div>
                        </div>
                        <div id="prenom" className="row g-3 align-items-center mb-2">
                            <div className='col-12 col-md-6 label-div'>
                                <label htmlFor="prenom" className="form-label">Votre prénom *:</label>
                            </div>
                            <div className='col-12 col-md-6 d-flex mt-0'> 
                                <input className='form-control mx-4' type="text" name="prenom" id="prenom"/>
                            </div>
                        </div>
                        <div id="mdp" className="row g-3 align-items-center mb-2">
                            <div className='col-12 col-md-6 label-div'>
                                <label htmlFor="password" className="form-label">Votre mot de passe *:</label>
                            </div>
                            <div className='col-12 col-md-6 d-flex mt-0' > 
                                <input className='form-control mx-4' type="password" name="password" id="password"/>
                            </div>
                        </div>
                        <div id="mdp2" className="row g-3 align-items-center mb-3">
                            <div className='col-12 col-md-6 label-div'>
                                <label htmlFor="passwordconf" className="form-label">Confimer votre  mot de passe *:</label>
                            </div>
                            <div className='col-12 col-md-6 d-flex mt-0'> 
                                <input className='form-control mx-4' type="password" name="passwordconf" id="passwordconf"/>
                            </div>
                        </div>

                        <div id="check" className='row g-3 align-items-center mb-3 '>
                            <div className='col-12 col-md-6 label-div ps-0'>
                                <label htmlFor="check">Faites vous déjà partie d'une famille ?</label>
                            </div>
                            <div className='col-12 col-md-6 d-flex justify-content-center mt-0'> 
                                <input type="radio" id="oui" name="family" onClick={() => setIsFamily(true)}/>
                                <label className='me-3' htmlFor="check">Oui</label>

                                <input className='' type="radio" id="non" name="family" onClick={() => setIsFamily(false)}/>
                                <label htmlFor="check">Non</label>
                            </div>
                        </div>
                       
                        {isFamily && (
                            <>
                                 <div id="inscrit" className="row g-3 align-items-center mb-3">
                                    <div className='col-12 col-md-6 label-div'>
                                        <label htmlFor="code" className="form-label">Entrez votre code famille:</label>
                                    </div>
                                    <div className='col-12 col-md-6 d-flex mt-0'> 
                                        <input className='form-control mx-4' type="text" name="code" id="code"/>
                                    </div>
                                </div>
                                <div id="non-inscrit" className="row g-3 align-items-center mb-3">
                                    <div className='col-12 col-md-6 label-div'>
                                        <label htmlFor="newcode" className="form-label">Voici votre code famille:</label>
                                    </div>
                                    <div className='col-12 col-md-6 d-flex mt-0'> 
                                        <input className='form-control mx-4' type="text" name="newcode" id="newcode"/>
                                    </div>
                                </div>
                                <div id="invit" className="row g-3 align-items-center mb-3">
                                    <div className='col-12 col-md-6 label-div ps-0'>
                                        <label htmlFor="emailfam" className="form-label">Invitez les membres de votre famille :</label>
                                    </div>
                                    <div className='col-12 col-md-6 d-flex mt-0 '> 
                                        <input className='form-control mx-4' type="email" name="emailfam" id="emailfam"/>
                                    </div>
                                </div>
                            </>
                        )}

                        <div id="bouton">
                            <button type="submit" name="submit" id="button" className='btn btn-sm btn-light border border-dark custom-color-dore'>
                                Inscription
                            </button>
                        </div>
                    </form>
                </fieldset>
            </section>
            <section className="deuxieme row mt-3">
                <p className="col-6 d-flex justify-content-end pe-0">déjà inscrit ?</p>
                <Link to="/connexion" id="insc" className="col-6 d-flex justify-content-start ps-1">
                    Cliquez ici
                </Link>
            </section>
        </>
    )
}