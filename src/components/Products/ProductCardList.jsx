import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

import ProductCard from './ProductCard';
import { isSellerUser } from '../../utils/auth';

const ProductCardList = (props) => {
  const { onAddProduct, products, isLoading } = props;
  let allProduct = products || [];
  let productCardList = [];
  for (let i = 0; i < allProduct.length; i += 3) {
    let productCards = allProduct
      .slice(i, Math.min(i + 3, allProduct.length))
      .map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          product_name={p.product_name}
          cost={p.cost}
          amount_available={p.amount_available}
          seller_id={p.seller_id}
          {...props}
        />
      ));

    let cardDeck = (
      <div key={i} className='card-deck space-top'>
        {productCards}
      </div>
    );
    productCardList.push(cardDeck);
  }

  return (
    <div className='row space-top'>
      {isLoading ? (
        <Skeleton count={5} />
      ) : (
        <>
          {' '}
          <div className='col-md-12'>
            <h1 className='jumbotron-heading text-center'>Products</h1>
            {isSellerUser() ? (
              <button
                className='btn btn-info btn-sm float-right'
                onClick={(e) => onAddProduct()}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Product
              </button>
            ) : null}
          </div>
          {productCardList}
        </>
      )}
    </div>
  );
};

export default ProductCardList;
