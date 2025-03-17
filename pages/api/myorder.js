import Order from '../../models/Order';
import connectDB from '../../middleware/mongoose';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;


    // Fetch orders for the logged-in user
    const orders = await Order.find({ email: userEmail });

    if (!orders || orders.length === 0) {
    }

    // Respond with the user's orders
    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error while fetching orders:', err); // Log errors
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export default connectDB(handler);
