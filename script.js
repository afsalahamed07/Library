// grab dom element form
const form = document.querySelector('form');
const shelv = document.querySelector('.shelv')


for (let i=0; i < localStorage.length; i++) {
    const book = JSON.parse(localStorage.getItem(localStorage.key(i)));
    shelv.innerHTML += bookCardTemplate(book.title, book.author, book.publish, book.page)
}

// Book calss
class Book {
    constructor(title, author, publish, page, read=false) {
        this.title = title;
        this.author = author;
        this.publish = publish;
        this.page = page;
        this.read = read;
    }

    get bookDetails() {
        return {
            "title": this.title,
            "author": this.author,
            "publish": this.publish,
            "page": this.page,
            "read": this.read
        }
    }

    get read() {
        return this._read;
    }

    set read(bool) {
        this._read = bool;
    }
}


for (let i=0; i < localStorage.length; i++) {
    JSON.parse(localStorage.getItem(localStorage.key(i)));
}


form.addEventListener("submit", (e) => {
    // The Event interface's preventDefault() method 
    // tells the user agent that if the event does not get explicitly
    // handled, its default action should not be taken as it normally would be.
    e.preventDefault();

    storeButtonFunction();

});


function bookCardTemplate(title, author, publish, page) {
    return `<div class="book-card">
            <p >Title: ${title}</p>
            <p>Author: ${author}</p>
            <p>Published: ${publish}</p>
            <p>Pages: ${page}</p>
            <label for="read"> read
                <input id="${title}" type="checkbox" name="read" onclick="updateRead(this.id)">
            </label>
            </div>`
}


function storeButtonFunction() {
    // create form data object
    // interface provides a way to easily construct a set of 
    // key/value pairs representing form
    const formData = new FormData(document.querySelector('form'));
    
    let values = [] // empty array to stor data value from form input

    // formData.valus() returns iterator for form input values
    for (const value of formData.values()) {
        values.push(value); // pushing form values into empty array
      }

    const book = new Book(...values); // instance of the book
    
    // storing the book to local storage
    // title: {booke details}
    // using JSON.stringfy to cast return object to string
    localStorage.setItem(book.title, JSON.stringify(book.bookDetails))
    


    shelv.innerHTML += bookCardTemplate(...values);
}



function updateRead(checkId) {
    const bookName = checkId;
    // console.log(bookName);

    const book = localStorage.getItem(bookName); 
    console.log(book);

    book.read = book.read ? true : false;
}