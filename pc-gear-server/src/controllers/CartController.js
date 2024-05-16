import CartService from '../services/CartService.js'

  const getItems = async (req, res) => {
    const response = await CartService.getItems(req);
    // console.log(response);
    return res.status(200).json(response);
  }
  const addItems = async (req, res) => {
    const response = await CartService.addItems(req);
    return res.status(200).json(response);
  }
  
  const updateItems = async (req, res) => {
    try{
      let response = await CartService.updateItems(req);
      response = JSON.parse(JSON.stringify(response))
      response.data.id=req.query.sl;
      return res.status(200).json(response);
    } catch(e) {
      return res.status(404).json({
        message: e,
      });
    }
  }
  
  const deleteItems = async (req, res) => {
    let response = await CartService.deleteItems(req);
    response.data.id = req.params.id;
    return res.status(200).json(response);
  }

export default {getItems, addItems, updateItems, deleteItems};
