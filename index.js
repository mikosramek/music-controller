const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const player = require('./routes/player');
const listener = require('./util/internalHost');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(player);

<<<<<<< HEAD
// require('./util/fileReader')('./music');
// require('./util/fileFixer')('./music');
=======
//require('./util/fileReader')('./music');
>>>>>>> a8974ac72d2c96f24ac7084045d2cab9e51255d0

// app.listen(3000);
app.listen(80, '0.0.0.0', listener);