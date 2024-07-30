import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUser {
	email: string | null
	username: string | null
}

// Define the initial state using that type
const initialState: IUser = {
	email: null,
	username: null,
}

export const userSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.email = action.payload.email
			state.username = action.payload.username
		},
		clearUser: (state) => {
			state.email = null
			state.username = null
		},
	},
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
