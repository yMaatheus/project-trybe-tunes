import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
  //   // this.isFavoriteMusic = this.isFavoriteMusic.bind(this);
  //   // this.state = {
  //   //   favoriteMusic: false,
  //   // };
  // }

  // async componentDidMount() {
  //   const favoriteMusic = await this.isFavoriteMusic();
  //   this.setState({ favoriteMusic });
  // }

  // async onChangeCheckBox(event) {
  //   const { music, handleLoading } = this.props;
  //   const { target: { checked } } = event;
  //   handleLoading(true);
  //   const favoriteMusic = await this.isFavoriteMusic();
  //   if (!(favoriteMusic) && checked) {
  //     addSong(music);
  //     // this.setState(() => ({
  //     //   favoriteMusic: true,
  //     // }));
  //     console.log('Musica adicionada aos favoritos');
  //     console.log(await getFavoriteSongs());
  //     handleLoading(false);
  //     return;
  //   }
  //   removeSong(music);
  //   // this.setState(() => ({
  //   //   favoriteMusic: false,
  //   // }));
  //   console.log('Musica removida dos favoritos');
  //   console.log(await getFavoriteSongs());
  //   handleLoading(false);
  // }

  // async isFavoriteMusic() {
  //   const { music } = this.props;
  //   const array = await getFavoriteSongs();
  //   console.log(array);
  //   return array.some(({ trackId }) => trackId === music.trackId);
  // }

  render() {
    // const { favoriteMusic } = this.state;
    const { music, handleFavoriteSong, isFavoriteSong } = this.props;
    const { trackId, trackName, previewUrl } = music;
    return (
      <section>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${<code>audio</code>}.`}
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            id={ trackId }
            checked={ isFavoriteSong }
            onChange={ () => { handleFavoriteSong(!isFavoriteSong, music); } }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.object,
  handleFavoriteSong: PropTypes.func,
  isFavoriteSong: PropTypes.bool,
}.isRequired;

export default MusicCard;
