import React from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Input from '../Common/Input';

const BuyProductForm = (props) => {
  const {
    isOrder,
    orderData = {},
    onPaySubmit,
    isBuyModel,
    purchaseInput,
    setPurchaseInput,
    onBuyModalClose,
  } = props;
  const { purchaseQuantity, amountAvailable } = purchaseInput;
  return (
    <MDBModal isOpen={isBuyModel} centered toggle={onBuyModalClose}>
      <MDBModalHeader toggle={onBuyModalClose}>
        {isOrder ? 'Order History' : 'Buy Product'}
      </MDBModalHeader>
      <MDBModalBody>
        {isOrder ? (
          <div>
            <p>
              <span className='font-weight-bold lead text-primary'>
                Product Name :
              </span>{' '}
              <span className='ml-2 lead'>
                {orderData.products.product_name}
              </span>
            </p>
            <p>
              <span className='font-weight-bold lead text-primary'>
                Product Cost:
              </span>{' '}
              <span className='ml-2 lead'>{orderData.products.cost}</span>
            </p>
            <p>
              <span className='font-weight-bold lead text-primary'>
                Purchase Quantity:
              </span>{' '}
              <span className='ml-2 lead'>{orderData.purchaseQuantity}</span>
            </p>
            <p>
              <span className='font-weight-bold lead text-primary'>
                Total Spend:
              </span>{' '}
              <span className='ml-2 lead'>{orderData.totalSpend}</span>
            </p>
            <p>
              <span className='font-weight-bold lead text-primary'>
                Change:
              </span>{' '}
            </p>
            <p className='d-flex justify-content-evenly'>
              <div>
                <span className='font-weight-bold lead text-muted'>
                  Cent 5:
                </span>{' '}
                <span className='ml-2 lead'>
                  {orderData.balance.cent5 ? orderData.balance.cent5 : 0}
                </span>
              </div>
              <div>
                <span className='font-weight-bold lead text-muted'>
                  Cent 10:
                </span>{' '}
                <span className='ml-2 lead'>
                  {orderData.balance.cent10 ? orderData.balance.cent10 : 0}
                </span>
              </div>{' '}
            </p>{' '}
            <p className='d-flex justify-content-evenly'>
              <div>
                <span className='font-weight-bold lead text-muted'>
                  Cent 20:
                </span>{' '}
                <span className='ml-2 lead'>
                  {orderData.balance.cent20 ? orderData.balance.cent20 : 0}
                </span>
              </div>
              <div>
                <span className='font-weight-bold lead text-muted'>
                  Cent 50:
                </span>{' '}
                <span className='ml-2 lead'>
                  {orderData.balance.cent50 ? orderData.balance.cent50 : 0}
                </span>
              </div>
            </p>{' '}
            <p className='d-flex justify-content-center'>
              <span className='font-weight-bold lead text-muted'>
                Cent 100:
              </span>{' '}
              <span className='ml-2 lead'>
                {orderData.balance.cent100 ? orderData.balance.cent100 : 0}
              </span>
            </p>
            <div className='con-purchase-btn'>
              <button
                className='btn btn-primary btn-sm '
                onClick={() => onBuyModalClose()}
              >
                Continue Purchase
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onPaySubmit}>
            <div className='row'>
              <div className='col-md-12'>
                <Input
                  type='number'
                  name='purchaseQuantity'
                  label='Quantity'
                  placeholder='1'
                  value={purchaseQuantity}
                  onChange={(e) =>
                    setPurchaseInput({
                      ...purchaseInput,
                      purchaseQuantity: e.target.value,
                    })
                  }
                  nonValid={true}
                />
              </div>
              <p>Available Quantity- {amountAvailable}</p>
              <div className='col-md-12'>
                <input type='submit' className='btn btn-primary' value='Pay' />
              </div>
            </div>
          </form>
        )}
      </MDBModalBody>
    </MDBModal>
  );
};
export default BuyProductForm;
