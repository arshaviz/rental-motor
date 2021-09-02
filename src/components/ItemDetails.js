import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RentForm from './RentForm';
import ItemEditForm from './ItemEditForm';
import '../assets/css/itemdetails.css';
import { mapItemsToProps } from '../helpers';
import { addRent, editItem, removeItem } from '../actions/index';
import { apiAddRent, apiRemoveItem, apiEditItem } from '../axios';
import { Item } from 'semantic-ui-react';

const ItemDetails = props => {
  const [formStatus, setFormStatus] = useState(false);
  const [editFormStatus, setEditFormStatus] = useState(false);
  const {
    items, addRent, session, editItem, removeItem,
  } = props;
  const {
    match: {
      params: { id },
    },
  } = props;
  const item = items.filter(item => item.id === parseInt(id, 10))[0];
  const models = items.map(item => item.model);
  const uniqModels = models.filter(
    (item, index) => models.indexOf(item) === index,
  );
  const info = {
    userName: session.user.userName,
    model: item.model,
  };
  const userId = session.user.id;
  const handleRentClick = () => {
    setFormStatus(!formStatus);
  };
  const handleEditItemClick = () => {
    setEditFormStatus(!editFormStatus);
  };

  const handleEditItem = data => {
    const item = { ...data, itemImg: data.itemImg[0] };
    const formData = new FormData();
    formData.append('model', item.model);
    formData.append('color', item.color);
    formData.append('bodyStyle', item.bodyStyle);
    formData.append('pricePerDay', item.pricePerDay);
    formData.append('luggages', item.luggages);
    formData.append('transmission', item.transmission);
    formData.append('engine', item.engine);
    formData.append('rentDeposit', item.rentDeposit);
    formData.append('itemImg', item.itemImg);
    apiEditItem(id, formData, editItem);
  };
  const handleAddRent = data => {
    const rent = {
      ...data,
      pricePerDay: item.pricePerDay,
      status: 'Pending',
    };
    apiAddRent(rent, userId, addRent);
  };

  const handleRemoveItem = id => {
    apiRemoveItem(id, removeItem);
  };

  const RentButton = () => (
    <button
      onClick={handleRentClick}
      className="btn w-75 mb-2 btn-customized"
      type="button"
    >
      Rent Motorcycle
      <i className="fa fa-arrow-right ml-2" />
    </button>
  );

  const LoginLink = () => (
    <>
      <h6>Please login to rent this Motorcycle</h6>
      <Link to="/login" style={{ color: '#00a5ff' }}>
        Login
      </Link>
    </>
  );

  const ConfigBtns = () => (
    <div className="my-2">
      <button
        onClick={handleEditItemClick}
        className="btn  rounded-pill  btn-customized"
        type="button"
      >
        <i className="fa fa-cog mr-2" />
        Edit Item
      </button>
      <Link
        to="/items"
        onClick={() => handleRemoveItem(Item.id)}
        className="btn ml-4 rounded-pill   btn-customized"
        type="button"
      >
        <i className="fa fa-trash mr-2" />
        Delete Item
      </Link>
    </div>
  );
  return (
    <>
      <div className="d-flex flex-column justify-content-center pr-5 vh-100 w-100">
        <h5 style={{ textAlign: 'right' }}>
          {item.model}
          <br />
        </h5>
        <h6 className="text-muted" style={{ textAlign: 'right' }}>
          {item.pricePerDay}
          $/Day
          <br />
        </h6>
        <div className="d-flex justify-content-between mt-2 ">
          <div className="d-flex align-items-center ml-5 col-7">
            <img
              className="w-100"
              src={item.itemImg}
              alt={item.model}
              style={{ maxWidth: '40vw' }}
            />
          </div>
          <div className="col-4" style={{ padding: 0 }}>
            <div
              className="text-center p-2"
              style={{ background: 'var(--light)', borderRadius: 15 }}
            >
              <div className="table-responsive" style={{ fontSize: 12 }}>
                <table className="table">
                  <thead>
                    <tr />
                  </thead>
                  <tbody>
                    <tr>
                      <td>COLOR</td>
                      <td>{item.color}</td>
                    </tr>
                    <tr>
                      <td>BODY STYLE</td>
                      <td>{item.bodyStyle}</td>
                    </tr>
                    <tr>
                      <td>
                        LUGGAGES
                        <br />
                      </td>
                      <td>{item.luggages}</td>
                    </tr>
                    <tr>
                      <td>
                        ENGINE
                        <br />
                      </td>
                      <td>{item.engine}</td>
                    </tr>
                    <tr>
                      <td>TRANSMISSION</td>
                      <td>{item.transmission}</td>
                    </tr>
                    <tr>
                      <td>RENT DEPOSIT</td>
                      <td>
                        {item.rentDeposit}
                        $
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {session.isLoggedIn && session.user.role === 'USER' ? (
                <RentButton />
              ) : session.isLoggedIn && session.user.role === 'ADMIN' ? (
                <ConfigBtns />
              ) : (
                <LoginLink />
              )}
            </div>
          </div>
        </div>
        <div className="w-100" style={{ textAlign: 'left' }}>
          <Link to="/items">
            <i className="fa fa-caret-left return-btn" />
          </Link>
        </div>
      </div>
      <RentForm
        formStatus={formStatus}
        handleRentClick={handleRentClick}
        handleAddRent={handleAddRent}
        uniqModels={uniqModels}
        info={info}
      />
      <ItemEditForm
        editFormStatus={editFormStatus}
        handleEditItemClick={handleEditItemClick}
        handleEditItem={handleEditItem}
        item={item}
      />
    </>
  );
};

ItemDetails.propTypes = {
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
      luggages: PropTypes.string,
      transmission: PropTypes.string,
      engine: PropTypes.string,
      rentDeposit: PropTypes.string,
      pricePerDay: PropTypes.string,
      itemImg: PropTypes.string,
    }),
  ).isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  addRent: PropTypes.func.isRequired,
};

export default connect(mapItemsToProps, { addRent, editItem, removeItem })(
  ItemDetails,
);
