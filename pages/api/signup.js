import User from '../../models/User';
import connectDB from '../../middleware/mongoose';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;

            // Validate required fields
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Name, email, and password are required' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create and save the user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            return res.status(201).json({ success: 'User registered successfully' });
        } catch (error) {
            console.error('Error processing the signup request:', error.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};

// Export the handler function as default
export default connectDB(handler);
