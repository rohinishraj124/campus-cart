import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const showToast = () => {
    toast.warn('This is a test toast!', {
      autoClose: 1000,
      onClose: () => console.log('Toast closed!'),
    });
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
      <ToastContainer />
    </div>
  );
};

export default App;
