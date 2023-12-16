import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import "../css/Modal.css"

/*

const [showModal, setShowModal] = useState(false);

const openModal = () => setShowModal(true);
const closeModal = () => setShowModal(false);

<button onClick={openModal}>Open Modal</button>
<Modal show={showModal} onClose={closeModal}>
    <p>Modal Content Here</p>
</Modal>


*/

export default function CreateUnitView({ show, onClose, onUnitAdded, selectedComplex }) {

    const [unitCode, setUnitCode] = useState('');
    const [numBeds, setNumBeds] = useState();
    const [numBaths, setNumBaths] = useState();
    const [rent, setRent] = useState();

    if (!show) { return null }

    const handleAddUnit = async () => {
        // Check if all inputs are filled
        if (!unitCode || !numBeds || !numBaths || !rent) {
            alert('Please fill in all fields');
            return;
        } else {
            if (!/^\d+$/.test(numBeds) || !/^\d+$/.test(numBaths)) {
                alert("Please ensure Bedrooms and Bathrooms are an integer.");
                return;
            } else if (numBeds < 1 || numBaths < 1) {
                alert("Please ensure Bedrooms and Bathrooms are greater than 0.");
                return;
            }

            if (!/^\d+$/.test(rent)) {
                alert("Please ensure Rent is an integer. No commas or $ symbol");
                return;
            } else if (rent < 0) {
                alert("Please ensure Rent is greater than 0.");
                return;
            }
        }


        const params = new URLSearchParams();
        params.append('unitCode', unitCode);
        params.append('numOfBeds', numBeds);
        params.append('numOfBaths', numBaths);
        params.append('rent', rent);
        params.append('complexID', selectedComplex.complexID);

        try {
            // Making the API call
            const response = await axios.post('http://localhost:8080/apartments/add', params);
            console.log(response.data); // or handle the response as needed
            onUnitAdded()
            onClose(); // Close the modal on successful addition
        } catch (error) {
            console.error('Error adding apartment:', error);
            // Handle error
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add a New Unit</h2>
                <span className="close" onClick={onClose}></span>
                <h4> Complex: {selectedComplex.name} </h4>
                <input type="text" placeholder="Unit Code" value={unitCode} onChange={(e) => setUnitCode(e.target.value)} />
                <h4> Information </h4>
                <input type="text" placeholder="# of Bedrooms" value={numBeds} onChange={(e) => setNumBeds(e.target.value)} />
                <input type="text" placeholder="# of Bathrooms" value={numBaths} onChange={(e) => setNumBaths(e.target.value)} />
                <input type="text" placeholder="Rent" value={rent} onChange={(e) => setRent(e.target.value)} />
                <br />
                <br />
                <button onClick={handleAddUnit}>Add Unit</button>
                <button onClick={onClose}> Cancel</button>

            </div>
        </div>
    );
};
