import React from "react";
import { useSelector } from "react-redux";
import PatientsList from "./features/patients/PatientsList";
import LoginForm from "./features/auth/LoginForm";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="App">
      {!token ? <LoginForm /> : <PatientsList />}
    </div>
  );
}

export default App;
