import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <span>Profile Page</span>
      </div>
    );
  }
}

export default Profile;
