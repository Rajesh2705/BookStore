const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const { bookSchema } = require('../validationSchemas');
const validate = require('../middleware/validate');


router.post('/', validate(bookSchema), async (req, res)=>{
    try{
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error){
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
});

router.get('/', async (req, res)=>{
    try{
        const book = await Book.find();
        res.json(book);
    }catch (error){
        res.status(400).json({message: error.message});
    }
});

router.get('/:id', async (req, res)=>{
    try{
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(400).json({message: "Book not found!"});
        res.json(book);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', validate(bookSchema), async (req, res)=>{
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!book) return res.status(404).json({message: "Book not found!"});
        res.status(200).json(book);
    }catch (error){
        res.json(500).json({message: error.message});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({message: "Book Not Found!!"});
        res.json({message: "Book deleted"});
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;