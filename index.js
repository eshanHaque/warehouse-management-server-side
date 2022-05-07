const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntjiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect();
        const usersCollection = client.db("test").collection("users");
        const user = {
            user : 'volu',
            email: 'volu@gmail.com'
        };
        const result = await usersCollection.insertOne(user);
        console.log(`user inserted with id:  ${result.insertedId}`)
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('running server');
});

app.listen(port, () =>{
    console.log('listen port', port);
})