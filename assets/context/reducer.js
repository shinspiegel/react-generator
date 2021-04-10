/**
 * This is the reducer function, that will prepare the update on the state
 * @param {import("./initialState").State} state This is the current state of the applications
 * @param {Dispatch} dispatch This is the type and payload for the update
 */
const Reducer = (state, { type, payload }) => {
    switch (type) {
        case cases.count:
            return {
                ...state,
                count: payload,
            };

        default:
            return state;
    }
};

export const cases = {
    count: "COUNT",
};

export default Reducer;
