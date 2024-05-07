import axios from "axios";

export const findProductsByName = async (name) => {
    const response = await axios.get(`http://localhost:3001/api/product_detail/find_products_by_name/${name}`)
    return response.data;
}

export const findProductsByKey = async (key) => {
    const response = await axios.get(`http://localhost:3001/api/product_detail/find_products_by_key/${key}`)
    return response.data;
}