const express = require('express');
const { dbUrl } = require('./config.js');
const authRoute = require('./routes/auth_routes');
const mongoose = require('mongoose');
const profileRoute = require('./routes/profile_routes');
const bodyParser = require('body-parser');
const { json } = require('body-parser');




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",authRoute);
app.use("/",profileRoute);
// app.use(rootRoute);
// app.use(questRoute);
// ping
app.get('/ping', (req, res) => {
    return res.status(200).json({ msg: "Its Running" });
});

app.get('*', (req, res) => {
    return res.status(500).json({ msg: "Its Running But Route Not Founds" });
});



mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'christmas',})
    .then(() =>{
        app.listen(3000, () => {
            console.log('Server is up on port 3000');
        });
    })
    .catch((err) => console.log(err));