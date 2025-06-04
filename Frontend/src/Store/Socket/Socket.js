import { createSlice } from "@reduxjs/toolkit"
import io from "socket.io-client"

const initialState = {
    socket: null,
    onlineUsers: null,
}

export const SocketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        initiizeSocket: (state, actions) => {
            const socket = io("https://chat-app-ol0u.onrender.com",{
                query: {
                    userID : actions.payload
                }
            });
            state.socket = socket;
        },
        setOnlineUsers: (state, action) => {
            // console.log(action.payload);
            state.onlineUsers = action.payload;
          },
    }
})

export const { initiizeSocket,setOnlineUsers} = SocketSlice.actions;
export default SocketSlice.reducer;