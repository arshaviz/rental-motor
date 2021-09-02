import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const ItemForm = props => {
  const { formStatus, handleAddItemClick, handleAddItem } = props;
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = data => {
    handleAddItem(data);
    handleAddItemClick();
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
              Add a new item
            </h4>
            <button
              onClick={handleAddItemClick}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body ">
            <form
              className="d-flex flex-wrap "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  MODEL:
                </label>
                <input
                  name="model"
                  ref={register({
                    required: true,
                    maxLength: 20,
                    minLength: 4,
                  })}
                  className="form-control"
                  type="text"
                  placeholder="Please enter item model"
                />
                {errors.model && errors.model.type === 'required' && (
                  <span className="text-danger">This is required</span>
                )}
                {errors.model && errors.model.type === 'minLength' && (
                  <span className="text-danger">Minimum Length is 4</span>
                )}
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  COLOR:
                </label>
                <input
                  name="color"
                  ref={register({
                    required: true,
                    maxLength: 10,
                    minLength: 2,
                  })}
                  className="form-control"
                  type="text"
                  placeholder="Please enter item color..."
                />
                {errors.color && errors.color.type === 'required' && (
                  <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  BODY STYLE:
                </label>
                <input
                  name="bodyStyle"
                  ref={register({
                    required: true,
                    maxLength: 10,
                    minLength: 2,
                  })}
                  className="form-control"
                  type="text"
                  placeholder="Please enter item body style..."
                />
                {errors.bodyStyle && errors.bodyStyle.type === 'required' && (
                  <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  PRICE PER DAY:
                </label>
                <input
                  name="pricePerDay"
                  type="number"
                  ref={register({
                    required: true,
                    min: 5,
                  })}
                  className="form-control"
                  placeholder="Please enter item price per day..."
                />
                {errors.pricePerDay
                  && errors.pricePerDay.type === 'required' && (
                    <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  TRANSMISSION:
                </label>
                <input
                  name="transmission"
                  type="text"
                  ref={register({
                    required: true,
                    maxLength: 20,
                    minLength: 4,
                  })}
                  className="form-control"
                  placeholder="Please enter transmission type..."
                />
                {errors.transmission
                  && errors.transmission.type === 'required' && (
                    <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  ENGINE:
                </label>
                <input
                  name="engine"
                  type="text"
                  ref={register({
                    required: true,
                    maxLength: 20,
                    minLength: 4,
                  })}
                  className="form-control"
                  placeholder="Please enter engine type..."
                />
                {errors.engine && errors.engine.type === 'required' && (
                  <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  RENT DEPOSIT:
                </label>
                <input
                  name="rentDeposit"
                  type="number"
                  ref={register({
                    required: true,
                    min: 50,
                  })}
                  className="form-control"
                  placeholder="Please enter the rent deposit amount..."
                />
                {errors.rentDeposit
                  && errors.rentDeposit.type === 'required' && (
                    <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  UPLOAD ITEM IMAGE:
                </label>
                <input
                  name="itemImg"
                  type="file"
                  ref={register({
                    required: true,
                  })}
                  className="form-control"
                  accept="image/*"
                />
                {errors.itemImg && errors.itemImg.type === 'required' && (
                  <span className="text-danger">This is required</span>
                )}
              </div>
              <div className="col-12 text-right">
                <button
                  onClick={handleAddItemClick}
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

ItemForm.propTypes = {
  formStatus: PropTypes.bool.isRequired,
  handleAddItemClick: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};
export default ItemForm;
