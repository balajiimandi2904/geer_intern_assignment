const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(dataPath));
const saveProducts = (products) => fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));

router.get('/', (req, res) => {
  const products = getProducts();
  res.status(200).json(products);
});

router.post('/', (req, res) => {
  const { name, price, imageUrl } = req.body;

  if (!name || !price || !imageUrl) {
    return res.status(400).json({ message: 'Name, price, and imageUrl are required' });
  }

  const products = getProducts();
  const newProduct = { id: Date.now(), name, price: parseFloat(price), imageUrl };
  products.push(newProduct);
  saveProducts(products);

  res.status(201).json(newProduct);
});

router.get('/:id', (req, res) => {
  const products = getProducts();
  const product = products.find((product) => product.id === parseInt(req.params.id, 10));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
});

router.patch('/:id', (req, res) => {
  const products = getProducts();
  const index = products.findIndex((product) => product.id === parseInt(req.params.id, 10));

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, price, imageUrl } = req.body;

  const updatedProduct = {
    ...products[index],
    ...(name && { name }),
    ...(price && { price: parseFloat(price) }),
    ...(imageUrl && { imageUrl }),
  };

  products[index] = updatedProduct;
  saveProducts(products);

  res.status(200).json(updatedProduct);
});

router.delete('/:id', (req, res) => {
  let products = getProducts();
  const { id } = req.params;

  const initialLength = products.length;
  products = products.filter((product) => product.id !== parseInt(id, 10));

  if (products.length === initialLength) {
    return res.status(404).json({ message: 'Product not found' });
  }

  saveProducts(products);
  res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = router;
