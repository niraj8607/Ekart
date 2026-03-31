import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : "product",
    initialState : {
        allproducts : []
    },
    reducers : {
        //actions
        setProducts : (state , action )=>{
            state.allproducts = action.payload
        }
    }
})

export const {setProducts} = productSlice.actions
export default productSlice.reducer