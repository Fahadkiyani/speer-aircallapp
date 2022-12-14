import { createSlice } from '@reduxjs/toolkit'

const initialState = { ActiveFeeds: [], ArchivedFeeds: [] };

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    SetActiveFeeds(state, action) {
      state.ActiveFeeds = action.payload.activefeeds;
    },
    SetArchivedFeeds(state, action) {
      state.ArchivedFeeds = action.payload.archivedfeeds;
    },
    SetActiveFeedsToArchive(state, action) {
    // eslint-disable-next-line
      state.ActiveFeeds.map((d, i, l) => {
        if (d.id === action.payload.id) {
          state.ArchivedFeeds.push(state.ActiveFeeds[i]);
          state.ActiveFeeds.splice(i, 1);
        }
      })
    },
    SetArchivedFeedsToActive(state, action) {
      // eslint-disable-next-line
      state.ArchivedFeeds.map((d, i, l) => {
        if (d.id === action.payload.id) {
          state.ActiveFeeds.push(state.ActiveFeeds[i]);
          state.ArchivedFeeds.splice(i, 1);
        }
      })
    },
  }
})

export const { SetActiveFeeds, SetArchivedFeeds, SetActiveFeedsToArchive, SetArchivedFeedsToActive} = feedsSlice.actions;

export default feedsSlice.reducer;