import React from "react";

export default function PatientForm({ form, setForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="form-group">
      <input
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        placeholder="Nome"
        required
        type="text"
        minLength={2}
      />
      <input
        type="date"
        value={form.dataNascimento}
        onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
