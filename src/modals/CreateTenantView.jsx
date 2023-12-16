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

export default function CreateTenantView({ show, onClose, onTenantAdded, apartmentID }) {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [creditScore, setCreditScore] = useState('');
    const [salary, setSalary] = useState('');

    if (!show) { return null }

    const handleAddTenant = async () => {
        // Check if all inputs are filled
        if (!fullName || !email || !phone || !creditScore || !salary) {
            alert('Please fill in all fields');
            return;
        } else {
            if (!/^\d+$/.test(creditScore)) {
                alert("Please ensure Credit Score and Salary are integers.");
                return;
            } else if (creditScore < 0 || creditScore > 850) {
                alert("Please ensure Credit Score is between 0 and 850.");
                return;
            }

            if (!/^\d+$/.test(salary)) {
                alert("Please ensure Salary is an integer. No commas or $ symbol");
                return;
            } else if (salary < 0) {
                alert("Please ensure Salary is greater than 0.");
                return;
            }
        }

        const params = new URLSearchParams();
        params.append('fullName', fullName);
        params.append('email', email);
        params.append('phone', phone);
        params.append('creditScore', creditScore);
        params.append('salary', salary);
        params.append('aptID', apartmentID);

        try {
            // Making the API call
            const response = await axios.post('http://localhost:8080/tenants/add', params);
            console.log(response.data); // or handle the response as needed
            onTenantAdded()
            onClose(); // Close the modal on successful addition
        } catch (error) {
            console.error('Error adding tenant:', error);
            // Handle error
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add a New Tenant</h2>
                <span className="close" onClick={onClose}></span>
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <h4> Additional Information </h4>
                <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" placeholder="Credit Score" value={creditScore} onChange={(e) => setCreditScore(e.target.value)} />
                <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                <br />
                <br />
                <button onClick={handleAddTenant}>Add Tenant</button>
                <button onClick={onClose}> Cancel</button>

            </div>
        </div>
    );
};
