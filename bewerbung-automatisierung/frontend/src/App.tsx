import Form from "./components/Form"
import SecondForm from "./components/SecondForm"
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>


         <Routes>
      <Route path="/" element={<Form/>} />
      <Route path="/secondform/details" element={<SecondForm/>} />
    </Routes>
   
    </>
  )
}

export default App
