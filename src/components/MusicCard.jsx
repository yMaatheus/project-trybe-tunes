import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
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
