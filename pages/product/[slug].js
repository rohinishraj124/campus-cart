import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from '@/models/Product';
import showToast from '@/utils/toastfile';
import mongoose from 'mongoose';
import Head from 'next/head';

export default function Page({ addCart, product, clearCart, user }) {
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(product.img);
  const [service, setService] = useState(null);
  const [pin, setPin] = useState('');
  const [showFlash, setShowFlash] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      showToast({ error: 'Please log in to proceed to checkout.' });
      return;
    }

    addCart(product._id, quantity, product.price, product.title);

    toast.success('Product added to cart', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      showToast({ error: 'Please log in to proceed to checkout.' });
      return;
    }

    clearCart();
    addCart(product._id, quantity, product.price, product.title);
    router.push('/checkout');
  };

  const onChange = (e) => {
    setPin(e.target.value);
  };

  const checkServiceAvailability = async () => {
    if (!pin || isNaN(pin)) return;
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pincode`);
    let pinjson = await response.json();
    const enteredPin = Number(pin);
    if (pinjson.includes(enteredPin)) {
      setService(true);
      showToast({ success: 'Your Pincode is Serviceable' });
      setPin('');
    } else {
      setService(false);
      showToast({ error: 'Sorry! Your Pincode is not Serviceable' });
      setPin('');
    }
    setShowFlash(true);

    setTimeout(() => {
      setShowFlash(false);
    }, 1500);
  };

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, Number(event.target.value)));
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Head>
        <title>{product.title}</title>
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      <div className="container px-5 py-24 mx-auto dark:bg-gray-900 max-w-none w-full display-flex flex-col justify-center align-center">
        <div className="lg:w-full mx-auto flex lg:flex-nowrap flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-[30em] w-[30em] m-auto p-14 -mt-4 lg:h-auto object-cover object-center rounded"
            src={image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h3 className="text-l title-font text-gray-900 dark:text-gray-300 tracking-widest">SnapShop</h3>
            <h2 className="text-gray-900 dark:text-gray-300 text-2xl title-font font-medium mb-1">
              {product.title}
            </h2>
            <p className="leading-relaxed text-gray-900 dark:text-gray-300">{product.desc}</p>
            <div className="flex items-center">
              <span className="mr-2 text-gray-900 dark:text-gray-300">Rating:</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 ${index < product.rating ? 'text-pink-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                ))}
              </div>
            </div>

            <div className="flex mb-5">
              <span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-300">
                ₹{product.price}
              </span>
              <div className="flex items-center space-x-3 mx-6">
                <button
                  className="w-10 h-10 bg-pink-500 text-white text-2xl font-bold rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 h-10 text-center text-lg font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:outline-none bg-gray-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  min="1"
                />
                <button
                  className="w-10 h-10 bg-pink-500 text-white text-2xl font-bold rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-4">Check Delivery Availability</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Enter Pin Code"
                  className="w-40 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                  onChange={onChange}
                  maxLength="6"
                  minLength="6"
                  value={pin}
                />
                <button
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg"
                  onClick={checkServiceAvailability}
                >
                  Check
                </button>
              </div>
              {showFlash && (
                <div className={`mt-4 ${service ? 'text-green-600' : 'text-red-600'}`}>
                  {service ? 'Service available in your area.' : 'Sorry, we do not deliver to this area.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



export async function getServerSideProps(context) {
  // Connect to MongoDB if not already connected
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Fetch the product based on the slug
  let products = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: products.title });

  let colorSizeSlug = {};

  // Organize variants by color and size, and add the img field for each color
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = {
        slug: item.slug,
        img: item.img // Add the image for each variant
      };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = {
        slug: item.slug,
        img: item.img // Add the image for each variant
      };
    }
  }

  // Return product and organized variants as props
  return {
    props: {
      product: JSON.parse(JSON.stringify(products)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug))
    },
  };
}
