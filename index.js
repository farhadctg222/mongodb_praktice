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
  app.patch('/updateData/:id',(req,res)=>{
    productCollection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set:{email: req.body.email,mobile: req.body.mobile}
    }
    
    )
   
    .then(result=>{
      res.send(result.modifiedCount>0)
    })
  })
  app.get('/product/:id',(req,res)=>{
    productCollection.find({_id: ObjectId(req.params.id)})
    .toArray((err,document)=>{
      res.send(document[0])
     
    })
  })

  app.post("/adproduct",(req,res)=>{
    const product = req.body
    productCollection.insertOne(product)
    .then(result=>{
      console.log(result.ops)
      res.redirect('/')
    })
  })
  app.delete('/delete/:id',(req,res)=>{
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then((result)=>{
     res.send(result.deletedCount>0)
    })
  })
  app.get('/product/:id',(req,res)=>{
   productCollection.find({_id: ObjectId(id.prams.id)})
   toArray((err,result)=>{
   res.send(document)
   })
  })
  
  
  })


app.listen(3000)