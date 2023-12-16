import { UseState } from 'react'
import '../css/ComplexItem.css'
import '../css/main-styles.css'
import { useNavigate } from 'react-router-dom';

export function ComplexItem({ comp, onSelect, isSelected }) {

  const navigate = useNavigate();

  const itemClass = isSelected ? "complexItemParentDivSelected" : "complexItemParentDiv";
  console.log(isSelected + " " + comp.complexID)
  console.log(itemClass + " " + comp.complexID)

  return (
    <>
      <div className={itemClass} onClick={() => onSelect(comp)}>
        <h4> {comp.address} </h4>
        <h5> {comp.name} </h5>
        <h5> {comp.apartments.length} Apartment(s) </h5>
        <button onClick={() => navigate("complex/update/" + comp.complexID)}> Edit </button>
        <h6> <b> Owner(s): </b> {comp.ownerNames.length == 0 ? "Unknown" : comp.ownerNames.join(", ")}</h6>
      </div>
    </>
  )
}