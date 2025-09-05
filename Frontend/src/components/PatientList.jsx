import React from "react";

export default function PatientList({ patients }) {
  return (
    <ul>
      {patients.map((p) => (
        <li key={p.id}>
          {p.nome} - {new Date(p.dataNascimento).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
