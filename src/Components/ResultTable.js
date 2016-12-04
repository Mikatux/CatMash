/**
 * Created by Mika on 12/4/16.
 */
import React, {Component} from 'react';
import {Grid, Cell, Card} from 'react-mdl';
import '../Styles/ResultTable.css';
import firebase from 'firebase';
import catmashLogo from '../../public/catmash.png';

class ResultTable extends Component {

  componentWillMount() {
    this.getInfos();
  }

  constructor(props) {
    super(props);
    this.state = {
      game: [],
      nbTotalVote: 0
    }
  }

  getInfos() {
    this.setState({game: []});

    firebase.database().ref('/votes').once('value').then((snapshot) => {
      this.setState({nbTotalVote: snapshot.numChildren()});
      const table = [];
      for (let key in snapshot.val()) {
        if (table.find((cat) => (cat.id === snapshot.val()[key].winner.id))) {
          table.find((cat) => (cat.id === snapshot.val()[key].winner.id)).voteNumber++;
        }
        else {
          const cat = snapshot.val()[key].winner;
          cat.voteNumber = 1;
          table.push(cat);
        }

      }
      table.sort(function (a, b) {
        return (a.voteNumber < b.voteNumber) ? 1 : ((a.voteNumber > b.voteNumber) ? -1 : 0);
      });

      this.setState({table});
    });
  }

  render() {
    if (this.state.table) {
      return (
        <div className="ResultTable">
          {this.state.table.map((cat) => {
            return <div className="ResultItem" key={cat.id} ><img src={cat.imgUrl} alt="cat"/>
              <div className="ResultVote">{cat.voteNumber}</div>
            </div>;
          })
          }

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

export default ResultTable;
