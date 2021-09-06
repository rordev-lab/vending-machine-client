import React from 'react';
import Product from '../Products';

const HomePage = (props) => {
  return (
    <>
      <div className='container'>
        <section className='jumbotron text-center'>
          <div className='container'>
            <h1 className='jumbotron-heading'>
              Welcome to Vending Machine App
            </h1>
          </div>
        </section>
        <Product {...props} />
      </div>
    </>
  );
};

export default HomePage;
