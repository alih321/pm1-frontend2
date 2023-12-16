import { UseState } from "react";
import "../css/main-styles.css";
import "../css/AptDetailsView.css";
import { useNavigate } from "react-router-dom";

export function OwnerItem({ owner, onOwnerUpdate }) {

    const navigate = useNavigate();

    const handleOwnerDelete = () => {

        const isConfirmed = window.confirm("Are you sure you want to delete this Owner? You cannot Undo this action.");

        if (isConfirmed) {
            const url = `http://localhost:8080/owners/delete/id=${owner.ownerID}`; // This is not refreshing the page. Refresh where shown in the comment below.

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
                    // Handle the response here, e.g., show a message or refresh the list of apartments
                    onOwnerUpdate();
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
                    <b> {owner.fullName} </b>
                    <h5> {owner.email == null ? "No Email" : owner.email} </h5>
                    <h5> {owner.phone == null ? "No Phone" : owner.phone} </h5>
                </div>
                <p> Address: {owner.address} </p>
                <div className="containerFlex">
                    <button onClick={() => navigate("/owner/update/" + owner.ownerID)}> Edit </button>
                    <button className="button-danger" onClick={handleOwnerDelete}> Delete </button>
                </div>
            </div>

        </>
    );
}
