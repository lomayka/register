const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const routers = require('./routes');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// TODO
// connect to database, on success start listening
app.listen(config.PORT, (err) => {
    if(err) console.log(err);
    else console.log(`server on ${config.PORT}`);
});

app.use('/api/organizations', routers.OrganizationRouter);