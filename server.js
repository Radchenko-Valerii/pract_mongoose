const http = require('http');

const express = require('express');
const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME || 'fd_memes'

mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`).catch((err)=>{
  console.log(err);
  process.exit(1);
})

const PORT = process.env.PORT || 3000;

const professorSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    validate:{
      validator: (value) => /[A-Za-z ]{1,64}/.test(value)
    }
  },
  surName:{
    type: String,
    required: true,
    validate:{
      validator: (value) => /[A-Za-z ]{1,64}/.test(value)
    }
  }
});

const Professor = mongoose.model('professors', professorSchema);

const app = express();

app.use(express.json());

app.post('/', async (req, res, next) => {
  try{
    const {body} = req;
    const prof = await Professor.create(body);
    res.status(201).send({data: prof})
  }
  catch (error) {
   next(error) 
  }
})

app.get('/', async (req, res, next) => {
  try{
    
    const prof = await Professor.find();
    res.status(201).send({data: prof})
  }
  catch (error) {
   next(error) 
  }
})

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('server is up');
});