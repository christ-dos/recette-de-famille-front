import { FunctionComponent } from "react"

const BarreVerte : FunctionComponent = () => {

    return (
    <div className="container col-8 mb-3">
        <ul className="nav justify-content-center rounded-pill mt-5 custom-bg-vert">
            <li className="nav-item">
                <a className="nav-link disabled taillePolice text-light">Facile</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled taillePolice text-light">1h20</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled taillePolice text-light">5 personnes</a>
            </li>
        </ul>
    </div>
    )
}

export default BarreVerte;









