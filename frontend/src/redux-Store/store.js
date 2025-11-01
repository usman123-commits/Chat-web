import { configureStore } from '@reduxjs/toolkit'
import sliceCounter from "../slices/counter/slice.counter"
import sliceAuth from "../slices/auth/slice.auth"
import sliceTheme from "../slices/themes/slice.theme"
import sliceChatdata from '../slices/chat/slice.chatData'

// ...
const store = configureStore({
  reducer: {
    // I can access the specific slice's state by the name i defined here
    // counter's state => state.counter.etc
    counter:sliceCounter,
  //  for auth states
    auth:sliceAuth,
  //  for them states
    theme:sliceTheme,
    // For chat's data
    chat:sliceChatdata
  }
})

export default store;