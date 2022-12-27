import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loginApi } from '@/apis'
import { AppThunk } from '@/redux/store'

/**Login Props type */
interface LoginProps {
  userName: string;
  password: string;
}

interface MyPageData{
  referral: any,
  transaction: any,
  history: any
}

function resetMyPageData(state: MyPageData) {
  state.referral = null
  state.transaction = []
  state.history = []
}


export interface CounterState {
  value: number;
  referral: string,
  transaction: string,
  history: string
}

const initialState: CounterState = {
  value: 0,
  referral : "",
  transaction : "",
  history : "",
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setMyPageData(state, { payload }: PayloadAction<MyPageData>) {
      const { 
        referral,
        transaction,
        history
      } = payload
      state.referral = referral || state.referral;
      state.transaction = transaction || state.transaction
      state.history = history || state.history;
    },
    resetMyPage: resetMyPageData
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount , setMyPageData , resetMyPage } = counterSlice.actions


//thunk
export const getHistory = (formData: LoginProps): AppThunk => async (dispatch) => {
  const resp:any = await loginApi(formData);
  if (resp?.result) {
    dispatch(setMyPageData({
      referral: null,
      transaction: null,
      history: resp.data
    }))
  } else {
    dispatch(resetMyPage())
    console.warn(resp)
  }
}

export default counterSlice.reducer