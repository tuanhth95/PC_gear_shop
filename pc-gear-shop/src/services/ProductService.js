import axios from "axios";

export const getAllProduct = async (search, priceRange, limit, sort, producer) => {
    let queryString = `http://localhost:3001/api/product/get-all?&limit=${limit}&`;
    if (search) {
        const lowerCaseSearch = search.toLowerCase();
        queryString += `&filter=name&filter=${lowerCaseSearch}`;
    }

    queryString += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

    if (sort) {
        queryString += `&sort=${sort}`;
    }

    if (producer) {
        queryString += `&producer=${encodeURIComponent(producer)}`;
    }

    const response = await axios.get(queryString);
    return response.data;
};




