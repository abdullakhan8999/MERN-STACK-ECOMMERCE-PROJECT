import axios from "axios";
import {
   All_PRODUCT_REQUEST,
   All_PRODUCT_SUCCESS,
   All_PRODUCT_FAIL,
   CLEAR_ERRORS,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL,
} from "../constants/productConstant";

//get all products
export const getProduct = () => async (dispatch) => {
   try {
      dispatch({ type: All_PRODUCT_REQUEST });
      const { data } = await axios.get("/api/v1/products");
      // console.log(data, "hello");  
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


// get product details
export const getProductDetails = (id) => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/v1/product/${id}`);
      // console.log(data, "hello");  

      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });

   } catch (error) {
      console.log(error);
      dispatch({
         type: PRODUCT_DETAILS_FAIL,
         payload: error.response.data.message
      });
   }
};
