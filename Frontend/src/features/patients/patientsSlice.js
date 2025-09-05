import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Buscar pacientes normais

// GET /api/pacientes?nome=<texto>
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (nome = "") => {
    const response = await api.get(`/pacientes?nome=${nome}`);
    return response.data;
  }
);


// POST /api/pacientes
export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (patient) => {
    const response = await api.post("/pacientes", patient);
    return response.data;
  }
);


// GET /api/legacy/pacientes
export const fetchLegacyPatients = createAsyncThunk(
  "patients/fetchLegacyPatients",
  async () => {
    const response = await api.get("/legacy/pacientes");
    return response.data;
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: { 
    list: [], 
    legacy: [], 
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Buscar atuais
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Adicionar
      .addCase(addPatient.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Buscar legado
      .addCase(fetchLegacyPatients.fulfilled, (state, action) => {
        state.legacy = action.payload;
      });
  },
});

export default patientsSlice.reducer;
