import { configureStore } from '@reduxjs/toolkit'
import sliceCounter from "../slices/counter/slice.counter"
import sliceAuth from "../slices/auth/slice.auth"
// ...
const store = configureStore({
  reducer: {
    counter:sliceCounter,
    auth:sliceAuth
  }
})

export default store;