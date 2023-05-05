import axios from "axios";
import {
   All_PRODUCT_REQUEST,
   All_PRODUCT_SUCCESS,
   All_PRODUCT_FAIL,
   CLEAR_ERRORS,
} from "../constants/productConstant";

//get all products
export const getProduct = () => async (dispatch) => {
   try {
      dispatch({ type: All_PRODUCT_REQUEST });
      const { data } = await axios.get("/api/v1/products");
      dispatch({ type: All_PRODUCT_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: All_PRODUCT_FAIL,
         payload: (error.response && error.response.statusText) ? error.response.statusText : "Something went wrong"
      });
   }
};

//Clear all errors
export const clearErrors = () => async (dispatch) => {
   dispatch({ type: CLEAR_ERRORS });
};
