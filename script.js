const library = []

let shelf = document.getElementById("bookshelf")
let dialog = document.getElementById("add-book")
let addBookBtn = document.getElementById("add-book-btn")
let confirmBtn = document.getElementById("confirm-book")
let closeBtn = document.getElementById("close-btn")

let gundamBook = new Book("Gundam: The Last Rebellion", "Narudo Uzumimo", 394)
let narutoBook = new Book("Naruto", "Jakiro", 432, true)
let gtaBook = new Book("Grand Theft Auto: San Andreas", "CJ Johnson", 321, true)
let farCryBook = new Book("Far Cry 3", "Jason Bourne", 341, true)
let acBook = new Book("Assassin's Creed Brotherhood", "Ezio Auditore", 658, false)


confirmBtn.addEventListener("click", check)

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

    let title = document.getElementById("title").value || undefined
    document.getElementById("title").value = ""
    let author = document.getElementById("author").value || undefined
    document.getElementById("author").value = ""
    let pages = document.getElementById("pages").value || undefined
    document.getElementById("pages").value = ""
    let readStatus = document.getElementById("read-status-input").checked
    document.getElementById("read-status-input").checked = false

    const rawBook = new Book(title, author, pages, readStatus)
    const book = buildBook(rawBook)

    addBook(rawBook)
    showBooks()
}


function Book(title="No title", author="No author", pages=0, read=false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.bookCoverNum = Math.floor(Math.random() * 4) + 1

    this.fontColor = this.bookCoverNum == 4 ? "black" : "white"
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

    let book = document.createElement("div")
    let content = document.createElement("div")
    let actions = document.createElement("div")
    let title = document.createElement("h3")
    let author = document.createElement("p")
    let pages = document.createElement("p")
    let readStatus = document.createElement("button")
    let removeBook = document.createElement("button")
    book.classList.add("book")
    book.style = `background-image: url(assets/img/book_${rawBook.bookCoverNum}.png); 
                color: ${rawBook.fontColor};`
                                    

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

    readStatus.textContent = rawBook.read ? "Read" : "Not read"
    readStatus.setAttribute("data-read", rawBook.read)
    readStatus.addEventListener("click", () => {
        console.log(rawBook)
        
        rawBook.read = !rawBook.read
        showBooks()
    })

    removeBook.classList.add("remove-book-btn")
    removeBook.setAttribute("id", "remove-book")
    removeBook.setAttribute("type", "button")

    removeBook.textContent = "Remove"
    removeBook.addEventListener("click", () => {
        console.log("REMOVED", )

        let i = library.indexOf(rawBook)
        library.splice(i, 1)
        showBooks()
    })

    actions.appendChild(readStatus)
    actions.appendChild(removeBook)

    title.textContent = rawBook.title
    author.textContent = rawBook.author 
    pages.textContent = (rawBook.pages ?? 0) + " pages"

    return book
}

addBook(gundamBook)
addBook(narutoBook)
addBook(gtaBook)
addBook(farCryBook)
addBook(acBook)

showBooks()

