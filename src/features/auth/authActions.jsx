import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";
import { closeModal } from "../modals/modalActions";

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (err) {
      throw new SubmissionError({
        //   _error: err.message
        _error: "Login failed"
      });
    }
  };
};

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    // 1. create user in auth
    // let createdUser = 
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    // console.log('createdUser', createdUser);

    // 2. update auth profile

    // await createdUser.updateProfile({
    //     displayName: user.displayName
    // });
    let user1 = await firebase.auth().currentUser;
    await user1.updateProfile({
      displayName: user.displayName
    });

    // 3. create a new profile in firestore
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    };

    await firestore.set(`users/${user1.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (err) {
    throw new SubmissionError({
      _error: err.message
      // _error: "Login failed"
    });
  }
};

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase,getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    let user = await firebase.login({
      provider: selectedProvider,
      type: 'popup'
    });

    if(user.additionalUserInfo.isNewUser) {
        await firestore.set(`/users/${user.user.uid}`, {
            displayName: user.profile.displayName,
            photoURL: user.profile.avatarUrl,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });
    }
    // console.log('user', user)
  } catch (err) {
    console.log(err);
  }
};

export const updatePassword = (creds) =>
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        try {
            await user.updatePassword(creds.newPassword1)
            await dispatch(reset('account')); // form name to reset
            toastr.success('Success', 'Your password has been updated');
        } catch(err) {
            throw new SubmissionError({
                _error: err.message
              });
        }
    }
