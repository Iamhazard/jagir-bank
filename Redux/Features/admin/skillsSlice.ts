
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { CategorySchema, SkillsSchema } from "@/Schemas";
import {  Skill, SkillPageProps } from "@/@types/enum";


interface skills{
  id:string;
  skill:string,
}

const initialState: SkillPageProps = {
  skill: null,
  status: 'idle',
  error: null,
  success: null,
};



export const createskills= createAsyncThunk(
  'category/create',
  async (payload: { title: string, }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/skills/new`, payload)
      
      const skill = response.data.skill;  
      SkillsSchema.parse(skill);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editCategory = createAsyncThunk<
  Skill[], 
  { categoryId: string;category:string },
  { state: RootState } 
>(
  '/category',
  async ({ categoryId,category }, thunkAPI) => {
    try {
      ;

      const response = await axios.patch(`/api/category`, { categoryId,category }, {
        
      });

      const categories: Skill[] = response.data;
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
      
      const response = await axios.get(`/api/category/getskiill`,
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



const skillsSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createskills.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(createskills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skill = action.payload.category;
        state.success = "Category created successfully";
      })
      .addCase(createskills.rejected, (state, action: PayloadAction<any>) => {
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
        state.skill = action.payload;
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
        state.skill = action.payload;
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
        state.skill = state?.skill;
        state.success = "Category deleted successfully";
      })
      .addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
//export const selectCategory = (state:RootState) => state.category;

export default skillsSlice.reducer;

