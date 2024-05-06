export const convertPrice = (price) => {
  try {
    return `${price.toLocaleString().replaceAll(',','.')} VND`
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