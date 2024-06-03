import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/authSlice'
import jobReducer from './Features/JobSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:authReducer,
        job:jobReducer,
        
       
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']