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

  playerVote(id) {
    console.log(id);
    this.setNextGame()

  }

  componentWillMount() {
    this.setNextGame()
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

      let randomValue = parseInt(Math.random() * snapshot.numChildren(), 10);

      let i = 0;
      let firstId = null;
      for (firstId in snapshot.val()) {
        if (i++ === randomValue)break
      }

      const firstCat = {imgUrl: snapshot.val()[firstId].imgUrl, id: firstId};

      i = 0;
      randomValue = parseInt(Math.random() * snapshot.numChildren(), 10);

      for (firstId in snapshot.val()) {
        if (i++ === randomValue)break
      }

      const secondCat = {imgUrl: snapshot.val()[firstId].imgUrl, id: firstId};

      this.setState({game: [firstCat, secondCat]});
    });
  }

  render() {
    if (this.state.game && this.state.game.length >= 2) {
      return (
        <div className="Game">
          <Grid>
            <Cell col={6} onClick={() => this.playerVote(this.state.game[0].id)}>
              <GameCard bgColor="#BDBDBD" imgUrl={this.state.game[0].imgUrl}/>
            </Cell>
            <div className="gameMiddleImage">
              <img src={catmashLogo} alt="logo" />
            </div>
            <Cell col={6} onClick={() => this.playerVote(this.state.game[1].id)}>
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
          </Grid>
        </div>
      );
    }
  }
}

export default Game;
