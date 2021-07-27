'use strict';


//Copied from the instructors code so we can try to understand what is happening.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const User = require('./models/User.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI, mongooseOptions).then( () => {
  console.log('test success');
});

const client = jwksClient({
  jwksUri: 'https://dev-pj8m-sfw.us.auth0.com/.well-known/jwks.json'
});


function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}


app.get('/test', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, function(err, user) {
    if (err) {
      res.send('invalid token - you cannot access this route');
    } else {
      res.json({ 'token': token })
    }
  });
});

//==================== Models ========================//

let user = new User ({ email: 'jessedills@gmail.com', books: [{name: 'The Grail Quest'}, {description: 'The Grail Quest is a historical fiction novel series written by Bernard Cornwell dealing with a 14th-century search for the Holy Grail, around the time of the Hundred Years&apos; War. The stories follow the adventures of the fictional Thomas of Hookton as he leaves Dorset after the murder of his father and joins the English Army under Edward III as an archer. In Harlequin he is involved in battle in Brittany and subsequently at the Battle of Crécy. The archers are the first soldiers to be deployed along the crest of the hill at Crécy, providing cover before the battle starts for the knights building a system of ditches, pits and caltrops below to maim and bring down the enemy cavalry. The battle is a decisive victory for the English, even though they were outnumbered. It is after this battle that Thomas&apos; family&apos;s links to the Grail come to the attention of the King and in Vagabond he is sent back to England to discover its whereabouts and becomes involved in the Scottish invasion of 1347. He soon discovers that his cousin, Guy Vexille, is working with powerful figures within the Catholic Church in France to discover the Grail for their own ends. The novel ends with fierce fighting at La Roche-Derrien back in Brittany. Heretic finds Thomas still in France, this time during a time of supposed peace with the French following the fall of Calais. Thomas leads a small band of men into southern France to find the Grail. He becomes the centre of a bitter local war with those also seeking the Grail as well as by the Black Death.'}, {status: 'Unknown'},

{name: 'Inferno'}, {description: 'Inferno is the first part of Italian writer Dante Alighieri&apos;s 14th-century epic poem Divine Comedy. It is followed by Purgatorio and Paradiso. The Inferno describes Dante&apos;s journey through Hell, guided by the ancient Roman poet Virgil. In the poem, Hell is depicted as nine concentric circles of torment located within the Earth; it is the "realm of those who have rejected spiritual values by yielding to bestial appetites or violence, or by perverting their human intellect to fraud or malice against their fellowmen. As an allegory, the Divine Comedy represents the journey of the soul toward God, with the Inferno describing the recognition and rejection of sin'}, {status: 'Unknown'},

{name: 'Angels and Demons'}, {description: 'When world-renowned Harvard symbologist Robert Langdon is summoned to a Swiss research facility to analyze a mysterious symbol seared into the chest of a murdered physicist, he discovers evidence of the unimaginable: the resurgence of an ancient secret brotherhood known as the Illuminati… the most powerful underground organization ever to walk the earth.'}, {status: 'Unknown'}] });

user.save();

//====================================================//

app.get('/books', getAllBooks);

function getAllBooks(req, res) {
  User.find({})
  .then(books => {
    res.json(books);
  })
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
