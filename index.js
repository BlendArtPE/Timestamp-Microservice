// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  var dateReceived = req.params.date
  if (dateReceived) {
    let date;
    
    // Verifica si el valor recibido es un número (UNIX timestamp)
    if (!isNaN(dateReceived)) {
      date = new Date(parseInt(dateReceived)); // Convierte el UNIX timestamp a Date
    } else {
      date = new Date(dateReceived); // Intenta crear una instancia de Date desde la cadena de fecha
    }

    // Verifica si la fecha es válida
    if (!isNaN(date.getTime())) {
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    // Si no se proporciona ningún valor, devuelve la fecha y hora actuales
    const currentDate = new Date();
    res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
  }
})


// listen for requests :)
const port = 3000
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
