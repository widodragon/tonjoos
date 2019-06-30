const initialState = {
  data: [],
  isLoading: false
}
export default contacts = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTACT_PENDING':
    return {
      ...state,
      isLoading: true
    }

    case 'GET_CONTACT_REJECTED':
    return {
      ...state,
      isLoading: false
    }

    case 'GET_CONTACT_FULFILLED':
    return {
      ...state,
      isLoading: false,
      data: action.payload.data
    }
    case 'ADD_CONTACT_PENDING':
    return {
      ...state,
      isLoading: true
    }

    case 'ADD_CONTACT_REJECTED':
    return {
      ...state,
      isLoading: false
    }

    case 'ADD_CONTACT_FULFILLED':
    return {
      ...state,
      isLoading: false,
      add: action.payload.data
    }
    default:
    return state;
  }
}
