import { useState } from 'react'
import { ComplexView } from './ComplexView'
import '../css/App.css'
import '../css/main-styles.css'

export function MainView() {

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
    <div className="topBar">
      <h3> Hachem Property Manager </h3>
      <h2> Complex View </h2>
    </div>
    <div>
        <ComplexView setError={setErrorMessage} />
    </div>

    <p className="text-center"> {errorMessage} </p>
    </>
  )
}