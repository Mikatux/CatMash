/**
 * Created by Mika on 12/3/16.
 */
import firebase from 'firebase';
const provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
  'display': 'popup'
});

const Facebook = {
  userLoggedCallback: null,
  userSingOut: function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }, function (error) {
      // Handle Errors use this infos in a real Log further
      console.error('Sing Out Fail ' + error)

    });
  },
  userSingIn: function () {
    if (firebase.auth().currentUser)
      return;
    firebase.auth().signInWithPopup(provider).then((result) => {
      firebase.database().ref('users/' + result.user.uid).update({
        displayName: result.user.displayName,
        fbToken: result.credential.accessToken,
        imgUrl: result.user.photoURL,
        email: result.user.email
      });


    }).catch((error) => {
      // Handle Errors here maybe use this infos in a real Log further
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error('error ' + error)

    });
  },
  userIsLogged: function () {
    return firebase.auth().currentUser ? true : false;
  },

}

module.exports = Facebook;