import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';
import ErrorBoundary from './errorBoundary';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState('light'); // State for theme
  const router = useRouter();

  // Load cart, user, and theme on initial load
  useEffect(() => {
    router.events.on('routeChangeStart', () => setProgress(40));
    router.events.on('routeChangeComplete', () => setProgress(100));

    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      const token = localStorage.getItem('token');
      if (token) {
        setUser(token);
      }

      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
      }
    }
  }, [router.events]);

  // Save cart to localStorage whenever it changes
  const saveCart = (myCart) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(myCart));
    }
  };

  // Add item to the cart
  const addCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = { ...cart };
    if (itemCode in myCart) {
      myCart[itemCode].qty += qty;
    } else {
      myCart[itemCode] = { qty, price, name, size, variant };
    }
    setCart(myCart);
    saveCart(myCart);
  };

  // Remove item from the cart
  const removeFromCart = (itemCode, qty) => {
    let myCart = { ...cart };
    if (itemCode in myCart) {
      myCart[itemCode].qty -= qty;
    }
    if (myCart[itemCode]?.qty <= 0) {
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  };

  // Clear the cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  // Calculate the total value of the cart
  const calculateTotal = () => {
    let sum = 0;
    for (let item in cart) {
      sum += cart[item].price * cart[item].qty;
    }
    return sum;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Update localStorage when theme changes
  useEffect(() => {
    console.log('Current theme:', theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);
  

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <ErrorBoundary>
        <LoadingBar
          color="#ff2d55"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          waitingTime={500}
        />
        <Navbar
          user={user}
          cart={cart}
          addCart={addCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          total={calculateTotal}
          logout={logout}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <Component
          user={user}
          cart={cart}
          addCart={addCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          total={calculateTotal}
          logout={logout}
          toggleTheme={toggleTheme}
          theme={theme}
          {...pageProps}
        />
        <Footer
        theme={theme} />
      </ErrorBoundary>
    </div>
  );
}

export default MyApp;
