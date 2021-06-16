const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const routes = require('./Routes')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Nothing here!');
});

routes.register(app);

app.listen(3000, () => {
    console.log('Server started at *:3000');
});
