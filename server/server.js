const path = require('path');
const express = require('express');

var publiPath = path.join(__dirname, '../public');

var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(publiPath));//middleware

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
