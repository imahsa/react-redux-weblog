// we don't need to say file name because it is index.js
import _ from 'lodash';
import { FETCH_POSTS } from '../actions';
import { FETCH_POST } from '../actions';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      /** ES5 Syntax:
      const post = action.payload.data;
      const newState=  {...state };
      newState[post.id] = post;
      return newState;
      **/
      /** ES6 syntax:
      This is an object that is going to get all the state we have "...state"
      Key Interpolation: And whatever our object is so far make a
      New key: "[action.payload.data.id]" with value: "action.payload.data"
      **/
      return {...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      /**
      Usisng this _.mapKeys funcion we can
      map our array of posts with [{title:"b", id:1}, {title:"a", id:2}]
      to an object with key: each posts id
      and value: the posts object
      {1: {title:"b", id:1}, 2:{title:"a", id:2}  }
      **/
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
