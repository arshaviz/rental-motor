import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const RentForm = props => {
  const {
    formStatus,
    handleRentClick,
    handleAddRent,
    uniqModels,
    info,
  } = props;

  const {
    register, errors, getValues, handleSubmit,
  } = useForm();
  const onSubmit = data => {
    handleAddRent(data);
    handleRentClick();
  };

  const validatePickUp = () => {
    const date = new Date(
      `${getValues('pickUpDate')} ${getValues('pickUpTime')}`,
    );
    const today = new Date();
    const differenceInTime = date.getTime() - today.getTime();
    return differenceInTime > 0;
  };

  const validateReturn = () => {
    const pickUpDate = new Date(
      `${getValues('pickUpDate')} ${getValues('pickUpTime')}`,
    );
    const returnDate = new Date(
      `${getValues('returnDate')} ${getValues('returnTime')}`,
    );
    const differenceInTime = returnDate.getTime() - pickUpDate.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24)) > 1;
  };

  return (
    <div
      className="modal fade show"
      role="dialog"
      tabIndex={-1}
      style={{
        display: formStatus ? 'block' : 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{ background: '#00a5ff' }}>
            <h4 className="modal-title" style={{ color: 'white' }}>
              Item rent form
            </h4>
            <button
              onClick={handleRentClick}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul className="text-danger">
                {errors.pickUpDate && errors.pickUpDate.type === 'validate' && (
                  <li>
                    Please verify pick-up date! You can&apos;t pick a paste
                    date.
                  </li>
                )}
                {errors.returnDate && errors.returnDate.type === 'validate' && (
                  <li>
                    Please verify date inputs! Minimum rent duration allowed is
                    1 day.
                  </li>
                )}
              </ul>
              <div className="form-group">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  NAME:
                </label>
                <input
                  name="userName"
                  ref={register({ required: true, maxLength: 20 })}
                  className="form-control"
                  type="text"
                  placeholder="Please enter your name"
                  defaultValue={info.userName}
                />
                {errors.userName && errors.userName.type === 'required' && (
                  <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  MODEL:
                </label>
                <select
                  name="model"
                  className="form-control"
                  defaultValue={info.model}
                  ref={register({ required: true })}
                >
                  <option key="defaultModel" value="defaultModel" disabled>
                    Select item model
                  </option>
                  {uniqModels.map(model => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  PICK-UP DATE AND TIME:
                </label>
                <div className="d-flex">
                  <input
                    name="pickUpDate"
                    className="form-control w-50"
                    type="date"
                    ref={register({ required: true, validate: validatePickUp })}
                  />
                  <input
                    name="pickUpTime"
                    className="form-control w-50"
                    type="time"
                    ref={register({ required: true })}
                  />
                </div>
                {errors.pickUpDate && errors.pickUpDate.type === 'required' && (
                  <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  RETURN DATE AND TIME:
                </label>
                <div className="d-flex">
                  <input
                    name="returnDate"
                    className="form-control w-50"
                    type="date"
                    ref={register({ required: true, validate: validateReturn })}
                  />
                  <input
                    name="returnTime"
                    className="form-control w-50"
                    type="time"
                    ref={register({ required: true })}
                  />
                </div>
                {errors.returnDate && errors.returnDate.type === 'required' && (
                  <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  LOCATION:
                </label>
                <select
                  name="location"
                  className="form-control"
                  ref={register({ required: true })}
                >
                  <option value="Location 1">Location 1</option>
                  <option value="Location 2">Location 2</option>
                  <option value="Location 3">Location 3</option>
                </select>
              </div>
              <div className="col-12 text-right">
                <button
                  onClick={handleRentClick}
                  className="btn btn-light mr-4"
                  type="button"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button className="btn btn-customized" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

RentForm.propTypes = {
  formStatus: PropTypes.bool.isRequired,
  handleRentClick: PropTypes.func.isRequired,
  handleAddRent: PropTypes.func.isRequired,
  uniqModels: PropTypes.arrayOf(PropTypes.string).isRequired,
  info: PropTypes.shape({
    userName: PropTypes.string,
    model: PropTypes.string,
  }).isRequired,
};

export default RentForm;
