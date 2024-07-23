const express = require('express');
const router = express.Router();
const Borrower = require('../models/borrower');
const { borrowerSchema } = require('../validationSchemas');
const validate = require('../middleware/validate');

router.post('/',validate(borrowerSchema), async (req, res)=>{
    try{
        const borrower = new Borrower(req.body);
        await borrower.save();
        res.status(201).json(borrower);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.get("/", async (req, res)=>{
    try{
        const borrowers = Borrower.find().populate('borrowedBooks').populate('borrowedComputers');
        req.json(borrowers);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.get("/:id", async (req, res)=>{
    try{
        const borrower = await Borrower.findById(req.params.id);
        if (!borrower) return res.status(404).json({message: "Borrower not found"});
        res.json(borrower);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.put("/:id", validate(borrowerSchema), async (req, res)=>{
    try{
        const borrower = await Borrower.findByIdAndUpdate(req.params.id, res.body, {new: true});
        if (!borrower) return res.status(404).json({message: "Borrower not found"});
        res.json(borrower);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.delete("/:id", async (req, res)=>{
    try{
        const borrower = Borrower.findByIdAndDelete(req.params.id);
        if (!borrower) return res.status(404).json({message: "Borrower not found"});
        res.json({message: "Borrower Deleted!"});
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;

