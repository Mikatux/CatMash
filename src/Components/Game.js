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
    this.setNextGame();
  }

  constructor(props) {
    super(props);
    this.state = {
      game: []
    }
  }

  setNextGame() {
    this.setState({game: []});

    firebase.database().ref('/cats').once('value').then((snapshot) => {

      const firstCatNumber = parseInt(Math.random() * snapshot.numChildren(), 10);
      let secondCatNumber = parseInt(Math.random() * snapshot.numChildren(), 10);
      while (secondCatNumber === firstCatNumber)
        secondCatNumber = parseInt(Math.random() * snapshot.numChildren(), 10);

      const game = [];
      let i = 0;
      for (let key in snapshot.val()) {
        if (i === firstCatNumber || i === secondCatNumber) {
          game.push({imgUrl: snapshot.val()[key].imgUrl, id: key});
          if (game.length >= 2)
            break;
        }
        i++;
      }

      this.setState({game});
    });
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

export default Game;
