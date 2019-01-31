import { toastr } from "react-redux-toastr";

import { createNewEvent } from './../../app/common/util/helpers'

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

export const createEvent = event => {
  return async (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    // const user = firestore.auth().currentUser;
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userId: user.uid,
        eventDate: event.date,
        host: true
      })
      // dispatch({
      //   type: CREATE_EVENT,
      //   payload: { newEvent }
      // });
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
