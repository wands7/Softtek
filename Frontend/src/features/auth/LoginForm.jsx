import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ username: "admin", password: "admin" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {token ? (
        <div className="success">
          <p>✅ Logado com sucesso!</p>
          <button onClick={() => dispatch(logout())}>Sair</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-group">
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Usuário"
            type="text"
            autoComplete="username"
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Senha"
            autoComplete="current-password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>
          {error && <p className="error">Erro: {error}</p>}
        </form>
      )}
    </div>
  );
}
