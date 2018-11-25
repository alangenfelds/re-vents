// import { createReducer } from "../../app/common/util/reducerUtil";
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";

const initialState = {
  answer: 43
};

// export const incrementCounter = (state, payload) => {
//   return {
//     ...state,
//     answer: state.answer + 1
//   };
// };

// export const decrementCounter = (state, payload) => {
//   return {
//     ...state,
//     answer: state.answer - 1
//   };
// };

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        answer: state.answer + 1
      };

    case DECREMENT_COUNTER:
      return {
        ...state,
        answer: state.answer - 1
      };

    default:
      return state;
  }
};

export default testReducer;

// export default createReducer(initialState, {
//   [INCREMENT_COUNTER]: incrementCounter,
//   [DECREMENT_COUNTER]: decrementCounter
// });
