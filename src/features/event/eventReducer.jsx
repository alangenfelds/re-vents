import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "./eventConstants";

 const initialState = [];

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
    const newEvent = action.payload.newEvent;
    newEvent.attendees = [];
      return {
        events: [...state.events, Object.assign({}, newEvent)]
      };

    case UPDATE_EVENT:
      return {
          events: [...state.events.filter(e => e.id !== action.payload.updatedEvent.id), Object.assign({}, action.payload.updatedEvent)]
      }


    case DELETE_EVENT:
      console.log('eventReducer', action)
      return {
          events: [...state.events.filter(e => e.id !== action.payload.eventId)]
      }

      case FETCH_EVENTS:
        return action.payload.events;
      
    default:
      return state;
  }
};

export default eventReducer;
