import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLogin: false,
  messageBoxIdToOpen: null,
  username:'',
  // baseUrl : 'http://backend.unknownchats.com/',
  baseUrl : 'http://10.0.2.2:8000/',
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setMessageBoxIdToOpen: (state, action) => {
      state.messageBoxIdToOpen = action.payload
    },
    setUrl: (state, action) => {
      state.url = action.payload
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
  },
})

export const {setIsLogin, setMessageBoxIdToOpen, setUrl, setUsername } = stateSlice.actions;

export default stateSlice.reducer;