/**
 * Created by Mika on 12/4/16.
 */

import React, {Component} from 'react';
import '../Styles/GameCard.css';
import { Card } from 'react-mdl';

class GameCard extends Component {

  render() {

    return (
      <div className="GameCard">
        <Card shadow={0} style={{width: '100%', background: this.props.bgColor, margin: 'auto'}}>
          <img src={this.props.imgUrl} alt="Cat"/>
        </Card>
      </div>
    );
  }
}

export default GameCard;
