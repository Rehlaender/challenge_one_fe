import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchServices } from "./servicesAPI"

export interface ServicesState {
  services: Array<any>,
  activeServiceId: String,
  status: "idle" | "loading" | "failed"
}

const initialState: ServicesState = {
  services: [],
  activeServiceId: 'asdf',
  status: "idle",
};

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
  reducers: {
    setActiveService(state, action: PayloadAction<String>) {
      state.activeServiceId = action.payload;
    }
  },
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

export const { setActiveService } = servicesSlice.actions;

export const selectServices = (state: RootState) => state.services.services;
export const activeServiceSelector = (state: RootState) => state.services.services.filter(item => item.id === state.services.activeServiceId);

export default servicesSlice.reducer
