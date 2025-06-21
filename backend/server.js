const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
