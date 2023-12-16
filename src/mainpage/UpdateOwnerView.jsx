import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';
import "../css/main-styles.css";
import { CustomMultiSelect } from '../MultiSelect';
export default function UpdateOwnerView() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { ownerID } = useParams();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleComplexSelectionChange = (event) => {
        const selectedOptions = Array.from(event.target.options)
            .filter(option => option.selected)
            .map(option => option.value);
    };




    useEffect(() => {
        axios.get('http://localhost:8080/owners/query/id=' + ownerID)
            .then(response => {
                const data = response.data;
                setFullName(data.fullName);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);

                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Axios error:', error);
                setError("Network Error: " + (error.response ? error.response.status : '') + " " + error.message);
                setLoading(false);
            });

    }, [ownerID]);

    const handleUpdateOwner = async () => {
        // Check if all inputs are filled
        if (!fullName || !email || !phone || !address) {
            alert('Please fill in all fields');
            return;
        }

        // Prepare the data for the API call
        const ownerData = {
            fullName,
            email,
            phone,
            address
        };

        console.log(JSON.stringify(ownerData));

        try {
            // Making the API call
            const response = await axios.put('http://localhost:8080/owners/update/id=' + ownerID, ownerData);
            console.log(response.data); // or handle the response as needed
            navigate('/owners');

        } catch (error) {
            console.error('Error adding tenant:', error);
            // Handle error
        }
    };

    if (loading) return <div>Loading...</div>;
    else if (error) return <div> Error: {String(error)}</div>
    else {
        return (
            <>
                <h2 className="text-center"> Update View </h2>
                <div className="boxFull">
                    <h3>Update {fullName} </h3>
                    <div className="containerFlex">
                        <div className="flexVertical">
                            <p>Full Name</p>
                            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p> Email Address </p>
                            <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p> Phone Number </p>
                            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p> Address </p>
                            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <br />
                    <button onClick={handleUpdateOwner}>Update Owner</button>
                    <button onClick={() => navigate(-1)}> Back </button>
                </div>
            </>
        );
    };
}
