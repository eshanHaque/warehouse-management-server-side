const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("*", cors(corsConfig))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization")
    next()
})
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntjiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('Warehouse').collection('Inventory');
        const orderCollection = client.db('Warehouse').collection('order');

        app.get('/Inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        app.get('/Inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await inventoryCollection.findOne(query);
            res.send(inventory);
        });
        app.post('/Inventory', async (req, res) => {
            const inventory = req.body;
            const result = await inventoryCollection.insertOne(inventory);
            res.send(result);
        })
        app.get('/inventories', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query).project({ name: 1 });
            const inventories = await cursor.toArray();
            res.send(inventories);
        });

        app.delete('/Inventory/:name', async (req, res) => {
            const name = req.params.name;
            const filter = { name: name };
            const result = await inventoryCollection.deleteOne(filter);
            res.send(result);
        });

        app.get('/order', async (req, res) => {
            const userEmail = req.query.userEmail;
            const query = { userEmail: userEmail };
            const orders = await orderCollection.find(query).toArray();
            return res.send(orders);
        });

        app.get('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const order = await orderCollection.findOne(query);
            res.send(order);
        });
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            return res.send({ result });
        });


    }

    finally {
        // await client.close();
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running server');
});

app.listen(port, () => {
    console.log('listen port', port);
})