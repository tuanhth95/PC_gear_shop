const CartService = require('../services/CartService')

const datas = [
  {
    id : '001',
    image: "https://hoanghapccdn.com/media/product/2906_cpu_intel_core_i9_12900k_1.jpg",
    name: "CPU Intel Core i9-12900K",
    price: "7.490.000",
  },
  {
    id : '002',
    image: "https://nguyencongpc.vn/media/product/25654-250-4906-1.jpg",
    name: "CPU Intel Core i9-12900K",
    price: "7.490.000",
  },
  {
    id : '003',
    image: "https://cdn.tgdd.vn/hoi-dap/1424201/ram-ddr5-la-gi-hieu-suat-cai-tien-ra-sao-co-nen-nang-cap-1.jpeg",
    name: "CPU Intel Core i9-12900K",
    price: "7.490.000",
  },
];

const getItems = async (req, res) => {
  const response = await CartService.getItems(req);
  let data_t = JSON.parse(JSON.stringify(response.data));
  for (let i = 0; i < data_t.length; i ++){
    for (let j = 0; j < datas.length; j ++){
      if( data_t[i].productID === datas[j].id){
        // console.log(data_t[i].productID, "  -  ", datas[j].id);
        data_t[i]["image"] = datas[j].image ;
        data_t[i]["name"] = datas[j].name;
        data_t[i]["price"] = datas[j].price;
        // console.log(data_t[i]["image"], "  ", datas[j]["image"]);
        // console.log(data_t[i]);
      }
    }
  }
  // console.log(data_t)
  response.data = data_t;
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

module.exports = {
  getItems,
  addItems,
  updateItems,
  deleteItems
}