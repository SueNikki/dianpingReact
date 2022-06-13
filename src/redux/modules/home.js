import { combineReducers } from 'redux';
import url from '../../utils/url';
import {FETCH_DATA} from '../middleware/api';
import { schema } from './entities/products';

export const params = {
  PATH_LIKES: 'likes',
  PATH_DISCOUNTS: 'discounts',
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3,
}

export const types = {
  // 获取猜你喜欢请求
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",
  // 获取超值特惠请求
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST",
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS",
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE",
}

const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  },
  discounts: {
    isFetching: false,
    ids: []
  }
}
// actions
export const actions = {
  // 加载猜你喜欢的数据
  loadLikes: () => {
    return (dispatch, getState) => {
      const {pageCount} = getState().home.likes;
      const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
      const endpoint = url.getProductList(params.PATH_LIKES,rowIndex,params.PAGE_SIZE_LIKES)
      return dispatch(fetchLikes(endpoint))
    }
  },
  // 加载特惠商品数据
  loadDiscounts: () => {
    return (dispatch,getState) => {
      const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS)
      return dispatch(fetchDiscounts(endpoint))
    }
  }
}

const fetchLikes = (endpoint, params) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE
    ],
    endpoint,
    schema
  }
})

const fetchDiscounts = (endpoint, params) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_DISCOUNTS_REQUEST,
      types.FETCH_DISCOUNTS_SUCCESS,
      types.FETCH_DISCOUNTS_FAILURE
    ],
    endpoint,
    schema
  }
})
// 猜你喜欢的reducer
const likes = (state = initialState.likes, actions) => {
  switch(actions.type) {
    case types.FETCH_LIKES_REQUEST: 
      return {...state, isFetching: true};
    case types.FETCH_LIKES_SUCCESS: 
      return {
        ...state, isFetching: false, 
        pageCount: state.pageCount + 1, 
        ids: state.ids.concat(actions.response.ids)
      };
    case types.FETCH_LIKES_FAILURE: 
      return {...state, isFetching: true};
    default:
      return state;
  }
}
// 特惠商品的reducer
const discounts = (state = initialState.discounts, actions) => {
  switch(actions.type) {
    case types.FETCH_DISCOUNTS_REQUEST: 
      return {...state, isFetching: true};
    case types.FETCH_DISCOUNTS_SUCCESS: 
      return {
        ...state, isFetching: false, 
        ids: state.ids.concat(actions.response.ids)
      };
    case types.FETCH_DISCOUNTS_FAILURE: 
      return {...state, isFetching: true};
    default:
      return state;
  }
}

const reducer = combineReducers({
  likes,
  discounts
})

export default reducer;

// selections
// 获取猜你喜欢state
export const getLikes = state => {
  return state.home.likes.ids.map(id => {
    return state.entities.products[id]
  })
}
// 获取特惠商品state
export const getDiscounts = state => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id]
  })
}
// 猜你喜欢当前页码
export const getPageCountOfLikes = state => {
  return state.home.likes.pageCount
}