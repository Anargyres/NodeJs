const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

(async function() {
  // Connection URL
  const url = 'mongodb://localhost:27017/chat-bot';
  // Database Name
  const dbName = 'myproject';
  const client = new MongoClient(url);

  var express = require('express');
  const fs = require('fs');

  var app = express();
  var port = process.env.PORT || 3000;
  app.use(express.json());

  console.log('Hello Word');

  app.listen(port, () => {
    console.log("Listening on port 3000...");
  })

  app.get("/hello", (req, res) => {
    res.send("Hello World\n");
  })



  app.post('/chat', async (req, res) => {
    switch(req.body.msg) {
      case "ville":
        res.send("Nous sommes à Paris\n");
        break;
      case "météo":
        res.send("Il fait beau\n");
        break;
      case "demain":
        let rawdata = fs.readFileSync('response.json');
        let json = JSON.parse(rawdata);
        console.log(json.day);
        if(json.day == null) {
          res.send("Je ne connais pas demain…\n");
        }
        else {
          res.send(json.day);
        }
        break;
      case "demain = Mercredi":
        let day = {
            day: 'Mercredi',
        };
        let data = JSON.stringify(day);
        fs.writeFileSync('response.json', data);
        res.send("Mercredi");
        break;
      default:
        res.send("Réponse par défaut\n");
        break;
    }
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection('messages');

    app.get("/messages/all", (req, res) => {
      const cursor = col.find().toArray();
      res.send(cursor);
    })

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();
