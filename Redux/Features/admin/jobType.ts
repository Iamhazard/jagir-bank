
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { CategorySchema } from "@/Schemas";
import { jobtype, JobtypeProps } from "@/@types/enum";


interface JobsType{
  id:string;
  type:string,
}

const initialState: JobtypeProps = {
  job: null,
  status: 'idle',
  error: null,
  success: null,
};



export const createJobtype = createAsyncThunk(
  'job/create',
  async (payload: { job: string,userId:string |undefined }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/job`, payload)
      
      const job = response.data.job; 
      CategorySchema.parse(job);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editCategory = createAsyncThunk<
  JobsType[], 
  { jobId: string;job:string },
  { state: RootState } 
>(
  '/job',
  async ({ jobId,job }, thunkAPI) => {
    try {
      ;

      const response = await axios.patch(`/api/job/job-type`, { jobId,job }, {
        
      });

      const categories: jobtype[] = response.data;
      return categories;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const viewjobType= createAsyncThunk < [] ,void ,{state:RootState}>(
  '/jobtype/getall',
  async (_, thunkAPI) => {
    try {
      
      const response = await axios.get(`/api/job/job-type/getjob`,
      );
      const jobTypes = response.data;
      //console.log("categoreies from job",categories)
      return jobTypes;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteJobType  = createAsyncThunk <[] ,string  ,{state:RootState}>(
  '/job/:id',
  async (id:string, thunkAPI) => {
    try {
     
      const response = await axios.delete(`/api/job/job-type/${id}`,{
        
      });
      const deleteJobtype = response.data;
      //console.log("categoreies",categories)
      return deleteJobtype;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const jobTypeSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJobtype.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(createJobtype.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.job = action.payload.job;
        state.success = "Category created successfully";
      })
      .addCase(createJobtype.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.job = action.payload;
        state.success = "Category edited successfully";
      })
      .addCase(editCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(viewjobType.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(viewjobType.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'succeeded';
        state.job = action.payload;
        state.success = "Categories fetched successfully";
      })
      .addCase(viewjobType.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteJobType.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(deleteJobType.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.job = state?.job;
        state.success = "Category deleted successfully";
      })
      .addCase(deleteJobType.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
//export const selectCategory = (state:RootState) => state.job;

export default jobTypeSlice.reducer;

