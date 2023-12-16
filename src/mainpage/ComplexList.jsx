import CreateComplexView from '../modals/CreateComplexView';


export default function ComplexList( {openModal, onComplexSelect, selectedComplex, complexes}) {

    return (

    
        <div className="boxFlexLeft">
            <h3> COMPLEXES </h3>
            <input type="text" placeholder="Name Search"/>
            <input type="text" placeholder="Address Search"/>

            <br/>
            <br/>

            <button onClick={openModal}> Add New Complex </button>
            <hr></hr>

            {complexes.length === 0 && ( <p> No Complexes Found </p> )}
            {complexes.map(c => (
            <ComplexItem comp={c} key={c.complexID} onSelect={onComplexSelect} isSelected={selectedComplex && c.complexID === selectedComplex.complexID}/>
          ))}



        </div>
    )

}