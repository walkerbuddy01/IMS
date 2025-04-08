import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
 
const router = express.Router();
 
// Create a new product
router.post('/', createProduct);
 
// Get all products
router.get('/', getAllProducts);
 
// Get a single product by ID
router.get('/:id', getProductById);
 
// Update a product by ID
router.put('/:id', updateProduct);
 
// Delete a product by ID
router.delete('/:id', deleteProduct);
 
export default router;