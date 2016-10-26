import React from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';
//import ImageGallery from '../../utils/image-gallery';
import Styles from './image-gallery.scss';
import { imageUrl } from '../../config'

class ImageGallerys extends React.Component {

  constructor() {
    super();
    this.state = {
      isPlaying: true,
      showIndex: false,
      slideOnThumbnailHover: false,
      showBullets: true,
      infinite: true,
      showThumbnails: false,
      showNav: false,
      slideInterval: 2000,
      fullscreen: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval) {
      // refresh setInterval
      this._pauseSlider();
      this._playSlider();
    }
  }

  _pauseSlider() {
    this._imageGallery.pause();
    this.setState({isPlaying: false});
  }

  _playSlider() {
    this._imageGallery.play();
    this.setState({isPlaying: true});
  }

  _fullScreen() {
    this._imageGallery.fullScreen();
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target.src, 'at index', this._imageGallery.getCurrentIndex());
    let banner = this.props.banner
    location.href = banner[this._imageGallery.getCurrentIndex()].link
  }

  _onSlide(index) {
  }

  _onPause(index) {
    this.setState({isPlaying: false});
  }

  _onPlay(index) {
    this.setState({isPlaying: true});
  }

  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  render() {
    let banner = this.props.banner ? this.props.banner : []

    // let bannnerList = banner.map((val, i) => {
    //   let imgInfo = val.resource
    //   return {
    //     original: `${imageUrl}/${imgInfo.module}/${imgInfo.filename}`,
    //     thumbnail: `${imageUrl}/${imgInfo.module}/${imgInfo.filename}`,
    //     link: val.link,
    //   }
    // })

    if(banner.length < 1) {
      return (
        <div className='no-image-gallery'></div>
      )
    }

    let bannnerList = banner.map((val, i) => {
      let imgInfo = val.resource
      return {
        original: `${imgInfo.url}@156h_380w_1e_1c`,
        thumbnail: `${imgInfo.url}@80w`,
        link: val.link,
      }
    })
    return (
      <section style={{clear:'both'}}>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={bannnerList}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onSlide={this._onSlide}
          onPause={this._onPause.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          slideInterval={parseInt(this.state.slideInterval)}
          autoPlay={this.state.isPlaying}
          slideOnThumbnailHover={this.state.slideOnThumbnailHover}
        />
      </section>
    );
  }
}

export default ImageGallerys;
