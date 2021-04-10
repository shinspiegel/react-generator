import { useContext } from "react";
import { AppContext } from "./index";
import { cases } from "./reducer";

/**
 * This action will return the state and the actions to change de state.
 */
const useActions = () => {
    /** @type {import(".").ContextType} */
    const { dispatch, state } = useContext(AppContext);

    /**
     * This function will get from the user list and fill the state
     */
    const countUp = async () => {
        dispatch({ type: cases.count, payload: state.count + 1 });
    };

    return {
        state,

        countUp,
    };
};

export default useActions;
