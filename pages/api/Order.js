import Order from "@/models/Order";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, orderId, address, amount, products } = req.body;

    // Validate if all required fields are present
    if (!email || !orderId || !address || !amount || !products || typeof products !== 'object') {
      return res.status(400).json({ message: 'All fields are required, and products must be an object' });
    }

    try {
      // Map the products into an array of objects, assuming each key represents a product
      const productArray = Object.entries(products).map(([productId, productDetails]) => ({
        productId,
        ...productDetails, // Spread the product details (qty, price, name, size, variant)
      }));

      // Create a new order instance with the received data
      const order = new Order({
        email,
        orderId,
        address,
        amount,
        products: productArray, // Save the products as an array of objects
      });

      // Save the order to the database
      const savedOrder = await order.save();

      // Return the saved order's _id in the response
      res.status(200).json({ success: 'Order placed successfully', _id: savedOrder._id });
    } catch (error) {
      // Log the error if there is an issue during the save
      console.error('Error while saving order:', error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default connectDB(handler);
