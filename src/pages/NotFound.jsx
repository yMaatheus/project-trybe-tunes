import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h1>ERROR 404</h1>
        <span>Page Not Found</span>
      </div>
    );
  }
}

export default NotFound;
