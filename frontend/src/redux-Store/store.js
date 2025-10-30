import { configureStore } from '@reduxjs/toolkit'
import sliceCounter from "../slices/counter/slice.counter"
import sliceAuth from "../slices/auth/slice.auth"
// ...
const store = configureStore({
  reducer: {
    // I can access the specific slice's state by the name i defined here
    // counter's state => state.counter.etc
    counter:sliceCounter,
    // counter's state => state.auth.etc
    auth:sliceAuth
  }
})

export default store;