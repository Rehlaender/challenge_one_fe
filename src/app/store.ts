import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import servicesReducer from "../features/services/servicesSlice"
import incidensReducer from "../features/incidents/incidentsSlice"
import formReducer from "../features/form/formSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    services: servicesReducer,
    incidents: incidensReducer,
    form: formReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
