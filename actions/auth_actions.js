import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

//How to use AsyncStorage;
//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // Dispatch an action saying FB logi  is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB login process
    doFacebookLogin(dispatch);
  }
};
//Helper function
const doFacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('177993469708929', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
