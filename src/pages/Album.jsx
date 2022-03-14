import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.handleFavoriteSong = this.handleFavoriteSong.bind(this);
    this.isFavoriteMusic = this.isFavoriteMusic.bind(this);
    this.state = {
      isLoading: true,
      musics: [],
      album: {},
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const album = musics[0];
    const array = musics.filter((music, index) => index !== 0 && music);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      album,
      musics: array,
      isLoading: false,
      favoriteSongs,
    });
  }

  handleFavoriteSong(checked, music) {
    const { favoriteSongs } = this.state;
    this.setState({ isLoading: true }, async () => {
      const isFavoriteSong = this.isFavoriteMusic(music);
      let newFavoriteSongs;
      if (!(isFavoriteSong) && checked) {
        await addSong(music);
        newFavoriteSongs = [...favoriteSongs, music];
      } else {
        await removeSong(music);
        newFavoriteSongs = favoriteSongs.filter(
          ({ trackId }) => trackId !== music.trackId,
        );
      }
      this.setState({
        isLoading: false,
        favoriteSongs: newFavoriteSongs,
      });
    });
  }

  isFavoriteMusic(music) {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some(({ trackId }) => trackId === music.trackId);
  }

  render() {
    const { isLoading, musics, album, favoriteSongs } = this.state;
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
              {musics.map((music) => (
                <MusicCard
                  key={ music.trackName }
                  music={ music }
                  handleFavoriteSong={ this.handleFavoriteSong }
                  isFavoriteSong={ favoriteSongs.some(
                    ({ trackId }) => trackId === music.trackId,
                  ) }
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
