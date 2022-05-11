export default function formErrors(formAddress) {
  const result = {}
  Object.keys(formAddress).forEach((key) => {
    if (!formAddress[key]) {
      result[key] = `${key} is required!`
    }
  })

  return result
}
