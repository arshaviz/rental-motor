import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const ItemEditForm = props => {
  const {
    editFormStatus, handleEditItemClick, handleEditItem, item,
  } = props;
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    handleEditItem(data);
    handleEditItemClick();
  };
  return (
    <div
      className="modal fade show"
      role="dialog"
      tabIndex={-1}
      style={{
        display: editFormStatus ? 'block' : 'none',
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
              onClick={handleEditItemClick}
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
                  defaultValue={item.model}
                />
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  COLOR:
                </label>
                <input
                  defaultValue={item.color}
                  name="color"
                  ref={register({
                    required: true,
                    maxLength: 10,
                    minLength: 3,
                  })}
                  className="form-control"
                  type="text"
                  placeholder="Please enter item color..."
                />
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  BODY STYLE:
                </label>
                <input
                  defaultValue={item.bodyStyle}
                  name="bodyStyle"
                  ref={register({
                    required: true,
                    maxLength: 20,
                    minLength: 4,
                  })}
                  className="form-control"
                  type="text"
                  placeholder="Please enter item body style..."
                />
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  PRICE PER DAY:
                </label>
                <input
                  defaultValue={item.pricePerDay}
                  name="pricePerDay"
                  type="number"
                  ref={register({
                    required: true,
                    min: 5,
                  })}
                  className="form-control"
                  placeholder="Please enter item price per day..."
                />
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  TRANSMISSION:
                </label>
                <input
                  defaultValue={item.transmission}
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
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  ENGINE:
                </label>
                <input
                  defaultValue={item.engine}
                  name="engine"
                  type="text"
                  ref={register({
                    required: true,
                    maxLength: 20,
                    minLength: 1,
                  })}
                  className="form-control"
                  placeholder="Please enter engine type..."
                />
              </div>
              <div className="form-group col-6">
                <label className="text-muted" style={{ fontWeight: 'bold' }}>
                  RENT DEPOSIT:
                </label>
                <input
                  defaultValue={item.rentDeposit}
                  name="rentDeposit"
                  type="number"
                  ref={register({
                    required: true,
                    min: 50,
                  })}
                  className="form-control"
                  placeholder="Please enter the rent deposit amount..."
                />
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
              </div>
              <div className="col-12 text-right">
                <button
                  onClick={handleEditItemClick}
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

ItemEditForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    model: PropTypes.string,
    color: PropTypes.string,
    bodyStyle: PropTypes.string,
    transmission: PropTypes.string,
    engine: PropTypes.string,
    rentDeposit: PropTypes.string,
    pricePerDay: PropTypes.string,
    itemImg: PropTypes.string,
  }).isRequired,
  editFormStatus: PropTypes.bool.isRequired,
  handleEditItemClick: PropTypes.func.isRequired,
  handleEditItem: PropTypes.func.isRequired,
};
export default ItemEditForm;
