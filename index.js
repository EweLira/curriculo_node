const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const curriculoRoutes = require('./routes/curriculoRoutes.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', curriculoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});