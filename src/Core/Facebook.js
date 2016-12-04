/**
 * Created by Mika on 12/3/16.
 */
import firebase from 'firebase';
const provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
  'display': 'popup'
});

const Facebook ={
  userLoggedCallback : null,
  userSingIn:function(){
    if(firebase.auth().currentUser)
      return;
    firebase.auth().signInWithPopup(provider).then((result)=> {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log(user)

    }).catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log('error '+error)

    });
  },
  userIsLogged:function(){
    return firebase.auth().currentUser?true:false;
  },

}

module.exports = Facebook;