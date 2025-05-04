import { createSlice } from '@reduxjs/toolkit'
import { getOtherUserThunk, getProfileThunk, loginUserThunk, LogoutThunk, SignUpUserThunk } from './userThunk';

const initialState = {
    value: 0,
    screenLoading: true,
    buttonLoading: false,
    userProfile: null,
    isAuthenticated: false,
    otherUser: null,
    selectedUser:  JSON.parse(localStorage.getItem("selectedUser")),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            localStorage.setItem("selectedUser",JSON.stringify(action.payload))
            state.selectedUser = action.payload;
        }

    },
    extraReducers: (builder) => {
        //login thunk
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.buttonLoading = true;
        })
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.userProfile = action.payload?.response;
            state.screenLoading = false

        })
        builder.addCase(loginUserThunk.rejected, (state, actions) => {

        })

        //signup Thunk
        builder.addCase(SignUpUserThunk.pending, (state, action) => {
            state.buttonLoading = true;

        })
        builder.addCase(SignUpUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.userProfile = action.payload?.response;
            state.screenLoading = false;
        })
        builder.addCase(SignUpUserThunk.rejected, (state, actions) => {
       
            state.isAuthenticated = false;
        })

        //logout
        builder.addCase(LogoutThunk.pending, (state, action) => {
            state.buttonLoading = true;

        })
        builder.addCase(LogoutThunk.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.userProfile = null;
            state.buttonLoading = null;
            state.otherUser = null;
            state.screenLoading = null;
        
        })
        builder.addCase(LogoutThunk.rejected, (state, action) => {
           
        })

        //getProfile
        builder.addCase(getProfileThunk.pending, (state, action) => {
        })
        builder.addCase(getProfileThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.buttonLoading = false;
            state.screenLoading = false
            state.userProfile = action.payload?.response;
            localStorage.clear();

        })
        builder.addCase(getProfileThunk.rejected, (state, actions) => {
            
        })

        //get-other-user
        builder.addCase(getOtherUserThunk.pending, (state, action) => {

        })
        builder.addCase(getOtherUserThunk.fulfilled, (state, actions) => {
            state.screenLoading = false;
           
            state.otherUser = actions.payload?.response;
        })
        builder.addCase(getOtherUserThunk.rejected, (state, actions) => {
            
        })

    }
})

// Action creators are generated for each case reducer function
export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer