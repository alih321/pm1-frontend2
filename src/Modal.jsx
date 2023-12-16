import React from 'react';
import "./css/Modal.css"

/*

const [showModal, setShowModal] = useState(false);

const openModal = () => setShowModal(true);
const closeModal = () => setShowModal(false);

<button onClick={openModal}>Open Modal</button>
<Modal show={showModal} onClose={closeModal}>
    <p>Modal Content Here</p>
</Modal>


*/

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};


export default Modal;
