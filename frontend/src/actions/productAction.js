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
export const getProducts = (keyword = "", currentPage = 1) => async (dispatch) => {
   try {
      dispatch({ type: All_PRODUCT_REQUEST });
      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}`;
      const { data } = await axios.get(link);
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
      const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
      dispatch({ type: PRODUCT_DETAILS_REQUEST });

      // console.log(data, "hello");

      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });

   } catch (error) {
      // console.log(error);
      dispatch({
         type: PRODUCT_DETAILS_FAIL,
         payload: error.message
      });
   }
};
