
import Book from "../model/book.js";

let bookController = {
    getBookById(req,res){
      const book = Book.getBookById(req.params.bookId)
      if(book){
        res.status(200).json(book)
      }else{
        res.status(404)
      }
    },
    getAuthorById(req,res){
        const author = Book.getBookById(req.params.bookId,req.params.authorId)
        if(author){
          res.status(200).json(author)
        }else{
          res.status(404).json (message = "author not found")
        }
      },
    
    deleteBookById(req,res){
        const deletedBook = Book.deleteBookById(req.params.bookId)
        if(deletedBook){
            res.status(200).json(deletedBook)
          }else{
            res.status(404).json (message = "book not found")
          }

    }

}

export default bookController