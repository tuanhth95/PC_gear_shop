import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        search: '',
        searchPriceRange: [0,100000000],
        limit: 0,
        selectedProducer: '', 
    },
    reducers: {
        searchProduct: (state, action) => {
            state.search = action.payload;
        },
        setSearchPriceRange: (state, action) => {  
            state.searchPriceRange = action.payload;
        },
        setLimit: (state, action) => {  
            state.limit = action.payload;
        },
        setSelectedProducer: (state, action) => { 
            state.selectedProducer = action.payload;
        }
    },
});

export const { searchProduct, setSearchPriceRange, setLimit, setSelectedProducer } = productSlice.actions;

export default productSlice.reducer;
