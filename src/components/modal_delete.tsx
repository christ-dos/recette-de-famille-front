import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteRecetteById } from '../services/RecetteService';

type Props = {
    id:number
}
const DeleteModal: FunctionComponent<Props> = ({id}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const effacerRecette= () => async deleteRecette();

    async function deleteRecette(id:number) {
        console.log(id);
       await deleteRecetteById(id);
       setShow(false);
    }

    return (
        <>
            <div className='ps-1' >
                <button className="btn btn-light border border-dark" onClick={handleShow} style={{ color:  '#c79d6f'}}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton  className='custom-bg-vert'>
                    <Modal.Title>Supprimer Recette</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{fontSize: '1.2rem'}} ><FontAwesomeIcon icon={faTriangleExclamation} style={{color: 'red', fontSize: '1.5rem'}}/>  Souhaitez vous vraiment supprimer cette recette?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="danger" onClick={()=>deleteRecette(id)}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
export default DeleteModal;

function getId(id:number){
  
}



