import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/main-styles.css";
import { TenantItem } from "../apartmentdetails/TenantItem"
import axios from "axios";

function TenantDirectoryView() {
    const [tenantList, setTenantList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [nameFilter, setNameSearch] = useState('');
    const [emailFilter, setEmailSearch] = useState('');

    const handleNameSearchChange = (event) => {
        setNameSearch(event.target.value);
    }

    const handleEmailSearchChange = (event) => {
        setEmailSearch(event.target.value);
    }

    const handleTenantSelected = (aptID) => {
        window.open("http://localhost:3000/apartment/" + String(aptID))
    }

    const fetchTenants = () => {
        axios.get('http://localhost:8080/tenants/query/all')
            .then(response => {
                const data = response.data;
                console.log(data);

                if (data == null) {
                    setError("Tenants do not exist.");
                } else {
                    setTenantList(data);
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
        fetchTenants();
    }, []);

    if (loading) return <div>Loading...</div>;
    else if (error) return <div>Error: {String(error)}</div>;
    else {
        return (
            <>
                <h2 className="text-center"> Tenant Directory </h2>
                <div className="boxFull">
                    <div className="text-center">
                        <input type="text" placeholder="Name" onChange={handleNameSearchChange} />
                        <input type="text" placeholder="Email" onChange={handleEmailSearchChange} />
                        <hr />
                    </div>
                    <div>
                        {
                            tenantList.filter(t => t.fullName.toLowerCase().includes(nameFilter.toLowerCase()) &&
                                t.email.toLowerCase().includes(emailFilter.toLowerCase()))
                                .map((tenant) => (
                                    <>
                                        <TenantItem tenant={tenant} onTenantUpdate={fetchTenants} onTenantSelected={handleTenantSelected} key={tenant.tenantID} />
                                    </>
                                ))
                        }

                    </div>
                </div>
            </>
        );
    }
}

export default TenantDirectoryView;

