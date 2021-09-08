import React, { useEffect, useState } from 'react';
import {
  addProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
  buyProduct,
} from '../../services';
import { productValidationFunc } from '../../utils/formValidator';
import { confirmBox, showError, showSuccess } from '../../utils/toast';
import AddEditProductForm from './AddEditProduct';
import BuyProductForm from './BuyProduct';
import ProductCardList from './ProductCardList';

const initialStates = {
  productName: '',
  amountAvailable: '',
  cost: '',
  id: '',
};

const purchaseInputInitialStates = {
  id: '',
  purchaseQuantity: 1,
  amountAvailable: 0,
};

const orderDataInitialStates = {
  totalSpend: '',
  products: {},
  balance: '',
  purchaseQuantity: '',
};
const Product = (props) => {
  // States
  const [products, setProducts] = useState([]);
  const [isOrder, setIsOrder] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState(initialStates);
  const [isBuyModel, setIsBuyModel] = useState(false);
  const [isShowModel, setIsShowModel] = useState(false);
  const [purchaseInput, setPurchaseInput] = useState(
    purchaseInputInitialStates
  );

  useEffect(() => {
    getProducts();
  }, []);

  // Function to get products
  const getProducts = async () => {
    setIsLoading(true);
    const result = await fetchProducts();
    setProducts(result);
    setIsLoading(false);
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
          onModalClose();
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

  // function to buy product
  const onBuyProduct = (id, amount_available) => {
    setPurchaseInput({
      id,
      purchaseQuantity: 1,
      amountAvailable: amount_available,
    });
    setIsBuyModel(true);
  };

  // function to close buy modal
  const onBuyModalClose = async (e) => {
    setPurchaseInput(purchaseInputInitialStates);
    setIsBuyModel(false);
    setIsOrder(false);
    setOrderData(orderDataInitialStates);
    await getProducts();
  };

  // function to get balance
  const getBalance = (changeCents) => {
    var balance = 0;
    if (changeCents) {
      const cent5 =
        changeCents && changeCents.cent5 ? changeCents.cent5 * 5 : 0;
      const cent10 =
        changeCents && changeCents.cent10 ? changeCents.cent10 * 10 : 0;
      const cent20 =
        changeCents && changeCents.cent20 ? changeCents.cent20 * 20 : 0;
      const cent50 =
        changeCents && changeCents.cent50 ? changeCents.cent50 * 50 : 0;
      const cent100 =
        changeCents && changeCents.cent100 ? changeCents.cent100 * 100 : 0;
      balance = cent5 + cent10 + cent20 + cent50 + cent100;
    }
    return balance.toFixed(2);
  };

  // function to pay product
  const onPaySubmit = async (e) => {
    e.preventDefault();
    if (purchaseInput.amountAvailable < purchaseInput.purchaseQuantity)
      return window.alert('More than available quantity not allowed');
    else {
      const data = {
        product_id: purchaseInput.id,
        quantity: purchaseInput.purchaseQuantity,
      };
      const result = await buyProduct(data);
      if (result.status === 'unprocessable_entity') showError(result.error);
      if (result.status === 'ok') {
        const balance = getBalance(result.change);
        setOrderData({
          totalSpend: result.total_spend.toFixed(2),
          products: result.products,
          balance,
          purchaseQuantity: purchaseInput.purchaseQuantity,
        });
        setIsOrder(true);
        showSuccess('Order Success');
      }
    }
  };

  return (
    <>
      <ProductCardList
        {...props}
        products={products}
        isLoading={isLoading}
        onAddProduct={onAddProduct}
        onBuyProduct={onBuyProduct}
        onEditProduct={onEditProduct}
        onDeleteProduct={onDeleteProduct}
      />
      <AddEditProductForm
        inputs={inputs}
        onSubmit={onSubmit}
        isShowModel={isShowModel}
        onModalClose={onModalClose}
        onInputChange={onInputChange}
      />
      <BuyProductForm
        isOrder={isOrder}
        orderData={orderData}
        isBuyModel={isBuyModel}
        onPaySubmit={onPaySubmit}
        purchaseInput={purchaseInput}
        onBuyModalClose={onBuyModalClose}
        setPurchaseInput={setPurchaseInput}
      />
    </>
  );
};

export default Product;
