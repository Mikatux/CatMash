import React, {Component} from 'react';
import logo from '../logo.jpg';
import '../Styles/Home.css';
import firebase from 'firebase';
import Facebook from '../Core/Facebook';
import TopBar from '../Components/TopBar';

class Home extends Component {

  componentWillMount() {
    console.log(Facebook.userSingIn());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        this.setState({userName: displayName});


      } else {
        // User is signed out.

      }
      this.forceUpdate();
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }

  render() {
    if (Facebook.userIsLogged()) {
      return (
        <div className="Home">
          <TopBar userName={this.state.userName}/>
          <p className="Home-intro">
            Bonjour {this.state.userName}
          </p>
        </div>
      )
    }
    else
      return (
        <div className="Home">
          <TopBar/>
          <p className="Home-intro">
            Merci de vous connecter pour acceder aux informations
          </p>
        </div>
      );
  }
}

export default Home;
