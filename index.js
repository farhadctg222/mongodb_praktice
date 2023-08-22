const express = require('express')
const passwor = "a4i6k1tiUYFJPVRT"

const {MongoClient } = require('mongodb');
const uri = "mongodb+srv://organicUser:a4i6k1tiUYFJPVRT@addnewuser.kllk4y5.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true});
const app = express()

client.connect(err=>{
  const collection = client.db('organicdb').collection('produc')
  console.log('hello world')
  const student = {name:'farhad',age: 20}
  collection.insertOne(student)
  .then(res=>{
   console.log('one product add')
  })
 
})
app.get('/',(req,res)=>{
    res.send('hello world')
})
app.listen(4200)