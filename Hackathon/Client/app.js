const ip = require('ip');
const express = require('express');
const routes = require('./routes/index');

const app = express();
const address = {
    ip: ip.address(),
    port: 8080
};

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/', routes);
app.set('view engine', 'ejs');

app.listen(address.port, function () {
    console.log('Server läuft auf: http://' + address.ip + ':' + address.port);
});