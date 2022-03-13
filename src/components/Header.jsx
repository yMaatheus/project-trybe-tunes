import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      user: name,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <Loading /> : (
          <nav>
            <span data-testid="header-user-name">{user}</span>
            <Link to="/search" data-testid="link-to-search" />
            <Link to="/favorites" data-testid="link-to-favorites" />
            <Link to="/profile" data-testid="link-to-profile" />
          </nav>
        ) }
      </header>
    );
  }
}

export default Header;
