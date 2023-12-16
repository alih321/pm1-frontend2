import { UseState } from 'react'
import '../css/UnitItem.css'
import '../css/main-styles.css'
import { useNavigate } from 'react-router-dom'

export function UnitItem({ apt, onUpdate }) {

  const navigate = useNavigate();

  const handleViewDetailsSelected = () => {
    navigate('/apartment/' + String(apt.aptID));
  }

  const handleAptDelete = () => {

    const isConfirmed = window.confirm("Are you sure you want to delete this Apartment? ALL Data for Tenants in this Apartment will be deleted if you proceed. You cannot Undo this action.");

    if (isConfirmed) {
      const url = `http://localhost:8080/apartments/delete/id=${apt.aptID}`; // This is not refreshing the page. Refresh where shown in the comment below.

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log(data);
          onUpdate();
          // Handle the response here, e.g., show a message or refresh the list of apartments
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }
  };

  return (
    <>
      <div className="unitItemParentDiv">
        <h4> Unit #{apt.unitCode} </h4>
        <h5> {apt.tenants.length} Tenant(s) </h5>
        <div className="containerFlex">
          <h4> ${apt.rent} / Mo </h4>
          <h4> {apt.numOfBeds} Bedrooms </h4>
          <h4> {apt.numOfBaths} Bathrooms </h4>
        </div>
        <br />
        <div className="text-center">
          <button onClick={handleViewDetailsSelected}> View All Details </button>
          <button className="button-danger" onClick={handleAptDelete}> Delete </button>
          <button onClick={() => { navigate("/apartment/update/" + apt.aptID) }}> Edit </button>
        </div>
      </div>
    </>
  )
}