import ProductService from '../services/ProductService.js'

const createProduct = async (req, res) => {
    try{
        const {id, name, img, type, price, discount, countInStock, description} = req.body

        if(!id || !name || !type || !price )
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
        const { limit = 1000 , page = 0 , filter='', minPrice=0, maxPrice=1000000000 , sort = '', producer = ''} = req.query;
        const skip = limit * page;
        const response = await ProductService.getAllProduct(Number(limit), Number(skip), filter, Number(minPrice), Number(maxPrice), sort, producer);
        return res.status(200).json(response);
    } catch(e) {
        return res.status(500).json({
            message: e.message || 'Internal Server Error'
        });
    }
};

const updateProduct = async(req, res) => {
    try{
        const productId = req.params.id
        const data = req.body

        if(!productId)
        {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }

        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


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

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProducer = async (req, res) => {
    try {
        const response = await ProductService.getAllProducer()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export default {
    createProduct,
    getAllProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    deleteMany,
    getAllType,
    getAllProducer
}