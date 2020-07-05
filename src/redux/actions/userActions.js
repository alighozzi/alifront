import {
  SET_AUTHENTICATED,
  LOADING,
  STOP_LOADING,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOG_OUT,
} from "../types";
import axios from "axios";
import { setItem } from "../../utilis/localStorageHelper";

export const loginAdmin = (admin, history) => (dispatch) => {
  dispatch({ type: LOADING });
  axios
    .post("http://localhost:5000/api/login/admin", admin)
    .then((res) => {
      dispatch({ type: SET_AUTHENTICATED });
      setItem("token", res.data.token);
      // setItem("token", res.data.token);
      console.log(res.data.token);
      history.push("/home");
      dispatch({ type: STOP_LOADING });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem("token");
  dispatch({ type: LOG_OUT });
};

export const showListAdmin = () => {
  axios.get("http://localhost:5000/api/show/all");
};
// export const loadProductBabaliste = () => {
//   axios.get(
//     `http://localhost:5000/api/show/all/produit-babaliste/${categorie}/${subcategorie}/${nbafficher}/${startDate}/${endDate}`
//   );
// };
