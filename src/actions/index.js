import axios from "axios";

export const READ_EVENTS = "READ_EVENTS";

const ROOT_URL = "https://udemy-utils.herokuapp.com/api/v1";
const QUERRYSTRING = "?token=token123";

export const readEvents = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/events${QUERRYSTRING}`);
  // console.log(response);
  dispatch({ type: READ_EVENTS, response });
};
