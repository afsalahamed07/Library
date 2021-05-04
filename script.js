let myLibrary = [];

let numInstances = 1;

function Book(title, author, pages, read) {
    this.bookId = "book" + numInstances;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? "Read" : "Not read";

    numInstances++;
}

Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
};


Book.prototype.makeCard = function() {
    return `<div class="col s12 m4" id="${this.bookId}">
    <div class="card orange lighten-3">
      <div class="card-content">
        <span class="card-title">${this.title}</span>
        <span class="card-title">${this.author}</span>
        <span class="card-title">${this.pages}</span>
        <span class="card-title">${this.read}</span>
      </div>
      <div class="card-action grey darken-4">
        <button class="btn-remove" id="btn-${this.bookId}">Remove</button>
        <button>Read</button>
      </div>
    </div>
  </div>`
};


function removeFromLibrary(bookId) {
    myLibrary = myLibrary.filter(book => book.bookId != bookId);
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

// let btnRemove


btnAddBook.addEventListener("click", () => {
    formAddBook.style.display = "block";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == formAddBook) {
        formAddBook.style.display = "none";
    }
}

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


});