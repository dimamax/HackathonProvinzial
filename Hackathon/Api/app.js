const ip = require('ip');
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const employeeRoute = require('./routes/employees');
const employerRoute = require('./routes/employers');
const jobAdsRoute = require('./routes/job_ads');
const url = require('url');

const app = express();
const address = {
    ip: ip.address(),
    port: 4321
};
const dbUrl = 'mongodb://bewebungsportal:jPyoUXet710r3nFbPsXmG7L02xOomPo7szqVrxXkVIfIFSdKlOmGxnlTbQPa7tSOJIx' +
    'y7f1eY3ToI4EzFSbIIQ==@bewebungsportal.documents.azure.com:10255/?ssl=true';
const parsedUrl = url.parse(dbUrl).href;

const params = function (req, res, next) {
    req.mongoClient = mongoClient;
    req.dbUrl = parsedUrl;
    next();
};

app.use(params);
app.use('/employees', employeeRoute);
app.use('/employers', employerRoute);
app.use('/job_ads', jobAdsRoute);

app.listen(address.port, function () {
    console.log('Server läuft auf: http://' + address.ip + ':' + address.port);
});

