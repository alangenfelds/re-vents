import moment from "moment";
import { toastr } from "react-redux-toastr";
import cuid from 'cuid'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions'

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }

  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Profile updated");
  } catch (err) {
    console.log(err);
  }
};

export const uploadProfilePicture = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };

  try {
    dispatch(asyncActionStart());
    // 1. Upload file to Firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);

    // 2. get url of stored image
    // let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;  // DEPRECATED!!!
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

    // 3. get userdoc from Firestore
    let userDoc = await firestore.get(`users/${user.uid}`);
    // 4. check if user already has photo, if not update profile with new image
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    // 5. add new photo to photos collection
      await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
    throw new Error("Problem uploading photo");
  }
};

export const deletePhoto = (photo) => 
  async (dispatch, getState, {getFirebase, getFirestore} ) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos', doc: photo.id}]
      })
    } catch(error) {
      console.log(error);
      throw new Error('Problem deleting the photo')
    }

  }

  export const setMainPhoto = photo => 
    async (dispatch, getState, {getFirebase} ) => {
      const firebase = getFirebase();
      try {
        return await firebase.updateProfile({
          photoURL: photo.url
        })
      } catch(error){
        console.log(error);
        throw new Error('Problem setting main photo');
      }
    }