console.log('Hello World!');

const express = require('express')
const app = express()

app.get('/hello', function (req, res) {
  res.send('Hello World')
})

app.post('/chat', function(req, res) {
  if(req.body.msg == "ville"){
    res.send("Nous sommes à Paris")
  }else {
    res.send("Il fait beau")
  }
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
