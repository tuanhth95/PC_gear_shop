import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search, priceRange, limit, sort, producer) => {
    let queryString = `http://localhost:3001/api/product/get-all?`;
    if(limit) {
        queryString +=`&limit=${limit}`;
    }
    if (search) {
        const lowerCaseSearch = search.toLowerCase();
        queryString += `&filter=name&filter=${lowerCaseSearch}`;
    }

    if(priceRange)
    {   
        queryString += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
    }

    if (sort) {
        queryString += `&sort=${sort}`;
    }

    if (producer) {
        queryString += `&producer=${encodeURIComponent(producer)}`;
    } 

    const response = await axios.get(queryString);
    return response.data;
};

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data
}

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)
    return res.data
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data
}
export const getAllProducerProduct = async () => {
    const res = await axios.get(`http://localhost:3001/api/product/get-all-producer`)
    return res.data
}