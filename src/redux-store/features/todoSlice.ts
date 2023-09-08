import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../react-app-env";

import type { RootState } from "../";


interface TodoSliceState {
    todos: Todo[];
}

const initialState: TodoSliceState = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        }
    }
});

export const { setTodos } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;