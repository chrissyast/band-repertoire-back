const express = require('express');
const app = express();
const axios = require('axios')
var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 4000
const backend = process.env.BACKEND_SERVER || 'http://localhost:3001'

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGINS);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.post('/api*', async (req, apires, next) => {
    let output = '';
    const headers = { 'Content-Type': 'application/json','Authorization': `Token token=${process.env.INTERNAL_API_KEY}`}
    await axios.post(
        // TODO change for production
        `${backend}/${req.originalUrl}`,
        req.body,
        {headers: headers}
    )
        .then(res => output = res)
        .catch(err => console.log(err,"error"))
    apires.send(output.data);
});

// TODO change for production
app.listen(port);