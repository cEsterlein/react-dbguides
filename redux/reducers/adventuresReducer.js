function getId(adventures){
    return adventures.reduce((maxId, ADVENTURE) => {
      return Math.max(adventure.id, maxId)
    }, -1) + 1
}

import {
  EXPAND_ADVENTURE, COLLAPSE_ADVENTURE, ADD_ADVENTURE,  ADVENTURE_REQUEST, ADVENTURE_SUCCESS, ADVENTURE_FAILURE,
  COMPLETE_ADVENTURE, CREATE_ADVENTURE, DELETE_ADVENTURE
} from '../actions'


let adventuresReducer = function(adventures={isFetching: false, list: []}, action){
  switch(action.type){
    case EXPAND_ADVENTURE:
      var newObject = Object.assign({}, ...adventures, {list:[]})
      adventures.list.map((adventure) => {
          if(adventure.id == action.id) {
            newObject["list"].push(Object.assign({}, adventure, {expanded:true}))
          }else{
            newObject["list"].push(adventure)
          }
        })
        console.log("new state", newObject)
        return newObject

    case COLLAPSE_ADVENTURE:
      var newObject = Object.assign({}, ...adventures, {list:[]})
      adventures.list.map((adventure) => {
          if(adventure.id == action.id) {
            newObject["list"].push(Object.assign({}, adventure, {expanded:false}))
          }else{
            newObject["list"].push(adventure)
          }
        })
        return newObject

    case ADD_ADVENTURE:
      console.log('payload::::', action.payload)
      console.log('adventures::::', adventures)
      return Object.assign({}, adventures, { list:[ ...adventures.list, action.payload]})
    case ADVENTURE_REQUEST:
      return Object.assign({}, adventures, {
        isFetching: true
      })
    case  ADVENTURE_SUCCESS:
      return Object.assign({}, adventures, {
        isFetching: false,
        quote: action.response,
        authenticated: action.authenticated || false
      })
    case ADVENTURE_FAILURE:
      return Object.assign({}, adventures, {
        isFetching: false
      })
    case COMPLETE_ADVENTURE:
      return adventures.map((adventure) => {
          return adventure.id === action.id ?
          Object.assign({}, adventure, {completed: !adventure.completed}) : adventure
        })
      case DELETE_ADVENTURE:
      return adventures.filter((adventure) => {
          return adventure.id !== action.id
        })
    default:
      return adventures;
  }
}

export default adventuresReducer
