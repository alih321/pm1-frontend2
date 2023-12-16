import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import "../css/Modal.css"
import { CustomMultiSelect } from '../MultiSelect';


export default function CreateOwnerView({ show, onClose, onUpdate }) {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [error, setError] = useState('');

    const [complexes, setComplexes] = useState([]); // Assuming this is provided or fetched
    const [selectedComplexes, setSelectedComplexes] = useState([]);

    const fetchComplexes = () => {
        axios.get('http://localhost:8080/complexes/query/all')
            .then(response => {
                const data = response.data;
                setComplexes(data);
                console.log(data);

            })
            .catch(error => {
                console.error('Axios error:', error);
                setError("Network Error: " + (error.response ? error.response.status : '') + " " + error.message);
            });

    }

    useEffect(() => {
        fetchComplexes();
    }, []);

    if (!show) { return null }


    const handleComplexSelectionChange = (event) => {
        // Convert selected options to an array
        const selectedOptions = Array.from(event.target.options)
            .filter(option => option.selected)
            .map(option => option.value);
        setSelectedComplexes(selectedOptions);
        console.log(selectedOptions);
    };


    const handleAddOwner = async () => {
        // Check if all inputs are filled
        if (!fullName || !email || !phone || !address) {
            alert('Please fill in all fields');
            return;
        }

        const params = new URLSearchParams();
        params.append('fullName', fullName);
        params.append('email', email);
        params.append('phone', phone);
        params.append('address', address);
        params.append('complexIDs', selectedComplexes)

        try {
            // Making the API call
            const response = await axios.post('http://localhost:8080/owners/add', params);
            console.log(response.data); // or handle the response as needed
            onUpdate()
            onClose(); // Close the modal on successful addition
        } catch (error) {
            console.error('Error adding owner:', error);
            // Handle error
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add a New Owner</h2>
                <span className="close" onClick={onClose}></span>
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

                <h4> What Complexes do they own? </h4>
                <CustomMultiSelect
                    options={complexes}
                    selectedValues={selectedComplexes}
                    onChange={setSelectedComplexes}
                    valueKey="complexID"
                    labelKey="name"
                />

                {/* <select multiple value={selectedComplexes} onChange={handleComplexSelectionChange}>
                    <option key={-1}> None </option>
                    {complexes.map(complex => (
                        <option key={complex.complexID} value={complex.complexID}>
                            {complex.name}
                        </option>
                    ))}
                </select> */}


                <br />
                <br />
                <button onClick={handleAddOwner}>Add Owner</button>
                <button onClick={onClose}> Cancel</button>

            </div>
        </div>
    );
};
