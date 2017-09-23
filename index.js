
require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const yelp = require('yelp-fusion')

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const app = express()

// app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on ' + port))
