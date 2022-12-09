import { createSlice } from '@reduxjs/toolkit'

const initialState = {title:'Active Feeds',reload:false}

const changeSlice = createSlice({
  name: 'change',
  initialState,
  reducers: {
    changeTitle(state,action){
      state.title = action.payload.title;
    }
  }

})

export const { changeReload,changeTitle } = changeSlice.actions;

export default changeSlice.reducer;