import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchServices } from "./servicesAPI"

export interface ServicesState {
  services: Array<any>
  status: "idle" | "loading" | "failed"
}

const initialState: ServicesState = {
  services: [],
  status: "idle",
}

export const incrementAsync = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await fetchServices()
    return response
  },
)

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.services = action.payload
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const selectServices = (state: RootState) => state.services

export default servicesSlice.reducer
