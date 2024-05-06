const Cart = require('../models/CartModel')

const getItems = (req) => {
  return new Promise(async (resolve, reject) =>{
    console.log("get Item: ", req.query.all);
    const all = req.query.all;
    try {
      const res = await Cart.find();
      if(res){
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: res
        })
      } 
    } catch(e){
      reject(e);
    }
  })
}

const addItems = (req) => {
  return new Promise( async (resolve, reject) => {
    console.log(req.params, req.query.sl);
    let params = req.params;
    let sl = req.query.sl;
    try {
      const addItems = await Cart.create({
        'productID': params.id,
        'quantity': sl
      })
      if(addItems){
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: addItems
        })
      }
    } catch(e){
      reject(e);
    }
  })
}

const updateItems = (req) =>{
  let id = req.params.id;
  let sl = req.query.sl;
  return new Promise(async (resolve, reject) => {
    try{
      const res = await Cart.findOneAndUpdate(
        {
          'productID': id,
        },
        {
          'quantity': sl,
        }
      );
      if(res){
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: res
        })
      }
    }
    catch(e) {
      reject(e);
    }
  })
}

const deleteItems = (req) =>{
   return new Promise (async (resolve, reject) => {
    let id = req.params.id;
    try{
      const res = await Cart.deleteMany({productID: id});
      if(res){
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: res
        })
      }
    } catch(e){
      reject(e);
    }
  }
  )
}

module.exports = {
  getItems,
  addItems,
  updateItems,
  deleteItems
}