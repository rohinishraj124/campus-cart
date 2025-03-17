import Product from '../../models/Product';
import connectDB from '../../middleware/mongoose';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Validate if the body is an array
            if (!Array.isArray(req.body)) {
                return res.status(400).json({ error: 'Request body must be an array' });
            }

            // Loop through products and save them
            for (let i = 0; i < req.body.length; i++) {
                const productData = req.body[i];
                const product = await Product.findOneAndUpdate(productData._id, productData, { new: true });

                // try {
                //     await product.save(); // Save product to the database
                // } catch (saveError) {
                //     console.error(`Error saving product ${i + 1}:`, saveError.message);
                //     return res.status(500).json({ error: `Failed to save product ${i + 1}` });
                // }
            }
            return res.status(200).json({ success: 'Products updated successfully' });
        } catch (error) {
            console.error('Error processing the request:', error.message);
            return res.status(500).json({ error: 'Failed to update products' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};

// Export the handler function as default
export default connectDB(handler);
