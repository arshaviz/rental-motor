/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../assets/css/carousel.css';
import CarouselCard from './CarouselCard';
import { mapItemsToProps } from '../helpers/index';

const LeftArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={` arrow ${className}`} style={style} />
  );
};

const RightArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`} style={style} />
  );
};

const Carousel = props => {
  const { items } = props;
  const latestItems = items.slice(0, 6);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
  };
  return (
    <Slider style={{ width: '90%' }} {...settings}>
      {latestItems.map(item => (
        <CarouselCard key={item.id} item={item} />
      ))}
    </Slider>
  );
};

LeftArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

RightArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      model: PropTypes.string,
      color: PropTypes.string,
      transmission: PropTypes.string,
      engine: PropTypes.string,
      rentDeposit: PropTypes.string,
      pricePerDay: PropTypes.string,
      itemImg: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapItemsToProps)(Carousel);
