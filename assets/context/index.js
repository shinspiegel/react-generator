import React, { useReducer, createContext } from "react";
import Reducer from "./reducer";
import InitialState from "./initialState";

/**
 * @typedef {object} Dispatch
 * @property {string} type
 * @property {?} payload
 */

/**
 * @typedef {object} ContextType
 * @property {import("./initialState").State} state
 * @property {Dispatch} dispatch
 */

export const AppContext = createContext(InitialState);

export const ContextProvider = ({ children, initialState }) => {
    if (!initialState) initialState = InitialState;

    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
