import Book from "../models/Book.js"

export async function getMyLibrary (req, res) {
    try {
        const Books = await Book.find().sort({createdAt: -1});
        res.status(200).json(Books)
    } catch (error) {
        console.log("error in getMyLibrary", error)
        res.status(500).json({error: "internal server error"})
    }
}

export async function getBookById (req, res) {
    try {
        const Books = await Book.findById(req.params.id)
        res.status(200).json(Books)
    } catch (error) {
        console.log("error in getBookById", error)
        res.status(500).json({error: "internal server error"})
    }
}

export async function addToMyLibrary (req, res) {
    try {
        const {title, comment} = req.body
        const newBook = new Book({title, comment})
        await newBook.save()
        res.status(201).send('You just added your Library')
    } catch (error) {
        console.log("error in addToMyLibrary", error)
        res.status(500).json({error: "internal server error"})
    }
}

export async function updateMyLibrary (req, res) {
    try {
        const {title, comment} = req.body
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {title, comment}, {new: true,})
        if (!updatedBook) return res.status(404).json({message: "invalid id"})
        res.status(200).send('You just updated your Library')
    } catch (error) {
        console.log("error in updateMyLibrary", error)
        res.status(500).json({error: "internal server error"})
    }
}

export async function deleteMyLibrary (req, res) {
    try {
        const deleteddBook = await Book.findByIdAndDelete(req.params.id)
        if (!deleteddBook) return res.status(404).json({message: "invalid id"})
        res.status(200).send('You just deleted from your Library')
    } catch (error) {
        console.log("error in deleteMyLibrary", error)
        res.status(500).json({error: "internal server error"})
    }
}