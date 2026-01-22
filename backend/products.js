const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

// Helper function to read database
async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { products: [], orders: [] };
  }
}

// Helper function to write database
async function writeDB(data) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
  }
}

// GET all products
router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    const db = await readDB();
    const newProduct = {
      id: Math.max(...db.products.map(p => p.id), 0) + 1,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    db.products.push(newProduct);
    await writeDB(db);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const productIndex = db.products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    db.products[productIndex] = { ...db.products[productIndex], ...req.body, updatedAt: new Date().toISOString() };
    await writeDB(db);
    res.json(db.products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const productIndex = db.products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const deletedProduct = db.products.splice(productIndex, 1)[0];
    await writeDB(db);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
