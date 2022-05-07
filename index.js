const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();
// dbuser1
// AcOo0dwoOZpBVsia



const uri = "mongodb+srv://dbuser1:AcOo0dwoOZpBVsia@cluster0.ntjiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('running server');
});

app.listen(port, () =>{
    console.log('listen port', port);
})