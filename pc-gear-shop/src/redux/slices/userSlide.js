import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: false,
    city: '',
    refreshToken: ''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            console.log("action.payload:",action.payload)
            const { username = '', name='' , email = '', access_token = '', address = '', phone = '', avatar = '', _id = '', isAdmin, city= '',refreshToken = '', shippingAddress = [] } = action.payload.data
            state.name = username ? username : state.name;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id
            state.access_token = access_token ? access_token : state.access_token;
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
            state.city = city ? city : state.city;
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
            state.shippingAddress = shippingAddress.length != 0 ?  shippingAddress: state.shippingAddress;
            console.log(action, state.name);
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false;
            state.city = '';
            state.refreshToken = ''
            state.shippingAddress = []
        },
        addShippingAddressUser: (state, action) => {
            const sa = action.payload
            console.log("payload: ", sa)
            console.log("before add ship redux: ", state.shippingAddress)
            if(!state.shippingAddress){
                console.log("1st con")
                state.shippingAddress = [sa]
            }
            else {
                console.log("2nd con")
                if(state.id == ''){
                    state.shippingAddress = [sa] 
                }
                else{
                    state.shippingAddress = [...state.shippingAddress, sa];
                }
            }
            console.log("after add ship redux: ", state.shippingAddress)
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, addShippingAddressUser } = userSlide.actions

export default userSlide.reducer