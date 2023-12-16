import { useState, useEffect } from 'react'
import { ComplexItem } from './ComplexItem'
import '../css/ComplexView.css'
import '../css/main-styles.css'
import { UnitItem } from './UnitItem'
import axios from 'axios'
import CreateComplexView from '../modals/CreateComplexView';
import CreateUnitView from '../modals/CreateUnitView'


export function ComplexView({ setError }) {

  const [complexes, setComplexes] = useState([]);
  const [selectedComplex, selectComplex] = useState(null);

  const [nameFilter, setNameSearch] = useState('');
  const [addressFilter, setAddressSearch] = useState('');

  const [unitNumberFilter, setUnitNumberFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [bathroomsFilter, setBathroomsFilter] = useState('');

  const handleUnitNumberChange = (event) => {
    setUnitNumberFilter(event.target.value);
  };

  const handleBedroomsChange = (event) => {
    setBedroomsFilter(event.target.value);
  };

  const handleBathroomsChange = (event) => {
    setBathroomsFilter(event.target.value);
  };


  const handleComplexSelect = (complex) => {

    if (selectedComplex != null) {
      if (selectedComplex.complexID === complex.complexID) selectComplex(null)
      else selectComplex(complex)
    } else {
      selectComplex(complex);
    }
  };

  const handleComplexDelete = () => {

    const isConfirmed = window.confirm("Are you sure you want to delete this Complex? ALL Data for Apartments and Tenants of those Apartments will be deleted if you proceed. You cannot Undo this action.");

    if (isConfirmed) {
      if (selectedComplex == null) {
        return "Error. No Complex Selected.";
        console.log("Error! No Complex Selected. -- Why are you able to press the delete button while selectedComplex is null?");
      } else {
        console.log("Delete selectedComplex: " + selectedComplex.name)
        axios.post('http://localhost:8080/complexes/delete', null, { params: { ID: selectedComplex.complexID } })
          .then(response => {
            console.log(response.data);
            fetchComplexes();
          })
          .catch(error => {
            console.error('Error:', error);
          });

      }
    }

  }

  const handleNameSearchChange = (event) => {
    setNameSearch(event.target.value);
    selectComplex(null);
  }

  const handleAddressSearchChange = (event) => {
    setAddressSearch(event.target.value);
    selectComplex(null);
  }

  const fetchComplexes = () => {
    axios.get('http://localhost:8080/complexes/query/all')
      .then(response => {
        const data = response.data;
        setComplexes(data);
        console.log(data);

        if (data.length > 0) {
          selectComplex(null);
          console.log("Selected Complex: " + selectedComplex);
        }
      })
      .catch(error => {
        console.error('Axios error:', error);
        setError("Network Error: " + (error.response ? error.response.status : '') + " " + error.message);
      });

  }

  const [showAddComplexModal, setShowAddComplexModal] = useState(false);
  const openAddComplexModal = () => setShowAddComplexModal(true);
  const closeAddComplexModal = () => setShowAddComplexModal(false);

  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const openAddUnitModal = () => setShowAddUnitModal(true);
  const closeAddUnitModal = () => setShowAddUnitModal(false);

  useEffect(() => {
    fetchComplexes();
  }, []);

  return (
    <>
      <CreateComplexView show={showAddComplexModal} onClose={closeAddComplexModal} onUpdate={fetchComplexes} />
      <CreateUnitView show={showAddUnitModal} onClose={closeAddUnitModal} onUnitAdded={fetchComplexes} selectedComplex={selectedComplex} />

      <div className="containerFlex">

        <div className="boxFlexLeft">
          <h3> COMPLEXES </h3>
          <input type="text" placeholder="Name Search" value={nameFilter} onChange={handleNameSearchChange} />
          <input type="text" placeholder="Address Search" value={addressFilter} onChange={handleAddressSearchChange} />

          <br />
          <br />

          <button onClick={openAddComplexModal}> Add New Complex </button>
          <button onClick={selectedComplex == null ? "" : handleComplexDelete} className={selectedComplex == null ? "button-deactivated" : "button-danger"}> Delete </button>

          <hr></hr>

          {complexes.length === 0 && (<p> No Complexes Found </p>)}
          {complexes.filter(c => c.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            c.address.toLowerCase().includes(addressFilter.toLowerCase())).map(c => (
              <ComplexItem comp={c} key={c.complexID} onSelect={handleComplexSelect} isSelected={selectedComplex && c.complexID === selectedComplex.complexID} />
            ))}



        </div>

        <div className="boxFlexRight">
          <div>
            <h3> UNITS </h3>
            <div>
              <input
                type="text"
                placeholder="Unit Number"
                value={unitNumberFilter}
                onChange={handleUnitNumberChange}
              />
              <input
                type="text"
                placeholder="Number of Bedrooms"
                value={bedroomsFilter}
                onChange={handleBedroomsChange}
              />
              <input
                type="text"
                placeholder="Number of Bathrooms"
                value={bathroomsFilter}
                onChange={handleBathroomsChange}
              />
              <br />
              <br />
              {selectedComplex != null && <button className="text-right" onClick={openAddUnitModal}> Add New Unit </button>}
            </div>
            <hr></hr>

            <div>
            </div>

            {
              selectedComplex == null || selectedComplex.apartments.length == 0 ? (<p> No Apartments Found. </p>) :
                (selectedComplex.apartments.filter(a =>
                  a.unitCode.includes(unitNumberFilter) &&
                  a.numOfBeds.toString().includes(bedroomsFilter) &&
                  a.numOfBaths.toString().includes(bathroomsFilter)).map(a => (
                    <UnitItem apt={a} key={a.aptID} onUpdate={fetchComplexes} />
                  )))}

          </div>
        </div>

      </div>
    </>
  )
}


