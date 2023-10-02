import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchServices } from "./servicesAPI"

export interface ServicesState {
  services: Array<any>,
  activeServiceId: String,
  status: "idle" | "loading" | "failed",
  openIncidents: Boolean,
  email: string,
}

const initialState: ServicesState = {
  services: [],
  activeServiceId: 'asdf',
  status: "idle",
  openIncidents: false,
  email: "awesomeemail@company.com",
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
    },
    setEmail(state, action: PayloadAction<String>) {
      state.email = action.payload;
    },
    setOpenIncidents(state, action: PayloadAction<Boolean>) {
      state.openIncidents = action.payload;
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

export const { setEmail, setActiveService, setOpenIncidents } = servicesSlice.actions;

export const userEmailSelector = (state: RootState) => state.services.email;
export const selectServices = (state: RootState) => state.services.services;
export const activeServiceSelector = (state: RootState) => state.services.services.filter(item => item.id === state.services.activeServiceId);
export const shouldRenderIncidentsSelector = (state: RootState) => state.services.openIncidents;

export default servicesSlice.reducer
