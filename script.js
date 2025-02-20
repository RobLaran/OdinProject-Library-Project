class Library {
    constructor() {
        this.bookshelf = []
    }

    addBook(book) {
        if(book instanceof Book) {
            this.bookshelf.push(book)
        }
    }

    removeBook(book) {
        if(book instanceof Book) {
            const bookIndex = this.bookshelf.indexOf(book)

        this.bookshelf.splice(bookIndex, 1)
        }
    }

    getBooks() {
        return this.bookshelf
    }
}

class Book {
    constructor(title="No title", author="No author", pages=0, read=false) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.bookCover = this.#createBookCover()
        this.fontColor = this.#setFontColor()
    }

    readBook(read) {
        if(typeof read === 'boolean') {
            this.read = read
        }
    }

    #createBookCover() {
        const randomNumber = Math.floor(Math.random() * 4) + 1
         
        return { img : `book_${randomNumber}.png`, num : randomNumber}
    }

    #setFontColor() {
        return this.bookCover['num'] == 4 ? "black" : "white"
    }
}

class UIController {
    constructor() {
        this.library = new Library()
        this.dialog = document.getElementById("add-book-dialog")
        this.addBookBtn = document.getElementById("add-book-btn")
        this.confirmBtn = document.getElementById("confirm-book")
        this.closeBtn = document.getElementById("close-btn")
    }

    displayBooks() {
        this.books = document.getElementsByClassName('book')
        this.bookshelfDiv = document.getElementById("bookshelf")

        for (let bookElem of this.books) {
            this.bookshelfDiv.removeChild(bookElem)
            console.log(bookElem)
        }

        const books = this.library.getBooks()

        for(let index in books) {
            let book = this.buildBook(books[index]) 
            this.bookshelfDiv.appendChild(book)
        }
    }
    
    clearDialog() {
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("pages").value = ""
        document.getElementById("read-status-input").checked = false
    }

    getValues() {
        return { 
            title : document.getElementById("title").value || undefined,
            author : document.getElementById("author").value || undefined,
            pages : document.getElementById("pages").value || undefined,
            readStatus : document.getElementById("read-status").checked
        }
    }

    buildBook(rawBook) {
        let book = document.createElement("div")
        let content = document.createElement("div")
        let actions = document.createElement("div")
        let title = document.createElement("h3")
        let author = document.createElement("p")
        let pages = document.createElement("p")
        let readStatus = document.createElement("button")
        let removeBook = document.createElement("button")

        book.classList.add("book")
        book.style = `background-image: url(assets/img/${rawBook.bookCover['img']}); 
                    color: ${rawBook.fontColor};`
                                        
    
        content.classList.add("content")
        actions.classList.add("actions")
    
        book.appendChild(content)
        content.appendChild(title)
        content.appendChild(author)
        content.appendChild(pages)
        content.appendChild(actions)
    
        readStatus.classList.add("read-toggle")
        readStatus.classList.add("read-status")
        readStatus.setAttribute("type", "button")
    
        readStatus.textContent = rawBook.read ? "Read" : "Not read"
        readStatus.setAttribute("data-read", rawBook.read)
        readStatus.addEventListener("click", () => {
            rawBook.readBook(!rawBook.read)

            this.displayBooks()
        })
    
        removeBook.classList.add("remove-book-btn")
        removeBook.classList.add("remove-book")
        removeBook.setAttribute("type", "button")

        removeBook.textContent = "Remove"
        removeBook.addEventListener("click", () => {
            console.log("REMOVED")
            
            this.library.removeBook(rawBook)

            this.displayBooks()
        })
    
        actions.appendChild(readStatus)
        actions.appendChild(removeBook)
    
        title.textContent = rawBook.title
        author.textContent = rawBook.author 
        pages.textContent = (rawBook.pages ?? 0) + " pages"
    
        return book
    }


    setupClickEvents() {
        this.addBookBtn.addEventListener('click', () => {
            this.dialog.showModal()
        })

        this.confirmBtn.addEventListener('click', (event) => {
            event.preventDefault()

            const {title, author, pages, readStatus} = this.getValues()

            const newBook = new Book(title, author, pages, readStatus)

            this.library.addBook(newBook)

            this.displayBooks()

            this.dialog.close()
        })

        this.closeBtn.addEventListener('click', () => {
            this.dialog.close()
        })
    }
}

const controller = new UIController()

controller.setupClickEvents()