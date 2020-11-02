const express = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const log = require('tracer').colorConsole();

const CHANNEL_ID = process.env.CHANNEL_ID;
const CHANNEL_SECRET = process.env.CHANNEL_SECRET;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {CHANNEL_ID});
})

app.get('/auth/:clientId' , (req,res) => {
    const payload = {
        client: req.params.clientId,
        channel: CHANNEL_ID,
        permissions: {
          '^myroom$': {
            publish: true,
            subscribe: true,
          },
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 3 // client has to use this token within 3 minutes
      };
      const token = jwt.sign(payload, CHANNEL_SECRET, {algorithm: 'HS256'});
      res.status(200).end(token);
})

app.listen(3000);