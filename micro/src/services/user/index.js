const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const Router = require('./router/user');

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ["GET", "POST"]
}));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use('/', Router);

mongoose.connect('mongodb+srv://admin:admin@pfe.eomjtm9.mongodb.net/?retryWrites=true&w=majority')
    .then(result =>app.listen(port, () => {
    console.log(`USER MicroService listening at http://localhost:${port}`)
})
).catch(err => console.log(err));