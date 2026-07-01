import Product from '../models/Product.js';

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id) => {
  return await Product.findById(id);
}

const createProduct = async (productData) => {
  return await Product.create(productData);
}

const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
}

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
}

export default {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};