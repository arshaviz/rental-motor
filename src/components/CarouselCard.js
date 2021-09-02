import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CarouselCard = props => {
  const { item } = props;
  return (
    <div className="card mx-2" style={{ borderStyle: 'none' }}>
      <img
        className="card-img-top w-100 d-block"
        src={item.itemImg}
        alt={item.model}
      />
      <div className="card-body" style={{ padding: '0px' }}>
        <h4 className="card-title" style={{ fontSize: '14px' }}>
          <Link to={`/items/${item.id}`} style={{ color: '#00a5ff' }}>
            {item.model}
          </Link>
        </h4>
        <p className="text-muted" style={{ fontSize: '12px' }}>
          {`${item.color}, ${item.bodyStyle}, ${item.transmission}`}
          <br />
        </p>
      </div>
    </div>
  );
};

CarouselCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    model: PropTypes.string,
    itemImg: PropTypes.string,
    color: PropTypes.string,
    bodyStyle: PropTypes.string,
    transmission: PropTypes.string,
  }).isRequired,
};

export default CarouselCard;
