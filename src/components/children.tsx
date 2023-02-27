import { FunctionComponent } from 'react';
import '../css/children.css';
import { camelize } from '../utils/fonctions-utils';


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
type PropsTitreH2 = {
  titre: string,
  className?: string
};
export const TitreH2: FunctionComponent<PropsTitreH2> = ({ titre, className }) => {

  return (
    <main id="titreH2" className={className}>
      <h2>{camelize(titre)}</h2>
    </main>
  );
};

/****************** Composant titre  H3************************/
type PropsTitreH3 = {
  titre: string;
  className?: string
};
export const TitreH3: FunctionComponent<PropsTitreH5> = ({ titre, className }) => {

  return (
    <main id="titreH3">
      <h3 className={className}>{camelize(titre)}</h3>
    </main>
  );
};

/****************** Composant titre  H5************************/
type PropsTitreH5 = {
  titre: string;
  className?: string
};
export const TitreH5: FunctionComponent<PropsTitreH5> = ({ titre, className }) => {

  return (
    <main id="titreH5">
      <h5 className={className}>{camelize(titre)}</h5>
    </main>
  );
};





