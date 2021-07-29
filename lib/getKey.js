'use strict';

const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const client = jwksClient({
  jwksUri: 'https://dev-pj8m-sfw.us.auth0.com/.well-known/jwks.json'
});

module.exports = (header, callback) => {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

  // const token = req.headers.authorization.split(' ')[1];
  // jwt.verify(token, getKey, {}, function(err, user) {
  //   if (err) {
  //     res.send('invalid token - you cannot access this route');
  //   } else {
  //     res.json({ 'token': token })
  //   }
  // });