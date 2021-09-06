import React, { useEffect, useState } from 'react';

import {
  addProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from '../../Services';
import { productValidationFunc } from '../../utils/formValidator';
import { confirmBox, showError, showSuccess } from '../../utils/toast';

import AddEditProductForm from './AddEditProduct';
import ProductCardList from './ProductCardList';

const initialStates = {
  productName: '',
  amountAvailable: '',
  cost: '',
  id: '',
};

const Product = (props) => {
  // States
  const [isShowModel, setIsShowModel] = useState(false);
  const [inputs, setInputs] = useState(initialStates);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // Function to get products
  const getProducts = async () => {
    const result = await fetchProducts();
    setProducts(result);
  };

  // Function to add product modal toggle
  const onAddProduct = () => setIsShowModel(!isShowModel);

  //  Function to manage input states
  const onInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // Function to manage product form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { productName, amountAvailable, cost, id } = inputs;
    let validObj = productValidationFunc(productName, amountAvailable, cost);
    if (validObj.validForm) {
      var payload = {
        amount_available: amountAvailable,
        cost,
        product_name: productName,
      };
      if (id !== '') {
        // edit product
        const { status } = await updateProduct(id, payload);
        if (status === 200) {
          showSuccess('Product updated successfully');
          await onModalClose();
          await getProducts();
        }
      } else {
        // add product
        payload = {
          ...payload,
          seller_id: localStorage.getItem('id'),
        };
        const { statusText } = await addProduct(payload);
        if (statusText === 'Created') {
          showSuccess('Product added successfully');
          await onModalClose();
          await getProducts();
        }
      }
    } else {
      showError('Please check form errors');
    }
  };

  // function to close add/edit product modal
  const onModalClose = () => {
    setIsShowModel(false);
    setInputs(initialStates);
  };

  // function to toggle edit product toggle
  const onEditProduct = (item) => {
    const { amount_available, cost, id, product_name, seller_id } = item;
    setInputs({
      amountAvailable: amount_available,
      productName: product_name,
      cost,
      id: id,
      seller_id: seller_id,
    });
    setIsShowModel(true);
  };

  // function to delete product
  const onDeleteProduct = async (id) => {
    const { value } = await confirmBox({
      title: 'Are you sure?',
      text: 'Do you want to delete this product',
    });
    if (!value) {
      return;
    } else {
      await deleteProduct(id);
      await getProducts();
      showSuccess('Product deleted successfully');
    }
  };

  return (
    <>
      <ProductCardList
        {...props}
        onAddProduct={onAddProduct}
        products={products}
        onDeleteProduct={onDeleteProduct}
        onEditProduct={onEditProduct}
      />
      <AddEditProductForm
        isShowModel={isShowModel}
        onSubmit={onSubmit}
        inputs={inputs}
        onInputChange={onInputChange}
        onModalClose={onModalClose}
      />
    </>
  );
};

export default Product;
