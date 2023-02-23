import { faTrashAlt, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import '../css/bouton.css';
import '../css/common.css';


/*********************************Bouton avec icone add********************* */
export const BoutonAdd: FunctionComponent = () => {

  return (
    <div id="btn_add">
      <Link
        className="btn  btn-circle btn-xl right custom-bg-vert" 
        to={'/recette/add'}>
        <i className="material-icons Large">add</i>
      </Link>
    </div>

  );
}

/*********************************Bouton  pour soumission de formulaire********************* */
type Props = {
  value: string,
  id?: string,
  name?: string
  type: string
}
export const BoutonClassique: FunctionComponent<Props> = ({ value, id, name, type }) => {

  return (

    <input
      type={type}
      className="btn btn-block btn-light border border-dark border-2"
      style={{
        boxShadow: '5px 5px 15px 5px #77A8CC',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: '#c79d6f'
      }}
      value={value}
      id={id}
      name={name}
    />
  );
}

type BtnLienProps = {
  href: string,
  icon: IconDefinition,
  onClick?: MouseEventHandler<SVGSVGElement>,
  className?: string
}
/*********************************Bouton lien avec rediection ********************* */
export const BoutonLiens: FunctionComponent<BtnLienProps> = ({ href, icon, onClick, className }) => {

  return (
    <>
      <div id="btn_lien" className='ps-1'>
        <Link
          className="btn btn-light border border-dark "
          style={{ width: '55px' }}
          to={href}
        >
          <FontAwesomeIcon
            icon={icon}
            onClick={onClick}
            className={className}
          /></Link>
      </div>

    </>
  );
}
/*********************************Bouton Modifier /supprimer********************* */
export const Boutons2: FunctionComponent = () => {

  return (
    <main>
      <div className="container d-flex flex-row-reverse mt-5 ">
        <div className="me-4" >
          <button type="button" className="btn custom-vert  "><FontAwesomeIcon icon={faPencilAlt} style={{ fontSize: '25' }} /></button>
        </div>
        <div className="pe-4">
          <button type="button" className="btn custom-vert "><FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '25' }} /></button>
        </div>
      </div>

    </main >
  )
}

/********************************* Fléche de retour ********************* */
export const Retour: FunctionComponent = () => {

  return (
    <main>
      <div className="container  mt-5 ">
        <div className="me-4" >
          <button type="button" className="btn custom-vert  ">
            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '30', color: '#83C5BE' }} />
          </button>
        </div>
      </div>
    </main>
  )
}

