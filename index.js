const express = require('express')
const bodyParser = require('body-parser')
const passwor = "a4i6k1tiUYFJPVRT"

const {MongoClient } = require('mongodb');
const uri = "mongodb+srv://organicUser:a4i6k1tiUYFJPVRT@addnewuser.kllk4y5.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true});
const ObjectId = require('mongodb').ObjectId
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



app.get('/',(req,res)=>{
  res.sendFile(__dirname + "/index.html")
})
client.connect(err=>{
  const productCollection = client.db('organicdb').collection('produc')

  app.get('/product',(req,res)=>{
    productCollection.find({})
    .toArray((err,document)=>{
      res.send(document)
    })
  })

  app.post("/adproduct",(req,res)=>{
    const product = req.body
    productCollection.insertOne(product)
    .then(result=>{
      console.log(result.ops)
      res.send('success')
    })
  })
  app.delete('/delete/:id',(req,res)=>{
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then((result)=>{
      console.log(result)
    })
  })
})

app.listen(3000)