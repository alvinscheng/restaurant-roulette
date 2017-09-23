
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

app.get('/restaurant', (req, res) => {
  const searchRequest = {
    term:'restaurant',
    location: 'san clemente, ca'
  }
  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token)

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0]
      res.json(firstResult)
    })
  }).catch(e => {
    res.sendStatus(404)
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on ' + port))
