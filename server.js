const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 8089;

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin)=>{
    console.log(process.stderr.id, `Caught exception: ${err}/n` + `Exception origin: ${origin}`);
})

mongodb.initDb((err)=>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(port, ()=> {console.log(`Database is listening & node is running on port ${port}`)})
    }
});