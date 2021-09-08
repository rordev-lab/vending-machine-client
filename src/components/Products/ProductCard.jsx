import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { isSellerUser } from '../../utils/auth';

const ProductCard = (props) => {
  const {
    amount_available = '',
    cost = '',
    id = '',
    product_name = '',
    seller_id = '',
    onEditProduct,
    onDeleteProduct,
    onBuyProduct,
  } = props;

  let footer;
  if (isSellerUser()) {
    footer = (
      <div className='card-footer'>
        <small className='text-muted'> ${cost} </small>{' '}
        {parseInt(localStorage.getItem('id')) === seller_id ? (
          <>
            {' '}
            <button
              className='btn btn-info btn-sm float-right'
              onClick={(e) => onDeleteProduct(id)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <button
              className='btn btn-info btn-sm float-right'
              onClick={(e) =>
                onEditProduct({
                  amount_available,
                  cost,
                  id,
                  product_name,
                  seller_id,
                })
              }
            >
              <FontAwesomeIcon icon={faPencilAlt} /> Edit
            </button>
          </>
        ) : null}
      </div>
    );
  } else {
    footer = (
      <div className='card-footer'>
        <small className='text-muted'> $ {cost} </small>{' '}
        <button
          className='btn btn-primary btn-sm float-right'
          onClick={(e) => onBuyProduct(id, amount_available)}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> Buy
        </button>
      </div>
    );
  }

  return (
    <div className='card col-4'>
      <div className='card-body'>
        <h5 className='card-title text-capitalize'>{product_name}</h5>
        <small className='text-muted '>Available - {amount_available} </small>
      </div>
      {footer}
    </div>
  );
};

export default ProductCard;
