import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CardItem = props => {
  const { item } = props;
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
      <div className="card">
        <img className="card-img-top" src={item.itemImg} alt={`${item.model}`} />
        <div className="card-block p-2">
          <h4 className="card-title text-truncate mt-3">{item.model}</h4>
          <div className="text-muted">
            <h6>{`Price per day : ${item.pricePerDay}$`}</h6>
          </div>
        </div>
        <div className="card-footer ">
          {item.color}
          <Link
            to={`/item/${item.id}`}
            className="btn btn-customized float-right btn-sm"
          >
            Show details
          </Link>
        </div>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    model: PropTypes.string,
    color: PropTypes.string,
    itemImg: PropTypes.string,
    pricePerDay: PropTypes.string,
  }).isRequired,
};

export default CardItem;
