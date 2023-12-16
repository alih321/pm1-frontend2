import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/main-styles.css";
import "../css/AptDetailsView.css";
import { TenantItem } from "./TenantItem";
import axios from "axios";
import CreateTenantView from "../modals/CreateTenantView";

function AptDetailsView() {
    const { aptID } = useParams();
    const [apartmentDetails, setApartmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApartmentInfo = () => {
        axios.get(`http://localhost:8080/apartments/query/id=${aptID}`)
            .then(response => {
                const data = response.data;
                console.log(data);

                if (data == null) {
                    setError("Apartment with ID " + String(aptID) + " does not exist.");
                } else {
                    setApartmentDetails(data);
                }
            })
            .catch(error => {
                console.error("Axios error:", error);
                setError(error.message); // Adjusted to use error.message for consistency
            })
            .finally(() => {
                setLoading(false); // Moved to finally to ensure it executes in both success and error scenarios
            });
    }

    useEffect(() => {
        fetchApartmentInfo()
    }, []); // Dependency array ensures the effect runs only when aptID changes

    const [showAddTenantModal, setShowAddTenantModal] = useState(false);
    const openAddTenantModal = () => setShowAddTenantModal(true);
    const closeAddTenantModal = () => setShowAddTenantModal(false);

    if (loading) return <div>Loading...</div>;
    else if (error) return <div>Error: {String(error)}</div>;
    else {
        return (
            <>
                <CreateTenantView show={showAddTenantModal} onClose={closeAddTenantModal} apartmentID={aptID} onTenantAdded={fetchApartmentInfo} />
                <h2 className="text-center"> Apartment Details </h2>
                <div className="containerFlex">
                    <div className="boxFlexLeft">
                        <h3> Unit Information </h3>
                        <p> {apartmentDetails.address} </p>
                        <hr />
                        <div className="containerFlex">
                            <p><b>Bedrooms</b>: {apartmentDetails.numOfBeds} </p>
                            <p><b>Bathrooms</b>: {apartmentDetails.numOfBaths} </p>
                            <p><b>Rent</b>: ${apartmentDetails.rent} / Month</p>
                        </div>
                    </div>

                    <div className="boxFlexRight">
                        <h3>Tenant Information</h3>
                        <button onClick={openAddTenantModal}> Add Tenant </button>
                        <hr />
                        {
                            apartmentDetails.tenants.length > 0 ?
                                apartmentDetails.tenants.map((tenant) => (
                                    <TenantItem tenant={tenant} onTenantUpdate={fetchApartmentInfo} key={tenant.tenantID} />
                                )) : <p> This Apartment is Vacant. </p>}

                        <br />
                    </div>
                </div>
            </>
        );
    }
}

export default AptDetailsView;
