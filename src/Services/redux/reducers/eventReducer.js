import { ADD_EVENT, DELETE_EVENT } from '../constants/event-types'

const initialState = {
  events: []
}
// const deleteById = (state = initialState, id) => {
//   const idEvent = state.events.indexOf(id)
//   if (idEvent !== -1) state.events.splice(idEvent, 1)
//   return state
// }

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id != action.payload)
      }
    default:
      return state
  }
}
export default eventReducer
