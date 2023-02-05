import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, MouseEventHandler, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BoutonLiens } from './Bouton';

type Props = {
    id: number,
    click: MouseEventHandler

}

const DeleteModal: FunctionComponent<Props> = ({id, click}) => {
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    return (
        <>
            <div>
                <BoutonLiens href={'#'} icon={faTrash} onClick={handleShow}/>
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
                    <Button variant="danger" name={"supprimer"} onClick={click}>
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



