const express = require('express');
const app = express();
const mongoose = require('mongoose');
const route = require('./src/routes/route');

app.use(express.json());

app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://manu_db:g7o90loK4x1HTpI7@cluster0.pqmg1aw.mongodb.net/manudb07',
{useNewUrlParser:true})
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err.message))
app.use('/', route);

app.listen(3000, ()=> 
console.log("Port running on 3000"))



