import Collection from "../models/CollectionModel.js"

const createCollection = (newCollection) => {
    return new Promise( async (resolve, reject) => {
        const { name, productList } = newCollection
        try {
            const createdCollection = await Collection.create({
                name, 
                productList
            })
            if (createdCollection) {
                resolve({
                    status: 'OK',
                    message: 'Collection created successfully',
                    data: createdCollection
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

const getAllCollections = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const foundCollections = await Collection.find()
            if (foundCollections) {
                resolve({
                    status: 'OK',
                    message: 'All Collections found successfully',
                    data: foundCollections,
                    total: foundCollections.length
                })
            } else {
                reject({
                    status: 'ERR',
                    message: 'Collections not found'
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

const deleteCollection = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const checkCollection = await Collection.findOne({
                _id: id
            })
            if(!checkCollection)
            {
                resolve({
                    status: 'OK',
                    message: 'The collection is not defined'
                })
            }
            await Collection.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete collection successfully'
            })
        }catch(e){
            reject(e)
        }
    })
}

const removeProducts = (collectionId, updateData) => {
    return new Promise( async (resolve, reject) => {
        try {
            const updatedCollection = await Collection.findByIdAndUpdate(
                collectionId, 
                updateData,
                { new: true }
            )
            if (updatedCollection) {
                resolve({
                    status: 'OK',
                    message: 'Collection is updated successfully',
                    data: updatedCollection
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

const addProducts = (collectionId, addData) => {
    return new Promise( async (resolve, reject) => {
        try {
            const updatedCollection = await Collection.findByIdAndUpdate(
                collectionId, 
                {
                    $push: { productList: { $each: addData } }
                },
                { new: true }
            )
            if (updatedCollection) {
                resolve({
                    status: 'OK',
                    message: 'Collection is updated successfully',
                    data: updatedCollection
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

const renameCollection = (collectionId, newName) => {
    return new Promise( async (resolve, reject) => {
        try {
            const updatedCollection = await Collection.findByIdAndUpdate(
                collectionId, 
                {
                    name: newName
                },
                { new: true }
            )
            if (updatedCollection) {
                resolve({
                    status: 'OK',
                    message: 'Collection is updated successfully',
                    data: updatedCollection
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

export default {
    createCollection,
    getAllCollections,
    deleteCollection,
    removeProducts,
    addProducts,
    renameCollection
}