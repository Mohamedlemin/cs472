
import express from "express"
import  bookController  from "../controller/bookController.js";

const router = express.Router()

router.route("/:bookId")
      .get(bookController.getBookById)
      .delete(bookController.deleteBookById)

router.route("/:bookId/authors/:authorId")
      .get(bookController.getAuthorById)




export default router