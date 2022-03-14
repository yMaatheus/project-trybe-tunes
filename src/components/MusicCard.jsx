import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <section key={ trackName }>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${<code>audio</code>}.`}
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  key: PropTypes.string,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
