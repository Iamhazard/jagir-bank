import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/authSlice'
import jobReducer from './Features/JobSlice'
import categoryReducer from './Features/admin/CategorySlice'
import skillsReducer from './Features/admin/skillsSlice'
import professionReducer from './Features/admin/professionSlice'
import countryReducer from './Features/admin/countrySlice'
import jobTypeReducer from './Features/admin/jobType'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:authReducer,
        job:jobReducer,
        category:categoryReducer,
        profession:professionReducer,
        skills:skillsReducer,
        country:countryReducer,
        jobtype:jobTypeReducer,
        
       
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']