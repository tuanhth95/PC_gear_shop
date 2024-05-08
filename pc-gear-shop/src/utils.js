export const convertPrice = (price) => {
  try {
    return `${price.toLocaleString().replaceAll(',','.')}`
  } catch(e){
    return null
  }
}
export function getItem(label, key, icon, children, type) {
  return {
      key,
      icon,
      children,
      label,
      type,
  };
}
export const renderOptions = (arr) => {
  let results = []
  if(arr) {
      results = arr?.map((opt) => {
          return {
              value: opt,
              label: opt
          }
      })
  }
  results.push({
      label: 'Thêm type',
      value: 'add_type'
  })
  return results
}