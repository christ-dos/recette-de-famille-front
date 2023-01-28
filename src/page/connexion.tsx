import React from "react";
import { Link } from "react-router-dom";
import { BoutonClassique } from "../components/Bouton";
import '../css/common.css';
import '../css/connexion.css'


function Connexion() {
    return (
        <>
            <section id="connexion" className='container mx-auto mt-4'>
                <fieldset className="fieldset">
                    <legend className="legend">Connexion</legend>

                    <form action="">
                        <div id="emailCo" className="row g-3 align-items-center mb-2">
                            <div className='col-12 col-md-6 col-lg-4'>
                                <label htmlFor="mail" className="form-label ">Adresse e-mail* :</label>
                            </div>
                            <div className='col-12 col-md-6 col-lg-8  d-flex mt-0' >
                                <input className='form-control mx-4' type="email" name="email" id="mail" />
                            </div>
                        </div>
                        <div id="mdpCo" className="row g-3 align-items-center mb-2">
                            <div className='col-12 col-md-6  col-lg-4'>
                                <label htmlFor="password" className="form-label "> mot de passe* :</label>
                            </div>
                            <div className='col-12 col-md-6  col-lg-8 d-flex mt-0' >
                                <input className='form-control mx-4' type="password" name="password" id="password" />
                            </div>
                        </div>
                        <div className="deuxieme row mt-3">
                            <p className="col-6 d-flex justify-content-end pe-0">mot de passe oublié ?</p>
                            <Link to="#" id="insc" className="col-6 d-flex justify-content-start ps-1">
                                Cliquez ici
                            </Link>
                        </div>

                        <div id="boutonCo">
                            <BoutonClassique value={"Connexion"} id="buttonCo" type="submit" name="buttonCo" />
                        </div>

                    </form>
                </fieldset>
            </section>
            <section className="deuxieme row mt-3" style={{ fontSize: "18px" }}>
                <p className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end pe-0">Pas encore inscrit ?</p>
                <Link to="/inscription" id="insc"
                    className="col-12 col-md-6 d-flex justify-content-center  justify-content-md-start ps-1">
                    Cliquez ici
                </Link>
            </section>

        </>
    )

}

export default Connexion;