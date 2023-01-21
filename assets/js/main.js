// select UI
let form = document.querySelector('#book-form');
let bookList = document.querySelector('.show-book-list');


// book class
class Book {
    constructor(name, writer, code) {
        this.title = name;
        this.author = writer;
        this.isbn = code;
    }
}
// UI class
class UI {
    static setBooks(list) {
        let tbody = document.querySelector('.show-book-list');
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <th>${list.title}</th>
        <td>${list.author}</td>
        <td>${list.isbn}</td>
        <td><a href='#' class='remove'>x</a></td>
        `;
        tbody.appendChild(tr);
    }
    // clear value after submit 
    static clearForm() {
        let title = document.querySelector('#title').value = '';
        let author = document.querySelector('#author').value = '';
        let isbn = document.querySelector('#isbn').value = '';
    }
    static showAlert(msg, cls) {
        let flashMsg = document.querySelector('#flash-msg');
        let div = document.createElement('div');
        div.className = `alert ${cls}`;
        div.innerHTML = msg;
        flashMsg.appendChild(div);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }
    static bookRemove(r) {
        if (r.hasAttribute('href')) {
            r.parentElement.parentElement.remove();
            store.removeBooks(r.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert('Book remove successfully', 'success');
        }
    }
}

// create local storage class
class store {
    static getBooksData() {
        let data;
        if (localStorage.getItem('data') === null) {
            data = [];
        }
        else {
            data = JSON.parse(localStorage.getItem('data'));
        }
        return data;
    }
    static addBooksData(b) {
        let addData = store.getBooksData();
        addData.push(b);
        localStorage.setItem('data', JSON.stringify(addData));
    }
    static showBook(){
        let showData = store.getBooksData();
        showData.forEach(item=>{
            UI.setBooks(item);
        })
    }
    static removeBooks(code){
        // console.log(a);
        let removeData = store.getBooksData();
        removeData.forEach((value,index)=>{
            if(value.isbn == code){
                removeData.splice(index, 1);
            }
        })
        localStorage.setItem('data',JSON.stringify(removeData))
    }
}

// add even listener
form.addEventListener('submit', addBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', store.showBook());

// add function
function addBook(b) {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    // form validation
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill all the field', 'error');
    }
    else {
        // create object
        let books = new Book(title, author, isbn);
        // console.log(books);
        UI.setBooks(books);
        UI.showAlert('Your book successfully added', 'success');
        UI.clearForm();
        store.addBooksData(books);
    }
    b.preventDefault();
}

function removeBook(rb) {
    UI.bookRemove(rb.target);
    rb.preventDefault();
}