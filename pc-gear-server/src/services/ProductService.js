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

const getAllProduct = (limit, page, filter, minPrice, maxPrice) => {
    return new Promise(async (resolve, reject) => {
        try {
            let match = {};
            if (filter) {
                match[filter[0]] = {'$regex': filter[1], '$options': 'i'};
            }

            // let pipeline = [
            //     { $match: match },
            //     {
            //         $addFields: {
            //             effectivePrice: {
            //                 $cond: {
            //                     if: { $gt: ["$discount", 0] },  
            //                     then: { $multiply: ["$price", { $subtract: [1, "$discount"] }] }, 
            //                     else: "$price" 
            //                 }
            //             }
            //         }
            //     },
            //     {
            //         $match: {
            //             effectivePrice: { $gte: Number(minPrice), $lte: Number(maxPrice) }
            //         }
            //     },
            //     { $skip: page * limit },
            //     { $limit: limit },
            //     // { $project: { name: 1, price: 1, discount: 1, effectivePrice: 1, description: 1, image: 1, type: 1, countInStock: 1 } } 
            // ];
            let pipeline = [
                { $match: match },
                {
                    $addFields: {
                        effectivePrice: {
                            $cond: {
                                if: { $gt: ["$discount", 0] },
                                // Convert discount from percentage to multiplier, e.g., 20 becomes 0.8 (1 - 0.2)
                                then: { $multiply: ["$price", { $subtract: [1, { $divide: ["$discount", 100] }] }] },
                                else: "$price"
                            }
                        }
                    }
                },
                {
                    $match: {
                        effectivePrice: { $gte: Number(minPrice), $lte: Number(maxPrice) }
                    }
                },
                { $skip: page * limit },
                { $limit: limit },
                // Optional: You can add a projection to control which fields to return
                // { $project: { name: 1, price: 1, discount: 1, effectivePrice: 1, description: 1, image: 1, type: 1, countInStock: 1 } } 
            ];

            const products = await Product.aggregate(pipeline);
            const totalProduct = await Product.countDocuments({ $and: [match, { effectivePrice: { $gte: Number(minPrice), $lte: Number(maxPrice) } }] });

            resolve({
                status: 'OK',
                message: 'Success',
                data: products,
                total: totalProduct,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (e) {
            reject(e);
        }
    });
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