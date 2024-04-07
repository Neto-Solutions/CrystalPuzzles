import { configureStore } from "@reduxjs/toolkit";

const mainReducer = (
    prevState = {
        user: {
            role: "methodist"
        }
    },
    action
) => {
    const { type, payload } = action;

    switch (type) {
        case "SET_ROLE":
            return {
                ...prevState,
                user: {
                    ...prevState.user,
                    role: payload
                }
            };
        default:
            return prevState;
    }
};

export default configureStore({ reducer: mainReducer });