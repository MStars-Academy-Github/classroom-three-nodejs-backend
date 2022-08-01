const express = require('express');
require('dotenv').config();
const router = express.Router();

const categoryRouter = require('./routes/categories')

const PORT = process.env.PORT;
const app = express();


app.use(express.json());

app.use('/' , categoryRouter);

app.get('/' , (req,res)=>{
	res.send('my app is running')
});

app.listen(PORT)
