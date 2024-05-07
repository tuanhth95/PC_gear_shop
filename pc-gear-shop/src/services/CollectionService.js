import axios from "axios";

export const getAllCollections = async () => {
    const response = await axios.get('http://localhost:3001/api/collection/get_all')
    return response.data;
}

export const createCollection = async (name, productList) => {
    const response = await axios.post('http://localhost:3001/api/collection/create', {
        name: name,
        productList: productList
    })
    return response.data;
}

export const deleteCollection = async (id) => {
    const response = await axios.delete(`http://localhost:3001/api/collection/delete/${id}`)
    return response.data;
}

export const removeProducts = async (id, updateData) => {
    const response = await axios.put(`http://localhost:3001/api/collection/remove_products/${id}`, updateData)
    return response.data;
}

export const addProducts = async (id, addData) => {
    const response = await axios.put(`http://localhost:3001/api/collection/add_products/${id}`, addData)
    return response.data;
}

export const renameCollection = async (id, newName) => {
    const response = await axios.put(`http://localhost:3001/api/collection/rename/${id}`, {
        newName: newName
    })
    return response.data;
}