require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const yelp = require('yelp-fusion')

const apiKey = process.env.API_KEY

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/restaurant', (req, res) => {
  const searchRequest = Object.assign({}, req.query)

  searchRequest.term = (req.query.mode === 'party') ? 'beer' : 'food'

  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const random = Math.floor(Math.random() * response.jsonBody.businesses.length)
    res.json(response.jsonBody.businesses[random])
  }).catch(e => {
    res.sendStatus(404)
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on ' + port))
