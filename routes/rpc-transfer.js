const express = require('express')
const router = express.Router()
const request = require('request')

/* GET home page. */
const jsonrpc = '2.0'
const rpcid = 1

router.post('/callrpc', (req, res, next) => {
  let bodyRequest = {
    'method': req.body.method,
    'jsonrpc': jsonrpc,
    'id': rpcid,
    'params': req.body.params
  }
  request({
    method: 'POST',
    url: 'http://localhost:3002',
    body: JSON.stringify(bodyRequest),
    headers: {
      'Content-Type': 'application/json'
    }
  }, (err, response, body) => {
    if (err) {
      res.json(err)
    }
    res.json(response)
  })
})

router.post('/callrpc-sen', (req, res, next) => {
  let bodyRequest = {
    'method': req.body.method,
    'jsonrpc': jsonrpc,
    'id': rpcid,
    'params': req.body.params
  }
  request({
    method: 'POST',
    url: 'http://localhost:3003',
    body: JSON.stringify(bodyRequest),
    headers: {
      'Content-Type': 'application/json'
    }
  }, (err, response, body) => {
    if (err) {
      res.json(err)
    }
    res.json(response)
  })
})

module.exports = router
