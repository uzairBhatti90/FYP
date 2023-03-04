import {ADD_AUTH, LOGOUT, SPLASH_END, AUTHENTICATED} from '../types';
import {_retrieveData} from '../../Backend/AsyncFuncs';

const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_AUTH:
      const {id,user_type}=action.payload;
      console.log("ADD_AUTH triggered",{user_type},{id})
      return {...state, isUserPresent:  true , user_type:action.payload.user_type,id:action.payload.id};
    case LOGOUT:
      // const {id: lougtId,user_type: logoutUserType}=action.payload;
      return {...state, user: null, isUserPresent: false, user_type: '', id: ''};

    default:
      return state;
  }
};

export default authReducer;
