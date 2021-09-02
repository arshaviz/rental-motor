import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapItemsToProps } from '../helpers/index';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';
import { apiAddItem } from '../axios';
import { addItem } from '../actions/index';

const Items = props => {
  const [formStatus, setFormStatus] = useState(false);
  const { items, session, addItem } = props;
  const handleAddItemClick = () => {
    setFormStatus(!formStatus);
  };

  const handleAddItem = data => {
    const item = { ...data, itemImg: data.itemImg[0] };
    const formData = new FormData();
    formData.append('model', item.model);
    formData.append('color', item.color);
    formData.append('bodyStyle', item.bodyStyle);
    formData.append('pricePerDay', item.pricePerDay);
    formData.append('transmission', item.transmission);
    formData.append('engine', item.engine);
    formData.append('rentDeposit', item.rentDeposit);
    formData.append('itemImg', item.itemImg);
    apiAddItem(formData, addItem);
  };
  return (
    <>
      <main className="container">
        <div className="text-center mt-5">
          <h4 style={{ fontWeight: 'bold' }}>AVAILABLE CARS</h4>
          <h6 className="text-muted">Please select a item model</h6>
        </div>
        {session.isLoggedIn && session.user.role === 'ADMIN' ? (
          <div className="text-right">
            <button
              onClick={handleAddItemClick}
              className="btn rounded-pill btn-customized"
              type="button"
            >
              <i className="fa fa-plus mr-2" />
              Add new item
            </button>
          </div>
        ) : null}
        <div className="row mb-5">
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      <ItemForm
        formStatus={formStatus}
        handleAddItemClick={handleAddItemClick}
        handleAddItem={handleAddItem}
      />
    </>
  );
};

Items.propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      userName: PropTypes.string,
      role: PropTypes.string,
    }),
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      model: PropTypes.string,
      color: PropTypes.string,
      bodyStyle: PropTypes.string,
      transmission: PropTypes.string,
      engine: PropTypes.string,
      rentDeposit: PropTypes.string,
      pricePerDay: PropTypes.string,
      itemImg: PropTypes.string,
    }),
  ).isRequired,
  addCar: PropTypes.func.isRequired,
};

export default connect(mapItemsToProps, { addItem })(Items);
