/**
 * Created by Mika on 12/4/16.
 */
import React, {Component} from 'react';
import { Grid, Cell } from 'react-mdl';
import '../Styles/Game.css';
import GameCard from './GameCard'
class Game extends Component {

  playerVote(id){
    console.log(id);
  }
  render() {

    return (
      <div className="Game">
        <Grid className="demo-grid-ruler">
          <Cell col={6} onClick={()=>this.playerVote(this.props.game.players[0].id)}><GameCard bgColor="#BDBDBD" imgUrl={this.props.game.players[0].imgUrl}/></Cell>
          <Cell col={6} onClick={()=>this.playerVote(this.props.game.players[1].id)}><GameCard bgColor="#7986CB" imgUrl={this.props.game.players[1].imgUrl}/></Cell>
        </Grid>
      </div>
    );
  }
}

export default Game;
