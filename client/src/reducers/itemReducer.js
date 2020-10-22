import * as actions from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ITEMS:
      //fetch data from server
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case actions.ADD_ITEMS:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case actions.DELETE_ITEMS: {
      const newArray = state.items.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        items: newArray,
      };
    }

    case actions.ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default itemReducer;
