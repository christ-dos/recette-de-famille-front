import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteModal: FunctionComponent = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Button variant="danger" onClick={handleClose}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
export default DeleteModal;