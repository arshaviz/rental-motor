import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapRentsToProps } from '../helpers/index';
import { addRents, removeRent, changeRentStatus } from '../actions/index';
import {
  apiChangeRentStatus,
  apiGetRents,
  apiRemoveRent,
} from '../axios/index';

const Panel = props => {
  const {
    rents, session, addRents, removeRent, changeRentStatus,
  } = props;
  const loginStatus = session.isLoggedIn;

  const handleRentRemove = id => {
    apiRemoveRent(id, removeRent);
  };
  const handleRentChange = (target, id, rent) => {
    if (target.name === 'Accept') {
      apiChangeRentStatus(id, rent, 'Rented', changeRentStatus);
    } else if (target.name === 'Decline') {
      apiChangeRentStatus(id, rent, 'Refused', changeRentStatus);
    }
  };
  useEffect(() => {
    if (loginStatus) {
      apiGetRents(addRents);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);
  return (
    <div className="container d-flex flex-column mt-5">
      <h4>Admin panel</h4>
      <div className="table-responsive mt-5">
        <table className="table text-center">
          <thead>
            <tr>
              <th />
              <th>Status</th>
              <th>Name</th>
              <th>Model</th>
              <th>Pick-up date</th>
              <th>Return date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {rents.map(rent => (
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
                <td>{rent.userName}</td>
                <td>{rent.model}</td>
                <td>{rent.pickUpDate}</td>
                <td>{rent.returnDate}</td>
                <td>{rent.location}</td>
                <td>
                  {rent.status === 'Pending' ? (
                    <>
                      <div className="text-center">
                        <button
                          onClick={e => handleRentChange(e.target, rent.id)}
                          type="button"
                          name="Accept"
                          className="btn btn-link"
                          style={{ color: '#00a5ff' }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={e => handleRentChange(e.target, rent.id)}
                          type="button"
                          name="Decline"
                          className="btn btn-link"
                          style={{ color: '#00a5ff' }}
                        >
                          Decline
                        </button>
                      </div>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Panel.propTypes = {
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
      userName: PropTypes.string,
      pickUpDate: PropTypes.string,
      returnDate: PropTypes.string,
      location: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  addRents: PropTypes.func.isRequired,
  removeRent: PropTypes.func.isRequired,
  changeRentStatus: PropTypes.func.isRequired,
};

export default connect(mapRentsToProps, {
  addRents,
  removeRent,
  changeRentStatus,
})(Panel);
