import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <span>Favorites Page</span>
      </div>
    );
  }
}

export default Favorites;
