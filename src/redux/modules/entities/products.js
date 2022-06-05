export const schema = {
  name: 'products',
  id: 'id'
}

const reducer = (state = {}, action) => {
  if(action.reducer && action.response.products) {
    return {...state, ...action.response.products}
  }
  return state;
}

export default reducer;