import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import './Gallery.scss';

class Gallery extends Component {
  constructor() {
    super();

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }
  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return;

    this.gotoNext();
  }
  renderGallery() {
    if (!this.props.images) return;
    const gallery = this.props.images.map((obj, i) => {
      return (
        <a
          href={obj.src}
          key={i}
          onClick={(e) => this.openLightbox(i, e) }
          className="thumbnail"
          >
          <img
            src={obj.thumbnail}
            className="thumbnailImage"
            />
        </a>
      );
    });

    return (
      <div className="gallery">
        {gallery}
      </div>
    );
  }
  handleDownload() {
    window.open(this.props.images[this.state.currentImage].src);
  }
  render() {
    return (
      <div className="gallery_div">
        <div className="gallery_container">
          {this.props.heading && <h2>{this.props.heading}</h2>}
          {this.props.subheading && <p>{this.props.subheading}</p>}
          {this.renderGallery() }
          <Lightbox
            currentImage={this.state.currentImage}
            images={this.props.images}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClickImage={this.handleClickImage}
            onClose={this.closeLightbox}
            theme={this.props.theme}
            imageCountSeparator='/'
            />
        </div>
      </div>
    );
  }
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
  heading: PropTypes.string,
  images: PropTypes.array,
  sepia: PropTypes.bool,
  subheading: PropTypes.string,
};

export default Gallery;