import CollectionService from '../services/CollectionService.js'

const createCollection = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, productList } = req.body
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else {
            const response = await CollectionService.createCollection(req.body)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

const getAllCollections = async (req, res) => {
    try {
        const response = await CollectionService.getAllCollections()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

const deleteCollection = async (req, res) => {
    try {
        const collectionId = req.params.id
        if(!collectionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The collectionId is required'
            })
        }
        const response = await CollectionService.deleteCollection(collectionId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

const removeProducts = async (req, res) => {
    try {
        const collectionId = req.params.id
        const { name, productList } = req.body
        // console.log(req.body);
        if(!collectionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else {
            const response = await CollectionService.removeProducts(collectionId,req.body)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

const addProducts = async (req, res) => {
    try {
        const collectionId = req.params.id
        const { name, productList } = req.body
        // console.log(req.body);
        if(!collectionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else {
            const response = await CollectionService.addProducts(collectionId,req.body)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

const renameCollection = async (req, res) => {
    try {
        const collectionId = req.params.id
        const { newName } = req.body
        // console.log(req.body);
        if(!collectionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else {
            const response = await CollectionService.renameCollection(collectionId,newName)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({message: e})
    }
}

export default {
    createCollection,
    getAllCollections,
    deleteCollection,
    removeProducts,
    addProducts,
    renameCollection
}