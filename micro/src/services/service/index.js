const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const Router = require('./router/services');

const app = express()
const port = 5002;

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use('/', Router);

mongoose.connect('mongodb+srv://admin:admin@pfe.eomjtm9.mongodb.net/?retryWrites=true&w=majority')
    .then(result =>app.listen(port, () => {
    console.log(`SERVICE MicroService listening at http://localhost:${port}`)
})
).catch(err => console.log(err));