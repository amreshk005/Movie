import axios from "axios";
import { FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE } from "./actionTypes";

const fetchGetRequest = (query) => {
  return {
    type: FETCH_MOVIE_REQUEST,
  };
};

const fetchGetSuccess = (data) => {
  return {
    type: FETCH_MOVIE_SUCCESS,
    data: data,
  };
};

const fetchGetFailure = (error) => {
  return {
    type: FETCH_MOVIE_FAILURE,
    error: error,
  };
};

const fetchData = (Obj) => {
  //   let url = `http://127.0.0.1:8000/search?q="superman"&page=1`;
  console.log(Obj.page);
  let url = `http://www.omdbapi.com/?i=tt3896198&apikey=4248d4db&s=${Obj.query}&page=${Obj.page}`;

  return async (dispatch) => {
    dispatch(fetchGetRequest());
    return await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        return dispatch(fetchGetSuccess(res.data));
      })
      .catch((err) => {
        // dispatch(fetchGetFailure(err))
        console.log(err);
      });
  };
};

export { fetchData, fetchGetRequest, fetchGetSuccess, fetchGetFailure };
