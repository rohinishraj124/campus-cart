import Product from '../../models/Product';
import connectDB from '../../middleware/mongoose';

const handler = async (req, res) => {
    try {
        // Ensure the database connection is established
        await connectDB(req, res);

        let products = await Product.find({});
        let tshirts = {};

        for (let item of products) { // Use `for...of` to iterate over products
            if (item.title in tshirts) {
                if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                    tshirts[item.title].color.push(item.color);
                }
                if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                    tshirts[item.title].size.push(item.size);
                }
            } else {
                tshirts[item.title] = JSON.parse(JSON.stringify(item));
                if (item.availableQty > 0) {
                    tshirts[item.title].color = [item.color];
                    tshirts[item.title].size = [item.size];
                }
            }
        }

        res.status(200).json(tshirts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export default handler;
