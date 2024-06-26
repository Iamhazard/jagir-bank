
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { CategorySchema } from "@/Schemas";
import { CategoryPageProps, CountryPageProps } from "@/@types/enum";


interface Category{
  id:string;
  name:string,
}

const initialState: CountryPageProps = {
  country: null,
  status: 'idle',
  error: null,
  success: null,
};



export const createCountry = createAsyncThunk(
  'country/create',
  async (payload: { title: string,userId:string |undefined }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/country`, payload)
      
      const category = response.data.category;  // Ensure this is correctly spelled
      CategorySchema.parse(category);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editCountry = createAsyncThunk<
  Category[], 
  { countryId: string;countryName:string },
  { state: RootState } 
>(
  '/category',
  async ({ countryId,countryName }, thunkAPI) => {
    try {
      ;

      const response = await axios.patch(`/api/country`, { countryId,countryName })
      const categories: Category[] = response.data;
      return categories;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const viewCountry = createAsyncThunk < [] ,void ,{state:RootState}>(
  '/country/getall',
  async (_, thunkAPI) => {
    try {
      
      const response = await axios.get(`/api/country/getcountry`,
      );
      const categories = response.data;
      //console.log("categoreies from category",categories)
      return categories;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCountry = createAsyncThunk <[] ,string  ,{state:RootState}>(
  '/category/:id',
  async (id:string, thunkAPI) => {
    try {
     
      const response = await axios.delete(`/api/country/${id}`,{
        
      });
      const categories = response.data;
      //console.log("categoreies",categories)
      return categories;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCountry.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.country = action.payload.category;
        state.success = "Category created successfully";
      })
      .addCase(createCountry.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editCountry.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(editCountry.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.country = action.payload;
        state.success = "Category edited successfully";
      })
      .addCase(editCountry.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(viewCountry.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(viewCountry.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'succeeded';
        state.country = action.payload;
        state.success = "Categories fetched successfully";
      })
      .addCase(viewCountry.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCountry.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.country = state?.country;
        state.success = "Category deleted successfully";
      })
      .addCase(deleteCountry.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
//export const selectCategory = (state:RootState) => state.category;

export default categorySlice.reducer;

