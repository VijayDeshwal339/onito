import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "form",
    initialState: {
        submittedUsers: [],
        // userFormData: []
    },
    reducers: {
        addUser: (state, action) => {
            state.submittedUsers = [...state.submittedUsers, action.payload];
        },
     
    },
});

export const { addUser } = formSlice.actions;
export default formSlice.reducer;
