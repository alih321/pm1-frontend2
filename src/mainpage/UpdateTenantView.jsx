import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';
import "../css/main-styles.css";

export default function UpdateTenantView() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { tenantID } = useParams();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [creditScore, setCreditScore] = useState('');
    const [salary, setSalary] = useState('');

    const [apartments, setApartments] = useState([]);
    const [selectedApartmentID, setSelectedApartmentID] = useState('');


    useEffect(() => {
        axios.get('http://localhost:8080/tenants/query/id=' + tenantID)
            .then(response => {
                const data = response.data;
                setFullName(data.fullName);
                setEmail(data.email);
                setPhone(data.phone);
                setCreditScore(data.creditScore);
                setSalary(data.salary);
                setSelectedApartmentID(data.apartmentID);

                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Axios error:', error);
                setError("Network Error: " + (error.response ? error.response.status : '') + " " + error.message);
                setLoading(false);
            });

        axios.get('http://localhost:8080/apartments/query/all')
            .then(response => {
                setApartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching apartments:', error);
            });

        console.log('Selected Apartment ID:', selectedApartmentID);

    }, [tenantID]);

    const handleUpdateTenant = async () => {
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

        // Prepare the data for the API call
        const tenantData = {
            fullName,
            email,
            phone,
            creditScore,
            salary,
            apartment: { aptID: selectedApartmentID }
        };

        try {
            // Making the API call
            const response = await axios.put('http://localhost:8080/tenants/update/id=' + tenantID, tenantData);
            console.log(response.data); // or handle the response as needed
            navigate('/');

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
                    <h4> Contact Information </h4>
                    <div className="containerFlex">
                        <div className="flexVertical">
                            <p> Full Name </p>
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
                    </div>
                    <h4> Financials </h4>
                    <div className="containerFlex">
                        <div className="flexVertical">
                            <p> Credit Score </p>
                            <input type="text" placeholder="Credit Score" value={creditScore} onChange={(e) => setCreditScore(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p>Salary </p>
                            <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                        </div>
                    </div>
                    <h4> Apartment Info </h4>
                    <select value={selectedApartmentID} onChange={(e) => setSelectedApartmentID(e.target.value)}>
                        <option value="">Select an Apartment</option>
                        {apartments.map(apartment => (
                            <option key={apartment.aptID} value={apartment.aptID}>
                                {apartment.address}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <button onClick={handleUpdateTenant}>Update Tenant</button>
                    <button onClick={() => navigate(-1)}> Back </button>
                </div>
            </>
        );
    };
}
