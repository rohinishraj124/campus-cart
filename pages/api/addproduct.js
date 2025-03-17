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

                // Validate required fields before saving
                if (!productData.title || !productData.slug || !productData.price || !productData.desc || 
                    !productData.category || !productData.img || !productData.size || 
                    !productData.color || !productData.availableQty) {
                    return res.status(400).json({ error: `Missing required fields for product ${i + 1}` });
                }

                const product = new Product({
                    title: productData.title,
                    slug: productData.slug,
                    price: productData.price,
                    desc: productData.desc,
                    category: productData.category,
                    genre: productData.genre,
                    img: productData.img,
                    size: productData.size,
                    color: productData.color,
                    rating: productData.rating || 0, // Default to 0 if rating is not provided
                    availableQty: productData.availableQty,
                });

                try {
                    await product.save(); // Save product to the database
                } catch (saveError) {
                    console.error(`Error saving product ${i + 1}:`, saveError.message);
                    return res.status(500).json({ error: `Failed to save product ${i + 1}` });
                }
            }

            return res.status(200).json({ success: 'Products added successfully' });
        } catch (error) {
            console.error('Error processing the request:', error.message);
            return res.status(500).json({ error: 'Failed to add products' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};

// Export the handler function as default
export default connectDB(handler);
