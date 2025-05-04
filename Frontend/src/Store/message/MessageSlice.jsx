import { createSlice } from "@reduxjs/toolkit";
import reducer from "../user/userSlice";
import { getMessageThunk } from "./MessageThunk";
import { sendMessageThunk } from "./MessageThunk";
const initialState = {
    ALLmessages: null,
}

const MessageSlice = createSlice({
    name: "message reducer",
    initialState,
    reducers: {
        setNewMessage: (state, action) => {
            console.log(action.payload);
            const oldMessage = state.ALLmessages ?? [];
            state.ALLmessages = [...oldMessage, action.payload]
        },
    },
    extraReducers: (builder) => {

        //sendMessage
        builder.addCase(sendMessageThunk.pending, (state, action) => {

        })
        builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
            state.ALLmessages = [...state.ALLmessages, action.payload?.response];
        })
        builder.addCase(sendMessageThunk.rejected, (state, action) => {

        })

        //getMessage
        builder.addCase(getMessageThunk.pending, (state, action) => {
        })
        builder.addCase(getMessageThunk.fulfilled, (state, action) => {
            state.ALLmessages = action.payload?.response?.message;
        })
        builder.addCase(getMessageThunk.rejected, (state, action) => {

        })
    }

})

export const {setNewMessage} = MessageSlice.actions
export default MessageSlice.reducer;
