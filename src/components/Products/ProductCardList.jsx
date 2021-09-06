import React from 'react';
import ProductCard from './ProductCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCardList = (props) => {
  const { onAddProduct, products } = props;
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
      <div className='col-md-12'>
        <h1 className='jumbotron-heading text-center'>Products</h1>
        <button
          className='btn btn-info btn-sm float-right'
          onClick={(e) => onAddProduct()}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </button>
      </div>
      {productCardList}
    </div>
  );
};

export default ProductCardList;
