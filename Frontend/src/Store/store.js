import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import messageSlice from "./message/MessageSlice"
import SocketSlice from './Socket/Socket'
export const store = configureStore({
    reducer: {
        userSlice,
        messageSlice,
        SocketSlice,
    },
    middleware: (getDefaultMiddlware) =>
        getDefaultMiddlware({
          serializableCheck: {
            ignoredPaths: ["SocketSlice.socket"],
          },
        }),
})
