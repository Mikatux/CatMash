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
  getCurrentGame(){
    return {players:[{imgUrl:'http://25.media.tumblr.com/Jjkybd3nSfqigafwIsenIB0Uo1_500.jpg',id:'2d0'},{imgUrl:'http://24.media.tumblr.com/tumblr_ly65xhmThT1r2rj8po1_1280.jpg',id:'d77'}]}
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
