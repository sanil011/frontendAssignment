import { createSlice } from "@reduxjs/toolkit"
const initialState = { popover: false,link:"" ,update:"",updatePopover:false,addPopover:false, dropdown:""}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        Modal: (state, action) => {
            state.popover = action.payload.popover
            state.link = action.payload.link
        },
        Update: (state, action) => {
            state.update = action.payload.update
            state.updatePopover = action.payload.updatePopover
        },
        Add: (state, action) => {
            state.addPopover = action.payload.popover
            state.dropdown = action.payload.dropdown
        }
    }
})

export default appSlice.reducer

export const appActions = appSlice.actions;