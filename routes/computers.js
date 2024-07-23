const express = require('express');
const router = express.Router();
const Computer = require('../models/computer');
const { computerSchema } = require('../validationSchemas');
const validate = require('../middleware/validate');

router.post('/', validate(computerSchema), async (req, res)=>{
    try{
        const computer = new Computer(req.body);
        await computer.save();
        res.status(201).json(computer);
    }catch (error){
        res.status(400).json({message: error.message});
    }
});

router.get('/', async (req, res)=>{
    try{
        const computers = await Computer.find();
        res.json(computers);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req,res)=>{
    try{
        const computer = await Computer.findById(req,params.id);
        if (!computer) return res.status(404).json({message: "Computer Not Found!"});
        res.json(computer);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', validate(computerSchema), async (req, res)=>{
    try{
        const computer = await Computer.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!computer) return res.status(404).json({message: "Computer not Found!!"});
        res.json(computer)
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const computer = Computer.findByIdAndDelete(req.params.id);
        if (!computer) return res.status(404).json({message: "Computer not Found"});
        res.json({message: "Computer deleted"});
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router