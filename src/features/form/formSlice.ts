import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { createIncident } from "./formAPI"

export interface NewIncidentState {
  title: String,
  description: String,
  loadingStatus: "idle" | "loading" | "failed",
}

const initialState: NewIncidentState = {
  title: "",
  description: "",
  loadingStatus: "idle",
};

export const createNewIncident = createAsyncThunk(
  "form/createNewIncident",
  async (payload) => {
    const response = await createIncident(payload);
    return response;
  },
)

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewIncident.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createNewIncident.fulfilled, (state) => {
        state.status = "idle"
      })
      .addCase(createNewIncident.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export default formSlice.reducer
