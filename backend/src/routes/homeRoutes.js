import express from 'express'
import {getMyLibrary, addToMyLibrary, updateMyLibrary, deleteMyLibrary, getBookById} from '../controllers/homeControllers.js'

const router = express.Router()

router.get("/My-Library", getMyLibrary)
router.get("/My-Library/:id", getBookById)
router.post("/My-Library", addToMyLibrary)
router.put("/My-Library/:id", updateMyLibrary)
router.delete("/My-Library/:id", deleteMyLibrary)


export default router