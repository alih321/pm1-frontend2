import React from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';
import "../css/main-styles.css";
import { useNavigate } from 'react-router-dom';

export default function UpdateApartmentView() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { apartmentID } = useParams();

    const [UnitCode, setUnitCode] = useState('');
    const [numOfBeds, setNumOfBeds] = useState('');
    const [numOfBaths, setNumOfBaths] = useState('');
    const [rent, setRent] = useState('');
    const [address, setAddress] = useState('');

    const [complexes, setComplexes] = useState([]);
    const [selectedComplexID, setSelectedComplexID] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/apartments/query/id=' + apartmentID)
            .then(response => {
                const data = response.data;
                setUnitCode(data.unitCode || "");
                setNumOfBeds(data.numOfBeds || "");
                setNumOfBaths(data.numOfBaths || "");
                setRent(data.rent || "");
                setAddress(data.address || "");
                setSelectedComplexID(data.complexID);

                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Axios error:', error);
                setError("Network Error: " + (error.response ? error.response.status : '') + " " + error.message);
                setLoading(false);
            });

        axios.get('http://localhost:8080/complexes/query/all')
            .then(response => {
                setComplexes(response.data);
            })
            .catch(error => {
                console.error('Error fetching complexes:', error);
            });

    }, [apartmentID]);

    const handleUpdateApartment = async () => {
        // Check if all inputs are filled
        if (!UnitCode || !numOfBeds || !numOfBaths || !rent) {
            alert('Please fill in all fields');
            return;
        } else {
            if (!/^\d+$/.test(numOfBeds) || !/^\d+$/.test(numOfBaths)) {
                alert("Please ensure Bedrooms and Bathrooms are an integer.");
                return;
            } else if (numOfBeds < 1 || numOfBaths < 1) {
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

        // Prepare the data for the API call
        const apartmentData = {
            "unitCode": UnitCode,
            "numOfBeds": numOfBeds,
            "numOfBaths": numOfBaths,
            rent,
            "complex": { "complexID": selectedComplexID }
        };

        console.log("Updating with:", apartmentData);
        // Then perform the axios PUT request

        try {
            // Making the API call
            const response = await axios.put('http://localhost:8080/apartments/update/id=' + apartmentID, apartmentData);
            console.log(response.data); // or handle the response as needed
            navigate("/");

        } catch (error) {
            console.error('Error adding apartment:', error);
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
                    <h3>Update: {address} </h3>
                    <h4> Basic Information </h4>
                    <div className="containerFlex">
                        <div className="flexVertical">
                            <p> Unit Code </p>
                            <input type="text" placeholder="Unit Code" value={UnitCode} onChange={(e) => setUnitCode(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p> Number of Bedrooms</p>
                            <input type="text" placeholder="Number of Bedrooms" value={numOfBeds} onChange={(e) => setNumOfBeds(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p> Number of Bathrooms </p>
                            <input type="text" placeholder="Number of Bathrooms" value={numOfBaths} onChange={(e) => setNumOfBaths(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p>Rent</p>
                            <input type="text" placeholder="Rent" value={rent} onChange={(e) => setRent(e.target.value)} />
                        </div>
                    </div>
                    <h4> Select a Complex </h4>
                    <select value={selectedComplexID} onChange={(e) => setSelectedComplexID(e.target.value)}>
                        <option value="">Select a Complex</option>
                        {complexes.map(complex => (
                            <option key={complex.complexID} value={complex.complexID}>
                                {complex.name}
                            </option>
                        ))}
                    </select>

                    <br />
                    <br />
                    <button onClick={handleUpdateApartment}>Update Apartment</button>
                    <button onClick={() => navigate(-1)}> Back </button>
                </div>
            </>
        );
    };
}
