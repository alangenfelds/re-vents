import {CREATE_EVENT, UPDATE_EVENT ,DELETE_EVENT, FETCH_EVENTS } from './eventConstants'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';

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
    }
}

export const fetchEvents = (events) => {
    return {
        type: FETCH_EVENTS,
        payload: {
            events
        }
    }
}

export const createEvent = (newEvent) => {
    return {
        type: CREATE_EVENT,
        payload: {
            newEvent
        }
    }
}

export const updateEvent = (updatedEvent) => {
    return {
        type: UPDATE_EVENT,
        payload: {
            updatedEvent: updatedEvent
        }
    }
}

export const deleteEvent = (eventId) => {
    console.log('eventActions')
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
}