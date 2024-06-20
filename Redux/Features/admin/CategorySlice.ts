
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { CategorySchema } from "@/Schemas";
import { CategoryPageProps } from "@/@types/enum";


interface Category{
  id:string;
  name:string,
}

const initialState: CategoryPageProps = {
  category: null,
  status: 'idle',
  error: null,
  success: null,
};



export const createCategory = createAsyncThunk(
  'category/create',
  async (payload: { category: string,userId:string |undefined }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/category`, payload)
      
      const category = response.data.category;  // Ensure this is correctly spelled
      CategorySchema.parse(category);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editCategory = createAsyncThunk<
  Category[], 
  { categoryId: string;category:string },
  { state: RootState } 
>(
  '/category',
  async ({ categoryId,category }, thunkAPI) => {
    try {
      ;

      const response = await axios.patch(`/api/category`, { categoryId,category }, {
        
      });

      const categories: Category[] = response.data;
      return categories;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const viewCategories = createAsyncThunk < [] ,void ,{state:RootState}>(
  '/category/getall',
  async (_, thunkAPI) => {
    try {
      
      const response = await axios.get(`/api/category/getcategory`,
      );
      const categories = response.data;
      //console.log("categoreies from category",categories)
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



const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.category;
        state.success = "Category created successfully";
      })
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
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
        state.category = action.payload;
        state.success = "Category edited successfully";
      })
      .addCase(editCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(viewCategories.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(viewCategories.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'succeeded';
        state.category = action.payload;
        state.success = "Categories fetched successfully";
      })
      .addCase(viewCategories.rejected, (state, action: PayloadAction<any>) => {
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

export default categorySlice.reducer;

