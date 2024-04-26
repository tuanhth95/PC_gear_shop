import axios from "axios";

export const getAllProduct = async (search, priceRange, limit) => {
    let queryString = `http://localhost:3001/api/product/get-all?&limit=${limit}&`;
    if (search) {
        const lowerCaseSearch = search.toLowerCase();
        queryString += `filter=name&filter=${lowerCaseSearch}&`;
    }
    queryString += `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
    const res = await axios.get(queryString);
    return res.data;
};




