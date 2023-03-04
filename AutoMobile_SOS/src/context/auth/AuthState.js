import React, {useReducer, useRef, useState, useEffect} from 'react';
import {_retrieveData} from '../../Backend/AsyncFuncs';
import {ADD_AUTH, LOGOUT, SPLASH_END, AUTHENTICATED} from '../types';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';

const AuthState = props => {

  const initialState = {
    isLoading: true,
    isUserPresent: false,
    user: null,
    user_type: null,
    id:null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const addAuth = (id,user_type )=> {
    dispatch({type: ADD_AUTH, payload: {id,user_type}});
  };

  const logout = (id, user_type) => {
    dispatch({type: LOGOUT, payload: {id, user_type}});
  };
  const makeSplashEnd = () => {
    dispatch({type: SPLASH_END});
  };
  const checkUser = () => {
    dispatch({type: AUTHENTICATED});
  };
  return (
    <AuthContext.Provider
      value={{
        data: state,
        checkUser,
        addAuth,
        logout,
       
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
