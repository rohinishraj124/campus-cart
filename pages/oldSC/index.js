import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Men = () => {
  return (
    <section className="flex flex-col justify-center items-center text-gray-600 dark:text-gray-200 body-font bg-gray-50 dark:bg-gray-900">
      <Head><title>Old SuperMarket</title></Head>
      <h2 className="text-3xl font-bold text-center mt-6 text-gray-900 dark:text-gray-100">Old SuperMarket</h2>
      <div className="container px-5 py-16 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Beverages */}
          <Link href={'/radhika/beverages'}>
            <div className="cursor-pointer shadow-lg p-4 w-full h-full rounded-lg bg-white dark:bg-gray-800">
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="Beverages"
                  className="m-auto h-[30vh] block"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADP3VaUQRoGFY56lFV-FP7gwRDQjW7oYkKw&s"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 dark:text-gray-400">Old SuperMarket</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium dark:text-gray-100">Beverages</h2>
              </div>
            </div>
          </Link>

          {/* Snacks */}
          <Link href={'/radhika/snacks'}>
            <div className="cursor-pointer shadow-lg p-4 w-full h-full rounded-lg bg-white dark:bg-gray-800">
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="Snacks"
                  className="m-auto h-[30vh] block"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrCpvKE5bcNpPvsn3ZLD8vDmNa-46Jit01Q&s"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 dark:text-gray-400">Old SuperMarket</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium dark:text-gray-100">Snacks</h2>
              </div>
            </div>
          </Link>

          {/* Essentials */}
          <Link href={'/radhika/essentials'}>
            <div className="cursor-pointer shadow-lg p-4 w-full h-full rounded-lg bg-white dark:bg-gray-800">
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="Essentials"
                  className="m-auto h-[30vh] block"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTI1QfMmp8vOd2HVN0FlEqoV99DTDC9yxWVw&s"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 dark:text-gray-400">Old SuperMarket</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium dark:text-gray-100">Essentials</h2>
              </div>
            </div>
          </Link>

          {/* Stationery */}
          <Link href={'/radhika/stationery'}>
            <div className="cursor-pointer shadow-lg p-4 w-full h-full rounded-lg bg-white dark:bg-gray-800">
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="Stationery"
                  className="m-auto h-[30vh] block"
                  src="https://5.imimg.com/data5/XI/PZ/CQ/SELLER-89977312/stationary-goods-500x500.jpeg"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 dark:text-gray-400">Old SuperMarket</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium dark:text-gray-100">Stationery</h2>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Men;
