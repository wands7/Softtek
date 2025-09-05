import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, addPatient, fetchLegacyPatients } from "./patientsSlice";
import { logout } from "../auth/authSlice";

export default function PatientsList() {
  const dispatch = useDispatch();
  const { list, legacy, loading } = useSelector((state) => state.patients);
  const { token } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ nome: "", dataNascimento: "" });
  const [searchedPatient, setSearchedPatient] = useState(null);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchLegacyPatients());
  }, [dispatch]);

  const handleSearch = () => {
    if (!search.trim()) {
      setSearchedPatient(null);
      return;
    }
    // Busca apenas no array list (atuais)
    const found = list.find(
      (p) => p.nome.toLowerCase().includes(search.trim().toLowerCase())
    );
    setSearchedPatient(found || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPatient(form));
    setForm({ nome: "", dataNascimento: "" });
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Pacientes</h1>
        {token && (
          <button style={{ padding: '0.5rem 1rem', fontSize: '0.95rem' }} onClick={() => dispatch(logout())}>
            Sair
          </button>
        )}
      </div>

      {/* Busca */}
      <div className="section-box">
        <div className="form-group">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome"
            type="text"
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        {searchedPatient && (
          <div style={{
            background: '#e3f2fd',
            border: '1px solid #90caf9',
            borderRadius: '8px',
            padding: '0.7rem 1rem',
            marginTop: '1rem',
            color: '#1976d2',
            fontWeight: 500
          }}>
            {searchedPatient.nome} - {new Date(searchedPatient.dataNascimento).toLocaleDateString()}
          </div>
        )}
        {searchedPatient === null && search.trim() && (
          <div style={{ color: '#e74c3c', marginTop: '1rem' }}>Paciente não encontrado.</div>
        )}
      </div>

      {/* Formulário */}
      <div className="section-box">
        <form onSubmit={handleSubmit} className="form-group">
          <input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="Nome"
            required
            type="text"
          />
          <input
            type="date"
            value={form.dataNascimento}
            onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      {/* Lista de atuais */}
      <h2>Pacientes Atuais</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {list.map((p) => (
            <li key={p.id}>
              {p.nome} - {new Date(p.dataNascimento).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      {/* Lista de legado */}
      <h2>Pacientes do Legado</h2>
      <ul>
        {legacy.map((p) => (
          <li key={p.id}>
            {p.nome} - {new Date(p.dataNascimento).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
