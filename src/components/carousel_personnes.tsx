
import { FunctionComponent } from "react";
import '../css/carousel_personne.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons'
import { faLessThan } from '@fortawesome/free-solid-svg-icons'

const CarouselPersonnes: FunctionComponent = () => {
  
  
    return (
      <section id="carousel_personne" className="mb-5">
        <div className="carousel">
          <figure>
            <img src={"./images/personne1.jfif"} alt={"image d'une personne"}/>
            <img src={"./images/personne2.jfif"} alt="{image d'une personne}"/>
            <img src={"./images/personne3.jfif"} alt="{image d'une personne}"/>
            <img src={"./images/personne4.jfif"} alt="{image d'une personne}"/>
            <img src={"./images/personne5.jfif"} alt="{image d'une personne}"/>
            <img src={"./images/personne6.jfif"} alt="{image d'une personne}"/>
            <img src={"./images/personne7.jfif"} alt="{image d'une personne}"/>
            <img src={"./images/personne8.jfif"} alt="{image d'une personne}"/>
          </figure>
          <nav>
            <button className="nav prev"><FontAwesomeIcon icon={faLessThan} /></button>
            <button className="nav next"><FontAwesomeIcon icon={faGreaterThan} /></button>
          
          </nav>
      </div>
    </section>  

    
    );
  }
  
  export default CarouselPersonnes;
  