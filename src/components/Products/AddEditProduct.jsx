import React from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import { productValidationFunc } from '../../utils/formValidator';
import Input from '../Common/Input';

const AddEditProductForm = (props) => {
  const { onSubmit, isShowModel, inputs, onInputChange, onModalClose } = props;

  const { productName, amountAvailable, cost, id } = inputs;

  let validObj = productValidationFunc(productName, amountAvailable, cost);
  return (
    <MDBModal isOpen={isShowModel} centered>
      <MDBModalHeader toggle={onModalClose}>
        {id !== '' ? 'Edit' : 'Add'} Product
      </MDBModalHeader>
      <MDBModalBody>
        <form onSubmit={onSubmit}>
          <div className='row'>
            <div className='col-md-12'>
              <Input
                type='text'
                name='productName'
                label='Name'
                placeholder='Chips'
                value={productName}
                onChange={onInputChange}
                valid={validObj.validProductName}
              />
              <Input
                type='number'
                name='cost'
                label='Cost'
                placeholder='5'
                value={cost}
                onChange={onInputChange}
                valid={validObj.validCost}
              />
            </div>
            <div className='col-md-6'>
              <Input
                type='number'
                name='amountAvailable'
                label='Amount Available'
                placeholder='12'
                value={amountAvailable}
                onChange={onInputChange}
                valid={validObj.validAmount}
              />
            </div>
            <div className='col-md-12'>
              <input
                type='submit'
                className='btn btn-primary'
                value={id !== '' ? 'Edit' : 'Add'}
                disabled={!validObj.validForm}
              />
            </div>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
};

export default AddEditProductForm;
