const Product = require('../models/ProductModel')

const createProduct = (newProductData) => {
    return new Promise(async(resolve, reject) => {
        const {id, name, img, type, price, discount, description} = newProductData
        try {
            const checkProduct = await Product.findOne({
                id: id
            })
            if(checkProduct !== null)
            {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }
            const newProduct = await Product.create({
                id, name, img, type, price, discount, description
            })
            if(newProduct)
            {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        }
        catch(e) {
            reject(e)
        }
    })
}

const getAllProduct = async (limit, page, filter, minPrice, maxPrice, sort, producer) => {
    try {
        let match = {};
        if (filter) {
            match[filter[0]] = {'$regex': filter[1], '$options': 'i'};
        }
        if (producer) {
            match['description.producer'] = producer;
        }

        let pipeline = [
            { $match: match },
            {
                $addFields: {
                    effectivePrice: {
                        $cond: {
                            if: { $gt: ["$discount", 0] },
                            then: { $multiply: ["$price", { $subtract: [1, { $divide: ["$discount", 100] }] }] },
                            else: "$price"
                        }
                    }
                }
            },
            { $match: { effectivePrice: { $gte: Number(minPrice), $lte: Number(maxPrice) } } }
        ];

        if (sort) {
            const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
            const sortOrder = sort.startsWith('-') ? -1 : 1;
            pipeline.push({ $sort: { [sortField]: sortOrder } });
        }

        pipeline.push({ $skip: page * limit }, { $limit: limit });

        const products = await Product.aggregate(pipeline);
        const totalProduct = await Product.countDocuments(match);

        return {
            status: 'OK',
            message: 'Success',
            data: products,
            total: totalProduct,
            pageCurrent: Number(page) + 1,
            totalPage: Math.ceil(totalProduct / limit)
        };
    } catch (e) {
        throw new Error(e.message || 'Internal Server Error');
    }
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null)
            {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success'
            })

        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    getAllProduct,
    deleteProduct
}