import { createSlice } from "@reduxjs/toolkit";

// ✅ Load user from localStorage
const storedUser = localStorage.getItem("user");

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: storedUser ? JSON.parse(storedUser) : null,
        isAuthenticated: storedUser ? true : false,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;

            // ✅ Save to localStorage
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        removeUserData: (state) => {
            state.userData = null;
            state.isAuthenticated = false;

            // ✅ Remove from localStorage
            localStorage.removeItem("user");
        },
    },
});

export const { setUserData, removeUserData } = userSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;