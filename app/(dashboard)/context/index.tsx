import { createContext, useReducer, Dispatch, ReactNode } from "react";

const initialState = {
    user: {},
}

const Context = createContext()