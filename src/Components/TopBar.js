/**
 * Created by Mika on 12/3/16.
 */
import React, {Component} from 'react';
import '../Styles/TopBar.css';
import {Header, Navigation} from 'react-mdl';
import logo from '../logo.jpg';
import {Link} from 'react-router'
import Facebook from '../Core/Facebook';

class Home extends Component {

  render() {
    let loginButton = null;
    if (this.props.userName) {
      loginButton = <span className="loginButton" onClick={Facebook.userSingOut}>Deconnection</span>;
    } else {
      loginButton = <span className="loginButton" onClick={Facebook.userSingIn}>Connection</span>;
    }
    return (
      <div className="TopBar">
        <Header transparent title={<img src={logo} style={{float: 'left',height:'64px'}} alt="CatMash logo"/>}>
          <Navigation>
            <Link to="/about">A Propos</Link>
            { loginButton }
          </Navigation>
        </Header>
      </div>
    );
  }
}

export default Home;
