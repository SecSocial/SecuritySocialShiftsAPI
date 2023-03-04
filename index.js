// run `node index.js` in the terminal
var express = require('express');
var app = express();
var fs = require('fs');

app.get('/getShift', function (req, res) {
  // Get current time object with locale set to Riyadh
  function getCurrentTimeKSA() {
    return new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Riyadh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Get current shift helper function
  function getCurrentShift(shifts, current_time) {
    for (let i = 0; i < shifts.length; i++) {
      if (current_time < shifts[i].starts) {
        if (i === 0) {
          return shifts.slice(-1);
        } else {
          return shifts[i - 1];
        }
      }
    }
  }

  // Read the shifts file
  fs.readFile(__dirname + '/' + 'shifts.json', 'utf8', function (err, data) {
    // Store shifts data
    const shifts = JSON.parse(data);
    let shift = getCurrentShift(shifts, getCurrentTimeKSA());
    res.end(JSON.stringify(shift));
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});