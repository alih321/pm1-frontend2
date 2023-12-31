import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import "../css/Modal.css"


export default function CreateComplexView({ show, onClose, onUpdate }) {

    const [complexName, setComplexName] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    if (!show) { return null }

    const handleAddComplex = async () => {
        // Check if all inputs are filled
        if (!complexName || !streetNumber || !streetName || !city || !state) {
            alert('Please fill in all fields');
            return;
        }

        const complexData = {
            "name": complexName,
            streetNumber,
            streetName,
            city,
            state
        };

        try {
            const response = await axios.post('http://localhost:8080/complexes/add', complexData);
            console.log(response.data);
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error adding complex:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create a New Complex</h2>
                <span className="close" onClick={onClose}></span>
                <input type="text" placeholder="Complex Name" value={complexName} onChange={(e) => setComplexName(e.target.value)} />
                <h4> Address </h4>
                <input type="text" placeholder="Street Number" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
                <input type="text" placeholder="Street Name" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                <br />
                <br />
                <button onClick={handleAddComplex}>Add Complex</button>
                <button onClick={onClose}> Cancel</button>

            </div>
        </div>
    );
};
