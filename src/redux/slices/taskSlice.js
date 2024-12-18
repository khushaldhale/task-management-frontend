import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";






export const getAllTasks = createAsyncThunk("getAllTasks", async (_, { rejectWithValue, dispatch }) => {
	try {

		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
			method: "GET",
			credentials: "include"
		})

		if (!response.ok) {
			if (response.status === 401 || response.status === 403) {
				dispatch(logout())
			}

			const erroData = await response.json();
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


export const deleteTask = createAsyncThunk("deleteTask", async (data, { rejectWithValue, dispatch }) => {
	try {

		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${data._id}`, {
			method: "DELETE",
			credentials: "include"
		})

		if (!response.ok) {
			if (response.status === 401 || response.status === 403) {
				dispatch(logout())
			}

			const erroData = await response.json();
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


export const addTask = createAsyncThunk("addTask", async (data, { rejectWithValue, dispatch }) => {
	try {

		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
			credentials: "include"
		})

		if (!response.ok) {
			if (response.status === 401 || response.status === 403) {
				dispatch(logout())
			}
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


export const updateTask = createAsyncThunk('updateTask', async (data, { rejectWithValue, dispatch }) => {
	try {


		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${data._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
			credentials: "include"
		})

		if (!response.ok) {
			if (response.status === 401 || response.status === 403) {
				dispatch(logout())
			}

			const erroData = await response.json();
			return rejectWithValue(erroData)
		}

		const res = await response.json();
		return res;


	}
	catch (error) {
		console.log(error);
		return rejectWithValue(error)
	}
})

const initialState = {
	isLoading: null,
	isError: null,
	tasks: []
}


export const taskSlice = createSlice({
	name: "task",
	initialState,
	extraReducers: (builder) => {


		//  getAll Tasks
		builder.addCase(getAllTasks.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(getAllTasks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.tasks = action.payload?.data?.tasks;
				console.log("tasks are fetched successfully : ", action.payload.data)
			})
			.addCase(getAllTasks.rejected, (state, action) => {
				console.log("error occured : ", action.payload);
				state.isLoading = false;
				state.isError = true
			})


		//  delete Task

		builder.addCase(deleteTask.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;

				// redux rerendring is immutable 
				state.tasks = state.tasks.filter((element) => {
					return element._id !== action.payload.data._id
				})
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				console.log("error occured : ", action.payload)
			})

		// add task
		builder.addCase(addTask.pending, (state, action) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(addTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;


				//  react redux is immutable so if i use  push method 
				//  then it will not work
				console.log(action.payload)
				//problem occuring here ,
				state.tasks = [...state.tasks, action.payload.data]


			})
			.addCase(addTask.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log("error occured : ", action.payload)
			})


		// update task

		builder.addCase(updateTask.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		})
			.addCase(updateTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;

				state.tasks = state.tasks.map((element) => {
					if (element._id !== action.payload.data._id) {
						return element
					}
					else {
						return action.payload.data
					}
				})
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log("error occured: ", action.payload)
			})
	}
})

export default taskSlice.reducer;