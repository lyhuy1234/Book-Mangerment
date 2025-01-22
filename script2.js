let books = [];

function addBook() {
    const bookname = document.getElementById('bookname').value;
    const bookcode = document.getElementById('bookcode').value;
    const other = document.getElementById('other').value;
    const enterdate = document.getElementById('enterdate').value;

    const newBook = {
        id: Date.now(),
        name: bookname,
        code: bookcode,
        other: other,
        releaseDate: enterdate
    };

    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));

    document.getElementById('bookname').value = '';
    document.getElementById('bookcode').value = '';
    document.getElementById('other').value = '';
    document.getElementById('enterdate').value = '';

    readAll();
}

function readAll() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }

    const tableBody = document.getElementById('data-table');
    tableBody.innerHTML = '';  


    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td> <!-- Book Numbering -->
            <td>${book.name}</td>
            <td>${book.code}</td>
            <td>${book.other}</td>
            <td>${book.releaseDate}</td>
            <td>
                <button class="btn btn-info" onclick="viewDetails(${book.id})">View Details</button>
                <button class="btn btn-warning" onclick="editBook(${book.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteBook(${book.id})">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function viewDetails(bookId) {
    const book = books.find(b => b.id === bookId);

    if (book) {
        alert(`
            THIS BOOK DETAIL

            Book Name: ${book.name}

            Code: ${book.code}

            Other: ${book.other}

            Release Date: ${book.releaseDate}
        `);
    }
}

function editBook(bookId) {
    const book = books.find(b => b.id === bookId);

    if (book) {
        document.getElementById('bookname').value = book.name;
        document.getElementById('bookcode').value = book.code;
        document.getElementById('other').value = book.other;
        document.getElementById('enterdate').value = book.releaseDate;

        const addButton = document.getElementById('add-book');
        addButton.textContent = 'Update Book';
        addButton.onclick = function() {
            updateBook(bookId);
        };
    }
}

function updateBook(bookId) {
    const bookname = document.getElementById('bookname').value;
    const bookcode = document.getElementById('bookcode').value;
    const other = document.getElementById('other').value;
    const enterdate = document.getElementById('enterdate').value;

    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex] = {
            id: bookId,
            name: bookname,
            code: bookcode,
            other: other,
            releaseDate: enterdate
        };

        localStorage.setItem('books', JSON.stringify(books));


        document.getElementById('add-book').textContent = 'Add Book';
        document.getElementById('bookname').value = '';
        document.getElementById('bookcode').value = '';
        document.getElementById('other').value = '';
        document.getElementById('enterdate').value = '';

        readAll();
    }
}

function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(books));

    readAll();
}

window.onload = function() {
    readAll();
};