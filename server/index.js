const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');

const app = express();
dotenv.config();
dbConnect();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", require('./routes/auth'));
app.use("/api/news", require('./routes/notes'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
