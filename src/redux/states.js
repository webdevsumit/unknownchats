import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLogin: false,
  fakeProfileIdToOpen: 1,
  username:'',
  baseUrl : 'http://backend.unknownchats.com/',
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setFakeProfileIdToOpen: (state, action) => {
      state.fakeProfileIdToOpen = action.payload
    },
    setUrl: (state, action) => {
      state.url = action.payload
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
  },
})

export const {setIsLogin, setFakeProfileIdToOpen, setUrl, setUsername } = stateSlice.actions;

export default stateSlice.reducer;