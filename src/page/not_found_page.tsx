
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { BoutonLiens } from '../components/Bouton';

const PageNotFound: FunctionComponent = () => {

    return (
        <div className="d-flex justify-content-center flex-column">
            <div  className="d-flex justify-content-center">
                <img  className='rounded-circle shadow' style={{ width: '350px' }} src="../images/logoRecette-removebg-preview.png" alt="Page non trouvée" />
            </div>
            <h1 className='d-flex justify-content-center'style={{fontSize:'4.5rem', color:'#83C5BE' }}>Hey, cette page n'existe pas !</h1>
            <br />
            <Link to="/" className="waves-effect btn-flat" style={{fontSize:'2rem', color:' #c79d6f',textDecoration: 'none'}}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                &nbsp;Retourner à l'accueil
            </Link>
        </div>
    );
}

export default PageNotFound;