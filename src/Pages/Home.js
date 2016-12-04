import React, {Component} from 'react';
import '../Styles/Home.css';
import firebase from 'firebase';
import Facebook from '../Core/Facebook';
import TopBar from '../Components/TopBar';
import Game from '../Components/Game';

class Home extends Component {

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        this.setState({userName: displayName});

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
          <Game />
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
