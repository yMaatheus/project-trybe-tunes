import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      musics: [],
      album: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const album = musics[0];
    const array = musics.filter((music, index) => index !== 0 && music);
    this.setState({
      album,
      musics: array,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, musics, album } = this.state;
    const { artistName, artworkUrl100, collectionName } = album;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : (
          <section>
            <section>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <h1 data-testid="album-name">{collectionName}</h1>
              <p data-testid="artist-name">{artistName}</p>
            </section>
            <section>
              {musics.map(({ trackName, previewUrl }) => (
                <MusicCard
                  key={ trackName }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                />
              ))}
            </section>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
