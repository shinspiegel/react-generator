import { useContext } from "react";
import { DispatchContext } from "./index";
import { ActionTypes } from "./reducer";

export const useActions = () => {
  const dispatch = useContext(DispatchContext);

  return {
    increase: () => dispatch({ type: ActionTypes.increase }),
    decrease: () => dispatch({ type: ActionTypes.decrease }),
    increase_by: (value: number) => dispatch({ type: ActionTypes.increase_by, payload: value }),
  };
};
