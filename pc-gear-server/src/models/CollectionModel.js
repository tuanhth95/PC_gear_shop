import  mongoose from 'mongoose'
const collectionSchema = new mongoose.Schema({

    name: {type: String, required: true},
    productList: [mongoose.Schema.Types.Mixed]
}, {
    collection: "collections",
    timestamps: true
})

const Collection = mongoose.model('Collection', collectionSchema)

export default Collection