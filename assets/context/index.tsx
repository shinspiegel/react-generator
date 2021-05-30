import React, { createContext, Reducer, Dispatch, useContext, useReducer } from "react";
import { State, initialState } from "./state";
import { dispatchAction, reducer } from "./reducer";

export const StateContext = createContext({} as State);
export const DispatchContext = createContext((() => {}) as Dispatch<dispatchAction>);

export const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};
