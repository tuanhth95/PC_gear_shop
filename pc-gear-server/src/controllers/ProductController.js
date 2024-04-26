const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try{
        const {id, name, img, type, price, countInStock, discount, description} = req.body

        if(!id || !name || !img || !type || !price )
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        
        const response = await ProductService.createProduct(req.body)
        
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message || 'Internal Server Error'
        });
    }
}

const getAllProduct = async(req, res) => {
    try {
        const { limit = 10 , page = 0 , filter='', minPrice=0, maxPrice=100000000 } = req.query;
        const skip = limit * page;
        const response = await ProductService.getAllProduct(Number(limit), Number(skip), filter, Number(minPrice), Number(maxPrice));
        return res.status(200).json(response);
    } catch(e) {
        return res.status(500).json({
            message: e.message || 'Internal Server Error'
        });
    }
};


const deleteProduct = async(req, res) => {
    try{
        const productId = req.params.id

        if(!productId)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    deleteProduct
}