import ProductDetail from '../models/ProductDetailModel.js'

// const createProduct = (newProduct) => {
//     return new Promise( async (resolve, reject) => {
//         const { id, name, type, price, discount, img, description} = newProduct
//         try {
//             const createdProduct = await ProductDetail.create({
//                 id, 
//                 name, 
//                 type, 
//                 price, 
//                 discount, 
//                 img,
//                 description
//             })
//             if (createdProduct) {
//                 resolve({
//                     status: 'OK',
//                     message: 'Product created successfully',
//                     data: createdProduct
//                 })
//             }
//         } catch (e) {
//             console.log(e)
//             reject(e)
//         }
//     })
// }

const findProductById = (productId) => {
    return new Promise( async (resolve, reject) => {
        try {
            const foundProduct = await ProductDetail.findOne({id: productId})
            if (foundProduct) {
                resolve({
                    status: 'OK',
                    message: 'Product found successfully',
                    data: foundProduct
                })
            } else {
                reject({
                    status: 'ERR',
                    message: 'Product not found'
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}
const findProductByType = (productId) => {
    return new Promise( async (resolve, reject) => {
        try {
            const foundProduct = await ProductDetail.find({type: productId})
            if (foundProduct) {
                resolve({
                    status: 'OK',
                    message: 'Product found successfully',
                    data: foundProduct
                })
            } else {
                reject({
                    status: 'ERR',
                    message: 'Product not found'
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

// const findProductsByType = (productType) => {
//     return new Promise( async (resolve, reject) => {
//         try {
//             const foundProducts = await ProductDetail.find({type: productType})
//             if (foundProducts) {
//                 resolve({
//                     status: 'OK',
//                     message: 'Products found successfully',
//                     data: foundProducts
//                 })
//                 console.log(foundProducts);
//             } else {
//                 reject({
//                     status: 'ERR',
//                     message: 'Product not found'
//                 })
//             }
//         } catch (e) {
//             console.log(e)
//             reject(e)
//         }
//     })
// }

const findProducts = () => {
        return new Promise( async (resolve, reject) => {
            try {
                const foundProducts = await ProductDetail.find();
                if (foundProducts) {
                    resolve({
                        status: 'OK',
                        message: 'Product found successfully',
                        data: foundProducts
                    })
                } else {
                    reject({
                        status: 'ERR',
                        message: 'Product not found'
                    })
                }
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }

const findProductsByName = (name) => {
    const arr = name.split(' ').filter(Boolean)
    const regex = arr.map(keyword => `(?=.*${keyword})`).join('|');
    return new Promise( async (resolve, reject) => {
        try {
            const foundProducts = await ProductDetail.find({ name: { $regex: regex, $options: 'i' } })
                .then(products => {
                    const data = products.filter(product => {
                        const matchingWords = arr.filter(word => product.name.toLowerCase().includes(word.toLowerCase()));
                        return matchingWords.length >= 2;
                        })
                    if(data.length > 0) return data
                    return products
                    })
            if (foundProducts && foundProducts.length > 0) {
                resolve({
                    status: 'OK',
                    message: 'Products found successfully',
                    data: foundProducts,
                    total: foundProducts.length
                })
                // console.log(foundProducts);
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Product not found',
                    data: []
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

const findProductsByKey = (key) => {
    const arr = key.split(' ').filter(Boolean)
    const regex = arr.map(keyword => `(?=.*${keyword})`).join('|');
    return new Promise( async (resolve, reject) => {
        try {
            const foundProducts = await ProductDetail.find({ name: { $regex: regex, $options: 'i' } })
                .then(products => {
                    const data = products.filter(product => {
                        const matchingWords = arr.filter(word => product.name.toLowerCase().includes(word.toLowerCase()));
                        return matchingWords.length >= 2;
                        })
                    if(data.length > 0) return data
                    return products
                    })
            if (foundProducts && foundProducts.length > 0) {
                resolve({
                    status: 'OK',
                    message: 'Products found successfully',
                    data: foundProducts,
                    total: foundProducts.length
                })
                // console.log(foundProducts);
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Product not found',
                    data: []
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

export default {
    // createProduct,
    findProductById,
    findProductByType,
    findProducts,
    findProductsByName,
    findProductsByKey
}