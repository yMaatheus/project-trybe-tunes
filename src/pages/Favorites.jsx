import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.handleFavoriteSong = this.handleFavoriteSong.bind(this);
    this.isFavoriteSong = this.isFavoriteSong.bind(this);
    this.state = {
      isLoading: true,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs,
    });
  }

  handleFavoriteSong(checked, music) {
    const { favoriteSongs } = this.state;
    this.setState({ isLoading: true }, async () => {
      const isFavoriteSong = this.isFavoriteSong(music);
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

  isFavoriteSong(music) {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some(({ trackId }) => trackId === music.trackId);
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : (
          <section>
            <h4>Músicas favoritas:</h4>
            <section>
              {favoriteSongs.map((music) => (
                <MusicCard
                  key={ music.trackName }
                  music={ music }
                  handleFavoriteSong={ this.handleFavoriteSong }
                  isFavoriteSong
                />
              ))}
            </section>
          </section>
        ) }
      </div>
    );
  }
}

export default Favorites;
