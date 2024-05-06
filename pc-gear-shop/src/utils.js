export const convertPrice = (price) => {
  try {
    return `${price.toLocaleString().replaceAll(',','.')} VND`
  } catch(e){
    return null
  }
}