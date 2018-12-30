import { toastr } from "react-redux-toastr";

import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData(); // fetching data
      dispatch(fetchEvents(events)); // passing data to reducer
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: {
      events
    }
  };
};

export const createEvent = newEvent => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: { newEvent }
      });
      toastr.success("Success!", "Event has been created");
    } catch (err) {
      console.log(err);
      toastr.error("Oops!", "Something went wrong");
    }
  };
  // return {
  //     type: CREATE_EVENT,
  //     payload: {
  //         newEvent
  //     }
  // }
};

export const updateEvent = updatedEvent => {
  // return {
  //     type: UPDATE_EVENT,
  //     payload: {
  //         updatedEvent: updatedEvent
  //     }
  // }
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: { updatedEvent }
      });
      toastr.success("Success!", "Event has been updated");
    } catch (err) {
      console.log(err);
      toastr.error("Oops!", "Something went wrong");
    }
  };
};

export const deleteEvent = eventId => {
  console.log("eventActions");
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  };
};
