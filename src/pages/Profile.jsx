import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      isLoading: false,
      user,
    });
  }

  render() {
    const { isLoading, user: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <section>
            <img src={ image } alt="" data-testid="profile-image" />
            <Link to="/profile/edit">
              <button type="submit">Editar perfil</button>
            </Link>
            <h4>Nome</h4>
            <span>{name}</span>
            <h4>Email</h4>
            <span>{email}</span>
            <h4>Descrição</h4>
            <p>{description}</p>
          </section>
        ) }
      </div>
    );
  }
}

export default Profile;
