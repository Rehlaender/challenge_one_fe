import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchIncidentsByService, fetchEditIncident } from "./incidentsAPI"

export interface IncidentsState {
  incidents: Array<any>,
  activeIncidentId: String | null,
  loadingStatus: "idle" | "loading" | "failed",
  status: String,
}

const initialState: IncidentsState = {
  incidents: [],
  activeIncidentId: null,
  loadingStatus: "idle",
  status: ''
};

export const getIncidentsAsync = createAsyncThunk(
  "incidents/fetchIncidentsByService",
  async (id) => {
    const response = await fetchIncidentsByService(id)
    return response
  },
);

export const editIncident = createAsyncThunk(
  "incidents/fetchEditIncident",
  async (payload) => {
    const response = await fetchEditIncident(payload);
    return response;
  },
);

export const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    setActiveIncident(state, action: PayloadAction<String>) {
      state.activeIncidentId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncidentsAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getIncidentsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.incidents = action.payload
      })
      .addCase(getIncidentsAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { setActiveIncident } = incidentsSlice.actions;

export const serviceSelector = (state: RootState) => state.services.activeServiceId;
export const activeServiceNameSelector = (state: RootState) => state.services?.services.filter(item => item.id === state.services.activeServiceId)[0]?.name;
export const incidentsSelector = (state: RootState) => state.incidents?.incidents;
export const activeIncidentSelector = (state: RootState) => state.incidents?.incidents.filter(item => item.id === state.incidents.activeIncidentId);

export default incidentsSlice.reducer
