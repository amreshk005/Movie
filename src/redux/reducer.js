import { FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE } from "./actionTypes";

const initStore = {
  isLoading: false,
  data: [],
  error: "",
};

const movie = (state = initStore, action) => {
  switch (action.type) {
    case FETCH_MOVIE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case FETCH_MOVIE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default movie;
