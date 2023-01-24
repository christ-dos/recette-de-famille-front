import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div id="header" className="container-fluid sticky-top" style={{width: "100%"}}>
            <section className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xxl-12 ">
                    <nav className="navbar bg-light" style={{backgroundImage: 'url("../images/mosaique.jpg")'}}>
                        <div className="container-fluid d-flex justify-content-center">
                            <Link to="/" className="navbar-brand">
                                <img src={"../images/logoRecette-removebg-preview.png"} alt="Logo" width="120" height="120"
                                     className="d-inline-block align-center rounded-circle custom-shadow"/>
                            </Link>
                        </div>
                    </nav>
                    <nav className="navbar navbar-expand-lg bg-light">
                        <div className="container-fluid">
                            <Link className="navbar-brand custom-vert" href="/" to={"/"}>Recette de famille</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item ">
                                        <Link className="nav-link active custom-bleu " aria-current="page"
                                        href="#" to={"/livrerecettes"}>Livre de recette</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active custom-bleu" href="#" to={""}>Menu de la
                                            semaine</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link custom-bleu" href="#" to={"/profile"}>Profil</Link>
                                    </li>
                                </ul>
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2  " type="search"
                                           placeholder="Rechercher une recette"
                                           aria-label="Search"/>
                                    <button className="btn custom-bleu  " type="submit">
                                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                        </button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>

            </section>
        </div>
    )
};

export default Header;