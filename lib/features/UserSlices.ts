import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { meFn } from '@/api/auth'

interface IUser {
	email: string | null
	username: string | null
}

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const userData = await meFn()
			return userData
		} catch (error) {
			if (error instanceof Error && error.message === 'SESSION_EXPIRED') {
				return rejectWithValue('SESSION_EXPIRED')
			}
			return rejectWithValue('FETCH_ERROR')
		}
	}
)

const initialState: {
	data: IUser | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
} = {
	data: null,
	status: 'idle',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.data = action.payload
		},
		clearUser: (state) => {
			state.data = null
		},
		setStatus: (
			state,
			action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>
		) => {
			state.status = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data = action.payload
			})
			.addCase(fetchUser.rejected, (state) => {
				state.status = 'failed'
				state.data = null
			})
	},
})

export const { setUser, clearUser, setStatus } = userSlice.actions
export default userSlice.reducer
