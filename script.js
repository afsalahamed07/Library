let sessionLibrary = [];
let numInstances = 1;

// local storage
let localLibrary = localStorage.getItem('localLibrary') ? JSON.parse(localStorage.getItem('localLibrary')) : [] // let numInstances = localStorage.getItem('numInstances') ? parseInt(localStorage.getItem('numInstances')) : 1;
    // let numInstances = localStorage.getItem('numInstances') ? parseInt(localStorage.getItem('numInstances')) : 1;

function Book(title, author, pages, read) {
    this.bookId = "book" + numInstances;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? "Read" : "Not read";

    numInstances++;
}

Book.prototype.addBookToLibrary = function() {
    sessionLibrary.push(this);
};


Book.prototype.makeCard = function() {
    return `<div class="col s12 m4" id="${this.bookId}">
    <div class="card">
      <div class="card-content">
        <span class="card-title">${this.title}</span>
        <span class="card-title">${this.author}</span>
        <span class="card-title">${this.pages}</span>
        <span class="card-title">${this.read}</span>
      </div>
      <div class="card-action">
        <button class="btn btn-remove" id="btn-${this.bookId}">Remove</button>
        <button class ="btn">Read</button>
      </div>
    </div>
  </div>`
};



function removeFromLibrary(bookId) {
    sessionLibrary = sessionLibrary.filter(book => book.bookId != bookId);
}



const books = document.querySelector("#books");
const bookRow = books.querySelector(".row")

const btnAddBook = document.querySelector("#btn-addBook");
const formAddBook = document.querySelector(".hidden-div");
const btnAdd = document.querySelector("#btn-add");

const form = document.querySelector("form");
const bookTitle = document.querySelector("#book-title");
const bookAuthour = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookRead = document.querySelector("#book-read");


btnAddBook.addEventListener("click", () => {
    formAddBook.style.display = "block";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == formAddBook) {
        formAddBook.style.display = "none";
    }
}

// coveting objects from loaclLibarary to Book objects
localLibrary.forEach(book => {
    let read = book.read == "Read" ? true : false;
    book = new Book(book.title, book.author, book.pages, read)
    const bookCard = book.makeCard();
    bookRow.innerHTML += bookCard;

    sessionLibrary.push(book);
});

let btnRemove = document.querySelectorAll(".btn-remove")

btnRemove.forEach(btn => {
    btn.addEventListener("click", function() {
        const bookId = btn.id.substr(4)
        const domBookCard = document.querySelector(`#${bookId}`)

        removeFromLibrary(bookId);
        localLibrary = localLibrary.filter(book => book.bookId != bookId);

        localStorage.setItem('localLibrary', JSON.stringify(localLibrary))

        domBookCard.remove();
    })
});


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let book = new Book(
        bookTitle.value,
        bookAuthour.value,
        bookPages.value,
        bookRead.checked);

    book.addBookToLibrary();
    form.reset();
    formAddBook.style.display = "none";


    const bookCard = book.makeCard();
    bookRow.innerHTML += bookCard;

    let btnRemove = document.querySelectorAll(".btn-remove")

    btnRemove.forEach(btn => {
        btn.addEventListener("click", function() {
            const bookId = btn.id.substr(4)
            const domBookCard = document.querySelector(`#${bookId}`)

            removeFromLibrary(bookId);
            domBookCard.remove();
        })
    });

    localStorage.setItem('localLibrary', JSON.stringify(sessionLibrary));
    // localStorage.setItem('numInstances', numInstances)
});

console.log("hello from the outside")