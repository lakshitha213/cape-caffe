import dbConnect from '../../../server'; // Adjust path as needed
import Product from '../../../modal/Poduct'; // Adjust path as needed

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}