import { UseState } from "react";
import "../css/main-styles.css";
import "../css/AptDetailsView.css";
import { useNavigate } from "react-router-dom";

export function TenantItem({ tenant, onTenantUpdate, onTenantSelected }) {

    const navigate = useNavigate();

    const handleTenantDelete = () => {

        const isConfirmed = window.confirm("Are you sure you want to delete this tenant? You cannot Undo this action.");

        if (isConfirmed) {
            const url = `http://localhost:8080/tenants/delete/id=${tenant.tenantID}`;

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error("Network response was not ok.");
                })
                .then((data) => {
                    console.log(data);
                    onTenantUpdate();
                })
                .catch((error) => {
                    console.error(
                        "There has been a problem with your fetch operation:",
                        error
                    );
                });
        }
    };

    return (
        <>
            <div className="TenantDiv">
                <div className="flexVertical">
                    <b> {tenant.fullName} </b>
                    <h5> {tenant.email == null ? "No Email" : tenant.email} </h5>
                    <h5> {tenant.phone == null ? "No Phone" : tenant.phone} </h5>
                </div>
                <p> Credit Score: {tenant.creditScore} </p>
                <p> Salary: ${tenant.salary} </p>
                <div className="containerFlex">
                    <button onClick={() => navigate("/tenant/update/" + tenant.tenantID)}> Edit </button>
                    <button className="button-danger" onClick={handleTenantDelete}> Delete </button>
                    {onTenantSelected == null ? <></> : <button onClick={() => onTenantSelected(tenant.apartmentID)}> View Apartment </button>}
                </div>
            </div>

        </>
    );
}
