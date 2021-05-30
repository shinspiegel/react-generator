import React, { Reducer } from "react";
import { State } from "./state";

export type dispatchAction = { type: ActionTypes; payload?: any };

export enum ActionTypes {
  increase = "INCREASE",
  decrease = "DECREASE",
  increase_by = "INCREASE_BY",
}

export const reducer: Reducer<State, dispatchAction> = (state: State, { payload, type }) => {
  switch (type) {
    case ActionTypes.increase:
      return {
        ...state,
        count: state.count + 1,
      };

    case ActionTypes.decrease:
      return {
        ...state,
        count: state.count - 1,
      };

    case ActionTypes.increase_by:
      return {
        ...state,
        count: state.count + payload,
      };

    default:
      throw new Error(`Unknown action: ${type}`);
  }
};
