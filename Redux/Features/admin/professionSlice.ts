
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { ProfessionSchema } from "@/Schemas";
import { ProfessionPageProps } from "@/@types/enum";


interface Category{
  id:string;
  profession:string,
}

const initialState: ProfessionPageProps = {
  category: null,
  status: 'idle',
  error: null,
  success: null,
};



export const createProfession= createAsyncThunk(
  'profession/create',
  async (payload: { profession: string,id:string |undefined }, thunkAPI) => {
    try {
      
      const response = await axios.post(`/api/profession`, payload)
      
      const profession = response.data.profession;  // Ensure this is correctly spelled
      ProfessionSchema.parse(profession);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editProfessions= createAsyncThunk<
  Category[], 
  { professionId: string;profession:string },
  { state: RootState } 
>(
  '/category',
  async ({ professionId,profession }, thunkAPI) => {
    try {
      ;

      const response = await axios.patch(`/api/profession/editProfession`, { professionId,profession }, {
        
      });

      const professions: Category[] = response.data;
      return professions;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const viewProfessions = createAsyncThunk < [] ,void ,{state:RootState}>(
  '/category/getall',
  async (_, thunkAPI) => {
    try {
      
      const response = await axios.get(`/api/category/getprofession`,
      );
      const categories = response.data;
      console.log("categoreies from category",categories)
      return categories;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory  = createAsyncThunk <[] ,string  ,{state:RootState}>(
  '/category/:id',
  async (id:string, thunkAPI) => {
    try {
     
      const response = await axios.delete(`/api/category/${id}`,{
        
      });
      const categories = response.data;
      //console.log("categoreies",categories)
      return categories;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const ProfessionSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProfession.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(createProfession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.category;
        state.success = "Category created successfully";
      })
      .addCase(createProfession.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editProfessions.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(editProfessions.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.category = action.payload;
        state.success = "Category edited successfully";
      })
      .addCase(editProfessions.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(viewProfessions.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(viewProfessions.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'succeeded';
        state.category = action.payload;
        state.success = "Categories fetched successfully";
      })
      .addCase(viewProfessions.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = state?.category;
        state.success = "Category deleted successfully";
      })
      .addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
//export const selectCategory = (state:RootState) => state.category;

export default ProfessionSlice.reducer;

