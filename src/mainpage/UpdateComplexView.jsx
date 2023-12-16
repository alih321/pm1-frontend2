import React from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useEffect } from 'react';
import "../css/main-styles.css";
import { useNavigate } from 'react-router-dom';

export default function UpdateComplexView() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { complexID } = useParams();

    const [complexName, setComplexName] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/complexes/query/id=' + complexID)
            .then(response => {
                const data = response.data;
                setComplexName(data.name);
                setStreetNumber(data.streetNumber);
                setStreetName(data.streetName);
                setCity(data.city);
                setState(data.state);

                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Axios error:', error);
                setError("Network Error: " + (error.response ? error.response.status : '') + " " + error.message);
                setLoading(false);
            });
    }, [complexID]);

    const handleUpdateComplex = async () => {
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
            const response = await axios.put('http://localhost:8080/complexes/update/id=' + complexID, complexData);
            console.log(response.data);
            navigate('/');

        } catch (error) {
            console.error('Error adding complex:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    else if (error) return <div> Error: {String(error)}</div>
    else {
        return (
            <>
                <h2 className="text-center"> Update View </h2>
                <div className="boxFull">
                    <h3>Update {complexName} </h3>
                    <div className="containerFlex">
                        <div className="flexVertical">
                            <p>Complex Name</p>
                            <input type="text" placeholder="Complex Name" value={complexName} onChange={(e) => setComplexName(e.target.value)} />
                        </div>
                    </div>
                    <h4> Address </h4>
                    <div className="containerFlex">
                        <div className="flexVertical">
                            <p>Street Number </p>
                            <input type="text" placeholder="Street Number" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p>Street Name</p>
                            <input type="text" placeholder="Street Name" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p> City </p>
                            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="flexVertical">
                            <p>State</p>
                            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <br />
                    <button onClick={handleUpdateComplex}>Update Complex</button>
                    <button onClick={() => navigate(-1)}> Back </button>
                </div>
            </>
        );
    };
}
