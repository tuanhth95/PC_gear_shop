import axios from "axios";

export const getAllProduct = async (search, priceRange, limit) => {
    let queryString = `${process.env.REACT_APP_API_URL}/product/get-all?&limit=${limit}&`;
    if (search) {
        const lowerCaseSearch = search.toLowerCase();
        queryString += `filter=name&filter=${lowerCaseSearch}&`;
    }
    queryString += `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
    console.log("query search: ", queryString);
    const res = await axios.get(queryString);
    return res.data;
};




