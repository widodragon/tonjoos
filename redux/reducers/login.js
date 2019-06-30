const initialState = {
  isLoading: false,
  login:{}
}
export default contacts = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LOGIN_PENDING':
    return {
      ...state,
      isLoading: true
    }

    case 'GET_LOGIN_REJECTED':
    return {
      ...state,
      isLoading: false
    }

    case 'GET_LOGIN_FULFILLED':
    return {
      ...state,
      isLoading: false,
      login: action.payload.data
    }

    default:
    return state;
  }
}
