import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const login = createAsyncThunk('login', async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
			credentials: "include"
		})

		if (!response.ok) {


			const errorData = await response.json();
			return rejectWithValue(errorData)
		}

		const res = await response.json();
		return res;
	}
	catch (error) {
		return rejectWithValue(error)
	}
})

export const register = createAsyncThunk("register", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			const erroData = await response.json()
			return rejectWithValue(erroData)
		}

		const res = await response.json();
		return res;
	}
	catch (error) {
		console.log(error)
		return rejectWithValue(error)
	}
})

export const logout = createAsyncThunk("logout", async (__dirname, { rejectWithValue }) => {
	try {

		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
			method: "GET",
			credentials: "include"
		})

		if (!response.ok) {

			//  if response  is 401 or 403 then we have to dosomething 
			const errorData = await response.json();
			return rejectWithValue(errorData)
		}

		const res = await response.json();
		return res;

	}
	catch (error) {
		console.log(error)
		return rejectWithValue(error)
	}
})


const initialState = {
	isLoading: null,
	isError: null,
	userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
	isAuthenticated: localStorage.getItem("isAuthenticated") ? localStorage.getItem("isAuthenticated") === "true" : null
}


export const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: (builder) => {

		//login 
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.userInfo = action.payload.data;
				state.isAuthenticated = true;

				//  setting the necessary information in localstorage
				const userData = {
					fname: action.payload.data.fname,
					lname: action.payload.data.lname
				}

				localStorage.setItem("userInfo", JSON.stringify(userData));
				localStorage.setItem("isAuthenticated", true)
			})
			.addCase(login.rejected, (state, action) => {
				console.log("error occured : ", action.payload)
				state.isLoading = false;
				state.isError = true;
			})

		// register
		builder.addCase(register.pending, (state) => {
			state.isLoading = true;
			state.isError = false;

		})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				console.log("user is registered succesfully : ", action.payload.data)
			})
			.addCase(register.rejected, (state, action) => {
				console.log("error occured : ", action.payload)
				state.isLoading = false;
				state.isError = true;
			})


		// logout

		builder.addCase(logout.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.userInfo = null;
				state.isAuthenticated = null;
				localStorage.removeItem("userInfo");
				localStorage.removeItem("isAuthenticated")
				console.log("user is logged out successfully")
			})
			.addCase(logout.rejected, (state, action) => {
				console.log("error occured : ", action.payload);
				state.isLoading = false;
				state.isError = true
			})
	}
})

export default authSlice.reducer