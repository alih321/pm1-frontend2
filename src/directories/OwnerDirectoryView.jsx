import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/main-styles.css";
import axios from "axios";
import CreateOwnerView from "../modals/CreateOwnerView";
import { OwnerItem } from "./OwnerItem";

function OwnerDirectoryView() {
    const [ownerList, setOwnerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
    const openAddOwnerModal = () => setShowAddOwnerModal(true);
    const closeAddOwnerModal = () => setShowAddOwnerModal(false);

    const [nameFilter, setNameSearch] = useState('');
    const [emailFilter, setEmailSearch] = useState('');

    const handleNameSearchChange = (event) => {
        setNameSearch(event.target.value);
    }

    const handleEmailSearchChange = (event) => {
        setEmailSearch(event.target.value);
    }

    const fetchOwners = () => {
        axios.get('http://localhost:8080/owners/query/all')
            .then(response => {
                const data = response.data;
                console.log(data);

                if (data == null) {
                    setError("Owners do not exist.");
                } else {
                    setOwnerList(data);
                }
            })
            .catch(error => {
                console.error("Axios error:", error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    useEffect(() => {
        fetchOwners();
    }, []);

    if (loading) return <div>Loading...</div>;
    else if (error) return <div>Error: {String(error)}</div>;
    else {
        return (
            <>
                <CreateOwnerView show={showAddOwnerModal} onClose={closeAddOwnerModal} onUpdate={fetchOwners} />

                <h2 className="text-center"> Owner Directory </h2>
                <div className="boxFull">
                    <div>
                        <div className="text-right">
                            <button onClick={() => setShowAddOwnerModal(true)}> Add Owner </button>
                            <hr />
                        </div>
                        <div className="text-center">
                            <input type="text" placeholder="Name" onChange={handleNameSearchChange} />
                            <input type="text" placeholder="Email" onChange={handleEmailSearchChange} />
                            <hr />
                        </div>
                        {ownerList.length == 0 && <p> No Owners Found </p>}
                        {
                            ownerList.filter(o => o.fullName.toLowerCase().includes(nameFilter.toLowerCase()) &&
                                o.email.toLowerCase().includes(emailFilter.toLowerCase()))
                                .map((owner) => (
                                    <>
                                        <OwnerItem owner={owner} onOwnerUpdate={fetchOwners} />
                                    </>
                                ))
                        }

                    </div>
                </div>
            </>
        );
    }
}

export default OwnerDirectoryView;


