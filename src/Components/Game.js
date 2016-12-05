/**
 * Created by Mika on 12/4/16.
 */
import React, {Component} from 'react';
import {Grid, Cell, Card} from 'react-mdl';
import '../Styles/Game.css';
import GameCard from './GameCard'
import firebase from 'firebase';
import catmashLogo from '../../public/catmash.png';

class Game extends Component {

  playerVote(cat) {
    firebase.database().ref('votes/').push({
      winner: cat,
      firstCat: this.state.game[0],
      secondCat: this.state.game[1],
      playerId: firebase.auth().currentUser.uid
    });
    this.setNextGame();
  }

  componentWillMount() {
    this.loadFromFirebase();
    this.setNextGame();

  }

  constructor(props) {
    super(props);
    this.state = {
      game: [],
      catList: []

    }
  }

  loadFromFirebase() {

    firebase.database().ref('/cats').on('value', (snapshot) => {
      const catList = [];
      for (let key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          const cat = snapshot.val()[key];
          cat.id = key;
          catList.push(cat);
        }
      }
      this.setState({catList});

    });
  }

  setNextGame() {
    if (this.state.catList.length <= 1) {
      this.setState({game: []});
      setTimeout(this.setNextGame.bind(this), 1000);
      return;
    }

    const firstCatNumber = parseInt(Math.random() * this.state.catList.length, 10);
    let secondCatNumber = parseInt(Math.random() * this.state.catList.length, 10);
    while (secondCatNumber === firstCatNumber)
      secondCatNumber = parseInt(Math.random() * this.state.catList.length, 10);

    const game = [];

    game.push(this.state.catList[firstCatNumber]);
    game.push(this.state.catList[secondCatNumber]);

    this.setState({game});
  }

  render() {
    if (this.state.game && this.state.game.length >= 2) {
      return (
        <div className="Game">
          <Grid>
            <Cell col={6} onClick={() => this.playerVote(this.state.game[0])}>
              <GameCard bgColor="#BDBDBD" imgUrl={this.state.game[0].imgUrl}/>
            </Cell>
            <div className="gameMiddleImage">
              <img src={catmashLogo} alt="logo"/>
            </div>
            <Cell col={6} onClick={() => this.playerVote(this.state.game[1])}>
              <GameCard bgColor="#7986CB" imgUrl={this.state.game[1].imgUrl}/>
            </Cell>
          </Grid>
        </div>
      );
    }
    else {
      return (

        <div className="Game">
          <Grid>
            <Cell col={6}><Card>Chargement en cours</Card></Cell>
            <div className="gameMiddleImage rotate">
              <img src={catmashLogo} alt="logo"/>
            </div>
          </Grid>
        </div>
      );
    }
  }
}

export
default
Game;
