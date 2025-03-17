import React from 'react';
import Link from 'next/link';
import Product from '../../models/Product';
import mongoose from 'mongoose';
import Head from 'next/head';

const Stationery = ({ products }) => {
  console.log(products);
  return (
    <section className="text-gray-600 body-font bg-gradient-to-b from-white to-gray-100">
      <Head><title>Stationery</title></Head>
      <div className="container px-5 py-24 mx-auto dark:bg-gray-900 max-w-none w-full h-screen">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-300">Discover Our Products</h1>
        {/* Grid setup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {Object.keys(products).map((product) => (
            <Link key={products[product]._id} href={`/product/${products[product].slug}`}>
              <div className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out dark:bg-gray-800">
                {/* Product image */}
                <div className="relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="m-auto h-[30vh]  block object-cover object-center"
                    src={products[product].img}
                  />
                </div>
                {/* Product details */}
                <div className="text-center mt-4">
                  <h3 className="text-gray-900 dark:text-gray-300 text-xs tracking-widest title-font mb-1 uppercase">
                    {products[product].category}
                  </h3>
                  <h2 className="text-gray-900 dark:text-gray-300 title-font text-lg font-semibold">
                    {products[product].title.length > 20 ? `${products[product].title.slice(0, 20)}...` : products[product].title}
                  </h2>
                  <p className="mt-2 text-green-600 font-bold">₹{products[product].price}</p>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Fetch products from the database
  let products = await Product.find({ category: 'stationery', genre: 'oldSC' });

  let Stationery = {};

  for (let item of products) {
    if (item.title in Stationery) {
      if (!Stationery[item.title].color.includes(item.color) && item.availableQty > 0) {
        Stationery[item.title].color.push(item.color);
      }
      if (!Stationery[item.title].size.includes(item.size) && item.availableQty > 0) {
        Stationery[item.title].size.push(item.size);
      }
    } else {
      Stationery[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        Stationery[item.title].color = [item.color];
        Stationery[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(Stationery)) },
  };
}

export default Stationery;
