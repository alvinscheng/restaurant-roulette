
require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const yelp = require('yelp-fusion')

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/restaurant', (req, res) => {
  const { latitude, longitude } = req.query
  const searchRequest = {
    term: 'food',
    limit: 50,
    latitude,
    longitude
  }
  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token)

    client.search(searchRequest).then(response => {
      const random = Math.floor(Math.random() * response.jsonBody.businesses.length)
      res.json(response.jsonBody.businesses[random])
    })
  }).catch(e => {
    res.sendStatus(404)
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on ' + port))
