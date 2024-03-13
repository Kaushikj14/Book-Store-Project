import express  from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to save a notebook
router.post('/', async (req,res)=>{
    try {

        if(!req.body.title||!req.body.author||!req.body.publishYear){
            res.status(400).send({message:"Send all required fields:title,author and publishyear"});
        }

        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };

        const book = await Book.create(newBook);
        
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

// Route to get all books from db
router.get('/', async (req,res)=>{
try {

    // 
    const books = await Book.find({});
    return res.status(201).json(
       { 
         count:books.length,
         data:books
       }
    );
    
} catch (error) {
    console.log(error.message);
    return res.status(500).send({message:error.message});
}
});


// Route to get one book from db using id
router.get('/:id', async (req,res)=>{
try {

    const {id} = req.params;
    // 
    const book = await Book.findById(id);
    return res.status(200).json(book);
    
} catch (error) {
    console.log(error.message);
    return res.status(500).send({message:error.message});
}
});

// Update a book
router.put('/:id', async (req,res) => {
try {

    if(!req.body.title || !req.body.author || !req.body.publishYear){
        return req.statusCode(400).send({message:"Send All required fields"});
    }

    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id,req.body);

    if(!result){
        return req.status(400).json({message:"Book not found"});
    }else{
        return res.status(200).send({message:"Book updated succesfully"});
    }


    
} catch (error) {
    console.log(error.message);
    return res.status(500).send({message:error.message});
    
}
});

// Route to delete a book by id
router.delete('/:id',async (req,res)=>{
try {

    const {id} = req.params;
    const result = await Book.findByIdAndDelete(id);

    if(!result){
        return res.status(404).send({message:"Book not found"});
    }else{
        return res.status(200).send({message:"Book deleted successfully"});
    }
    
} catch (error) {
    console.log(error);
    return res.status(500).send({message:error.message});
}
});

export default router;
