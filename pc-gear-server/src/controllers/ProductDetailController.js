const ProductDetailService = require('../services/ProductDetailService')

// const createProduct = async (req, res) => {
//     try {
//         // console.log(req.body)
//         const { id, name, type, price, discount, img, description} = req.body
//         if (!id || !name || !type || !price || (discount === null) || !img || !description) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The input is required'
//             })
//         } else {
//             const response = await ProductDetailService.createProduct(req.body)
//             return res.status(200).json(response)
//         }
//     } catch (e) {
//         return res.status(404).json({message: e})
//     }
// }

const findProductById = async (req, res) => {
    try {
        const productId = req.params.id
        // console.log('productId', productId)
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const foundProduct = await ProductDetailService.findProductById(productId)
        return res.status(200).json(foundProduct)
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

const findProductByType = async (req, res) => {
    try {
        const productId = req.params.id.replace('-', ' ')
        console.log("product id: ", productId);
        // console.log('productId', productId)
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const foundProduct = await ProductDetailService.findProductByType(productId)
        console.log("find product by type: ", foundProduct);
        return res.status(200).json(foundProduct)
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

// const findProductsByType = async (req, res) => {
//     try {
//         const productType = req.params.type
//         if(!productType) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The productType is required'
//             })
//         }
//         const foundProducts = await ProductDetailService.findProductsByType(productType)
//         console.log('foundProducts ', foundProducts);
//         return res.status(200).json(foundProducts)
//     } catch (e) {
//         return res.status(404).json({message: e})
//     }
// }

const findProducts = async (req, res) => {
        try {
            // const productId = req.params.id
            // console.log('productId', productId)
            // if(!productId) {
            //     return res.status(200).json({
            //         status: 'ERR',
            //         message: 'The productId is required'
            //     })
            // }
            const foundProducts = await ProductDetailService.findProducts()
            return res.status(200).json(foundProducts)
        } catch (e) {
            return res.status(404).json({message: e})
        }
    }

module.exports = {
    // createProduct,
    findProductById,
    // findProductsByType,
    findProducts,
    findProductByType
}