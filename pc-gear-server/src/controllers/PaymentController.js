import config from "config"
import dateFormat from "dateformat"
import querystring from "qs"
import crypto from "crypto"
import sortObject from 'sortobject'

const createPaymentUrl = (req, res, next) => {
  console.log(req.body);
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  // if(ipAddr == "::1") ipAddr="127:0:0:1"
  var tmnCode = config.get("vnp_TmnCode");
  //console.log("tmnCode: ", tmnCode);
  var secretKey = config.get("vnp_HashSecret");
  var vnpUrl = config.get("vnp_Url");
  var returnUrl = config.get("vnp_ReturnUrl");

  var date = new Date();
  console.log(date.toString())

  var createDate = dateFormat(date, "yyyymmddHHMMss");
  console.log(createDate)
  var orderId = dateFormat(date, "HHMMss");
  var amount = req.body.amount;
  var bankCode = req.body.bankCode;

  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params['vnp_Merchant'] = '12';
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  //vnp_Params["vnp_ExpireDate"] = 
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);


  // var signData = querystring.stringify(vnp_Params, { encode: true });
  // var hmac = crypto.createHmac("sha512", secretKey);
  // var signed = hmac.update(new Buffer.from(signData)).digest("hex");
  // vnp_Params["vnp_SecureHash"] = signed;
  // vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });
  const redirectUrl = new URLSearchParams("");
  Object.entries(vnp_Params).sort(([key1, key2]) => key1.toString().localeCompare(key2.toString())).forEach(([key, value]) => {
    if(!value || value === "" || value === undefined || value === null){
      return;
    }
    redirectUrl.append(key, value.toString());
  });
  //console.log(vnpUrl + redirectUrl.toString());
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(redirectUrl.toString(), 'utf-8')).digest("hex");
  redirectUrl.append("vnp_SecureHash",signed);
  console.log(redirectUrl.toString());
  res.status(200).json({"redirectLink": vnpUrl + "?" + redirectUrl.toString()})
};

export default {
  createPaymentUrl,
};
