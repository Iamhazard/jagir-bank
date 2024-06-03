'use client'
import { AuthState, Job } from "@/@types/enum";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { LoginSchema, RegisterSchema } from "@/Schemas";

// Load state from local storage
const loadStateFromLocalStorage = (): JobState | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const authStateJSON = localStorage.getItem('authState');
  if (authStateJSON) {
    return JSON.parse(authStateJSON);
  }
  return undefined;
};

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  isLoggedIn:boolean;
  success: boolean,
  error: string | null;
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
  
}

// Initial state
const initialState: JobState = loadStateFromLocalStorage() || {
  jobs: [],
  error: null,
  isLoggedIn: false,
  loading:false,
  success: false,
  currentJob:null,
  status:'idle',
 
};

export const BACKEND_URL = "http://localhost:3000";
const API_URL = `${BACKEND_URL}/api`;

// Thunks
export const getAllJobs = createAsyncThunk<Job[], void, { state: RootState }>(
  'auth/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/job`, {

      });
      console.log("response from  slice",response)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; hashedPassword: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const user = response.data.user;
      LoginSchema.parse(user);
      localStorage.setItem('sessionToken', response.data.sessionToken);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; hashedPassword: string; lastName: string; name: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, credentials);
      const user = response.data.user;
      RegisterSchema.parse(user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/current_user`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Jobsslice
const jobSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuthState(state) {
      if (typeof window !== 'undefined') {
        state.isLoggedIn = !!localStorage.getItem('sessionToken');
      }
    },
    set_login(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
      
    },
   
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.status = 'loading';
        state.success = false;
        state.error = null;
    
      })
      .addCase(getAllJobs.fulfilled, (state, action: PayloadAction <Job[]>) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
        state.isLoggedIn = true
        state.success = true;
    
      })
      .addCase(getAllJobs.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
        state.isLoggedIn = true;
        state.success = true;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.success = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<Job[] >) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
        state.isLoggedIn = true;
        state.success = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    
  },
});

// export const { logout } = jobSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const selectUsers = (state: RootState) => state.auth.users;
export default jobSlice.reducer;