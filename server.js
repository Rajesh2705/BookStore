require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');
const compuersRouter = require('./routes/computers');
const borrowersRouter = require('./routes/borrowers');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
.then(()=> console.log("MongoDB Connected"))
.catch(error => console.log(`MongoDB error : ${error}`));

mongoose.set('toJSON',{
    transform: (doc, ret) =>{
        delete ret.__v;
        return ret;
    }
})

app.use('/api/books', booksRouter);
app.use('/api/computers', compuersRouter);
app.use('/api/borrowers', borrowersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server runing on Port ${PORT}`));
