// we don't need to say file name because it is index.js
import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
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
