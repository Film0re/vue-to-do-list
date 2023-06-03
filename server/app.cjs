const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors(
  {
    origin: 'http://localhost:5173'
  }
))

app.use(express.json())
// parse on body
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/data',(req,res) =>{
  fs.readFile("./server/data.json", (err, jsonString)=>{
    if(err){  
      res.send("Failed :)")
      return;
    }
    console.log("File read successfully")
    res.send(jsonString)
  })
})

app.put('/data',(req,res) =>{
  fs.writeFile("./server/data.json", JSON.stringify(req.body, null, 2), (err)=>{
    if(err){  
      res.send("Failed :)")
      return;
    }
    console.log(req.body)
    res.send(req.body)
  })
})

//Write put/get for an id.json file in server folder which will hold one number
app.get('/id',(req,res) =>{
  fs.readFile("./server/id.json", (err, jsonString)=>{
    if(err){  
      res.send("Failed :)")
      return;
    }
    console.log("File read successfully")
    res.send(jsonString)
  })
})

app.put('/id',(req,res) =>{
  fs.writeFile("./server/id.json", JSON.stringify(req.body[0], null, 2), (err)=>{
    if(err){  
      res.send("Failed :)")
      return;
    }
    console.log(req.body)
    res.send(req.body)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})