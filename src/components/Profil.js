import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapRentsToProps, differenceInDays } from '../helpers';
import { addRents, removeRent } from '../actions/index';
import { apiGetUserRents, apiRemoveRent } from '../axios/index';

const Profil = props => {
  const {
    rents, session, addRents, removeRent,
  } = props;
  const { id } = session.user;
  const loginStatus = session.isLoggedIn;
  useEffect(() => {
    if (loginStatus) {
      apiGetUserRents(id, addRents);
    }
  }, [addRents, id, loginStatus]);

  const handleRentRemove = id => {
    apiRemoveRent(id, removeRent);
  };
  return (
    <div className="container d-flex flex-column mt-5 ">
      <h4>My rented Items</h4>
      <div className="table-responsive mt-5" style={{ textAlign: 'center' }}>
        <table className="table">
          <thead>
            <tr style={{ fontSize: 12 }}>
              <th />
              <th>Status</th>
              <th>Model</th>
              <th>Pick-up date</th>
              <th>Pick-up time</th>
              <th>Return date</th>
              <th>Return time</th>
              <th>Duration</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: 11 }}>
            {rents.map(rent => {
              const duration = differenceInDays(
                rent.pickUpDate,
                rent.pickUpTime,
                rent.returnDate,
                rent.returnTime,
              );
              const totalPrice = parseInt(duration, 10) * parseInt(rent.pricePerDay, 10);
              return (
                <tr key={rent.id}>
                  <td>
                    <div className="text-center">
                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => handleRentRemove(rent.id)}
                        style={{ color: '#00a5ff' }}
                      >
                        <i className="fa fa-trash-o mr-2" />
                      </button>
                    </div>
                  </td>
                  <td>{rent.status}</td>
                  <td>{rent.model}</td>
                  <td>{rent.pickUpDate}</td>
                  <td>{rent.pickUpTime}</td>
                  <td>{rent.returnDate}</td>
                  <td>{rent.returnTime}</td>
                  <td>
                    {duration}
                    {' '}
                    days
                  </td>
                  <td>
                    {totalPrice}
                    $
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Profil.propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      userName: PropTypes.string,
      role: PropTypes.string,
    }),
  }).isRequired,
  rents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      model: PropTypes.string,
      pickUpDate: PropTypes.string,
      pickUpTime: PropTypes.string,
      returnDate: PropTypes.string,
      returnTime: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  addRents: PropTypes.func.isRequired,
  removeRent: PropTypes.func.isRequired,
};

export default connect(mapRentsToProps, { addRents, removeRent })(Profil);
