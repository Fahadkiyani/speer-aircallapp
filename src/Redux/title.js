import { createSlice } from '@reduxjs/toolkit'

const initialState = {title:'Active Feeds',reload:false}

const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    changeTitle(state,action){
      state.title = action.payload.title;
    }
  }

})

export const { changeReload,changeTitle } = titleSlice.actions;

export default titleSlice.reducer;