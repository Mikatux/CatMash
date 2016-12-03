import React, { Component } from 'react';
import '../Styles/NotFound.css';
class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <div className="NotFound-header">
          <h2>Désole mais la page recherchée n'est pas disponnible</h2>
        </div>
      </div>
    );
  }
}

export default NotFound;
