import * as actions from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch) => {
  dispatch(setItemLoading());
  axios
    .get("api/items")
    .then((res) => {
      dispatch({
        type: actions.GET_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addItem = (item) => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.ADD_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`api/items/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.DELETE_ITEMS,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setItemLoading = () => {
  return {
    type: actions.ITEM_LOADING,
  };
};
