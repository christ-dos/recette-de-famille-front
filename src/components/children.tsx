import { FunctionComponent } from 'react';
import '../css/children.css';


/****************** Composant Encart de présentation ************************/
export const BienvenueComponent: FunctionComponent = () => {
    
    return (
     <section id="presentation" className='row'>
      <div className="col-12 ">
      <p>Bonjour la Famille et les Amis,</p>
      <p>Bienvenue sur le site de recettes de la famille XXXX et compagnie! j'espère que vous trouverez tout ce que
          vous recherchez ici. Recettes portugaises, françaises ... sont à votre disposition afin de faire plaisir à
          vos papilles! Un grand merci aux taties, cousines, amies pour le partage de leurs si précieuses recettes!
      </p>
      </div>
        
    </section>
    );
  };

/****************** Composant titre  H2************************/
type PropsTitre = {
  titre: string;
};
  export const TitreH2: FunctionComponent<PropsTitre> = ({titre}) => {
    
    return (
      <main id="titreH2">
        <h2>{titre}</h2>
      </main>
    );
  };
  
/****************** Composant Form Group Input************************/
type AttributsInputProps = {
    id?: string,
    nom?: string,
    valeur?: string,
    type: string,
    placeHolder?: string,
    label?: string,
    error?: string
}
export const FormGroupInput: FunctionComponent<AttributsInputProps> = ({id, nom, valeur, type, placeHolder, label, error}) => {
    
  return (
    <div className="form-group row ">
      <label htmlFor= {id} className="col-md-2 col-lg-3 col-form-label form-control-label">{label}</label>
      <div className="col-lg-9 py-1">
          <input id={id} name={nom}  className="form-control "  style={{width: '100%'}} type={type}  value={valeur} placeholder={placeHolder}/>
          <p className="m-1">{error}</p>
      </div>
  </div>
  );
};

 