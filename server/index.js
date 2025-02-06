const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/pa', (req, res) => {
    res.send('Hello');
});
console.log(port);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
