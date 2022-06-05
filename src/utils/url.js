const url = {
  getProductList: (path, rowIndex, pageSize) => {
    return `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`
  }
}
export default url