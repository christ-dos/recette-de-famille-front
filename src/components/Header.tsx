import React, { FunctionComponent } from "react"
import { Link } from "react-router-dom";



const Header: FunctionComponent = () => {
    return (
        <div id="header" className="container-fluid sticky-top" style={{ width: "100%" }}>
            <section className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xxl-12 ps-0 pe-0">
                    <nav className="navbar bg-light" style={{ backgroundImage: 'url("../images/mosaique.jpg")' }}>
                        <div className="container-fluid d-flex justify-content-center">
                            <Link to="/" className="navbar-brand">
                                <img src={"../images/logoRecette-removebg-preview.png"} alt="Logo" width="120" height="120"
                                    className="d-inline-block align-center rounded-circle custom-shadow" />
                            </Link>
                        </div>
                    </nav>
                    <nav className="navbar navbar-expand-lg bg-light">
                        <div className="container-fluid">
                            <Link className="navbar-brand custom-vert" to={"/"}>Recette de famille</Link>
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
                                            to={"/livrerecettes"}>Livre de recette</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active custom-bleu" to={"/planning"}>Menu de la
                                            semaine</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link custom-bleu" to={"/profile"}>Profil</Link>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </div>

            </section>
        </div>
    )
};

export default Header;