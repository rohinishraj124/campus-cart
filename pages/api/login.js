import User from '../../models/User';
import connectDB from '../../middleware/mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Add JWT for token generation

const handler = async (req, res) => {
    if (req.method === 'POST') {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
  
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid email or password' });
        }
  
        const token = jwt.sign(
          { userId: user._id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );
  
        return res.status(200).json({ success: 'Login successful', token, name: user.name });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  };
  
  export default connectDB(handler);
  
