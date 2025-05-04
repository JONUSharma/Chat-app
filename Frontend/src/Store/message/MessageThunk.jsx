import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../Pages/Axios/Axios";

export const sendMessageThunk = createAsyncThunk("/message/send", async ({ receiverID, message }, { rejectWithValue }) => {
 
    try {
        const response = await instance.post(`/message/send/${receiverID}`, {message });
        
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            statusCode: error.response ? error.response.status : null,

        });

    }
})
export const getMessageThunk = createAsyncThunk("/message/receive", async ({ receiverId }, { rejectWithValue }) => {
    try {
        const response = await instance.post(`/message/receive/${receiverId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
