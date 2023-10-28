"use client";
import { Data } from "@/types/types";
import { createSlice, current } from "@reduxjs/toolkit";

type TodoState = {
  todosData: Data[];
};

// let todos = localStorage.getItem("todos");

const initialTodosState: TodoState = {
  // todosData: todos ? JSON.parse(todos) : [],
  todosData: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodosState,
  reducers: {
    create(state, action) {
      state.todosData.push(action.payload);

      // let todosData = JSON.stringify(current(state.todosData));
      // localStorage.setItem("todos", todosData);
    },
    update(state, action) {
      const foundIndex = state.todosData.findIndex(
        (item: Data) => item.id === action.payload.id
      );

      state.todosData[foundIndex] = action.payload;

      // let todosData = JSON.stringify(current(state.todosData));
      // localStorage.setItem("todos", todosData);
    },
    remove(state, action) {
      state.todosData = state.todosData.filter((item: Data) => {
        return item.id !== action.payload;
      });

      // let todosData = JSON.stringify(state.todosData);
      // localStorage.setItem("todos", todosData);
    },
    updateStatus(state, action) {
      const foundIndex = state.todosData.findIndex(
        (item: Data) => item.id === action.payload.id
      );

      state.todosData[foundIndex].status = action.payload.status;

      // let todosData = JSON.stringify(current(state.todosData));
      // localStorage.setItem("todos", todosData);
    },
  },
});

export const { create, update, remove, updateStatus } = todosSlice.actions;

export default todosSlice.reducer;
