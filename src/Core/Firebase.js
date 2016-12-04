/**
 * Created by Mika on 12/3/16.
 */
import firebase from 'firebase';

const Firebase = {

  importCatsInFirebase: function (data) {
    if (Array.isArray(data))
      data.forEach((c) => {
        firebase.database().ref('cats/').push({imgUrl: c.url});
      })
  },

}

module.exports = Firebase;