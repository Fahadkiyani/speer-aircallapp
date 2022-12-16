import { configureStore } from '@reduxjs/toolkit'
import titleSlice from './title';
import feedsSlice from './feeds';

export default configureStore({
  reducer: {
    title: titleSlice,
    feeds: feedsSlice
  }
})
