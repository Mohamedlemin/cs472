
const books = [
    {
        bookId:1,
        title:"nodejs",
        authors : [
        {authorId : 303,
            firstName : "Edward",
            lastName : "jack"
        },
        {authorId : 305,
            firstName : "Anna",
            lastName : "Dove"
        }
       ],
},{
    bookId:2,
    title:"Jaba",
    authors : [
    {authorId : 503,
        firstName : "Test",
        lastName : "lemin"
    },
    {authorId : 405,
        firstName : "Ahmed",
        lastName : "Babe"
    }
   ]
}
]

class Book {
    constructor(bookId,title,authors){
        this.bookId = bookId,
        this.title = title,
        this.authors = authors
    }
    static  getBookById(id) {
        return books.find((e)=>{
            e.bookId === id
        })

    }
    static deleteBookById(id){
        const index = books.indexOf((e)=>{
            id === e.bookId
        })
        if(index > -1){
            const deletedBook = books[index];
            books.slice(index,1)
            return deletedBook;
        }
    }

    static getAuthorById(bookId,ahthorId){
        const book = this.getBookById(bookId);
        return book.authors.find((e)=>{
            e.authorId = ahthorId
        })
    }

    static getAllByQuery(query){
        let filteredBooks = structuredClone(books)
        if(query.title){
            filteredBooks.filter((book)=>{
            filteredBooks=  book.title.toLowerCase.include(query.title.toLowerCase())
                
            })
        }
        if(query.id){
            filteredBooks = filteredBooks.filter((book)=> book.bookId === query.id)
        }
        if(query.keySort){
            const keySort = query.keySort;
            filteredBooks = filteredBooks.sort((a,b)=> a[keySort].lcalCompare(b[keySort]))
        }
        return filteredBooks;
    }
}

export default Book