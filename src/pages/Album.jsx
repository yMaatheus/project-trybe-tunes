import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <span>Album Page</span>
      </div>
    );
  }
}

export default Album;
