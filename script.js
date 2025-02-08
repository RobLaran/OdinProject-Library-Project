const library = []

let shelf = document.getElementById("bookshelf")

let dialog = document.getElementById("add-book")
let addBookBtn = document.getElementById("add-book-btn")
let confirmBtn = document.getElementById("confirm-book")
confirmBtn.addEventListener("click", check)

let closeBtn = document.getElementById("close-btn")



addBookBtn.addEventListener("click", () => {
    dialog.showModal()
})

confirmBtn.addEventListener("click", () => {
    dialog.close()
})

closeBtn.addEventListener("click", () => {
    dialog.close()
})

function check(event) {
    event.preventDefault()

    let rawBook = new Book("hey")
    let book = buildBook(rawBook)

    shelf.appendChild(book)
}


function Book(title="", author="", pages=0, read=false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBook(book) {
    if(book instanceof Book) {
        library.push(book)
    }
}

function showBooks() {
    let books = document.querySelectorAll(".book")
    books.forEach(book => shelf.removeChild(book))

    for(let index in library) {
        let book = buildBook(library[index])

        shelf.appendChild(book)
    }
}
function buildBook(rawBook) {
    if(!(rawBook instanceof Book)) {
        return
    }

    let bookNum = Math.floor(Math.random() * 4) + 1

    if(!rawBook.img) {
        rawBook.img = bookNum
    }

    let book = document.createElement("div")
    let content = document.createElement("div")
    let actions = document.createElement("div")
    let title = document.createElement("h3")
    let author = document.createElement("p")
    let pages = document.createElement("p")
    let readStatus = document.createElement("button")
    let removeBook = document.createElement("button")
    book.classList.add("book")
    book.style = `background-image: url(assets/img/book_${rawBook.img}.png);`

    if(rawBook.img == 4) {
        book.style.color = "#000"
    } else {
        book.style.color = "#fff"

    }

    content.classList.add("content")
    actions.classList.add("actions")

    book.appendChild(content)
    content.appendChild(title)
    content.appendChild(author)
    content.appendChild(pages)
    content.appendChild(actions)

    readStatus.classList.add("read-toggle")
    readStatus.setAttribute("id", "read-status")
    readStatus.setAttribute("type", "button")
    removeBook.classList.add("remove-book-btn")
    removeBook.setAttribute("id", "remove-book")
    removeBook.setAttribute("type", "button")

    actions.appendChild(readStatus)
    actions.appendChild(removeBook)

    title.textContent = rawBook.title
    author.textContent = rawBook.author 
    pages.textContent = (rawBook.pages ?? 0) + " pages";

    readStatus.textContent = rawBook.read ? "Read" : "Not read"
    readStatus.setAttribute("data-read", rawBook.read)
    readStatus.addEventListener("click", () => {
        rawBook.read = !rawBook.read

        showBooks()
    })


    removeBook.textContent = "Remove"

    return book
}

let gundamBook = new Book("Gundam: The Last Rebellion", "Narudo Uzumimo", 394)
let narutoBook = new Book("Naruto", "Jakiro", 432, true)
let gtaBook = new Book("Grand Theft Auto: San Andreas", "CJ Johnson", 321, true)
let farCryBook = new Book("Far Cry 3", "Jason Bourne", 341, true)
let acBook = new Book("Assassin's Creed Brotherhood", "Ezio Auditore", 658, false)

addBook(gundamBook)
addBook(narutoBook)
addBook(gtaBook)
addBook(farCryBook)
addBook(acBook)

showBooks()

