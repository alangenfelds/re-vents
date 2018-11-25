import {CREATE_EVENT, UPDATE_EVENT ,DELETE_EVENT, } from './eventConstants'

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