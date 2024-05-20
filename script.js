document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("book-form");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const yearInput = document.getElementById("year");
  const isCompleteCheckbox = document.getElementById("isComplete");
  const unfinishedBooksList = document.getElementById("unfinished-books");
  const finishedBooksList = document.getElementById("finished-books");

  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Function to render books
  function renderBooks() {
    const booksList = [unfinishedBooksList, finishedBooksList].map(
      (list) => (list.innerHTML = "")
    );
    books.forEach((book) => {
      const bookElement = document.createElement("li");
      bookElement.innerHTML = `<strong>${book.title}</strong> oleh ${book.author} (${book.year})`;
      const buttons = [
        createButton("Pindahkan", () => moveBook(book.id)),
        createButton("Hapus", () => deleteBook(book.id)),
      ].map((button) => bookElement.appendChild(button));
      (book.isComplete ? finishedBooksList : unfinishedBooksList).appendChild(
        bookElement
      );
    });
  }

  // Function to create a button
  function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  // Function untuk menambahkan buku
  function addBook(title, author, year, isComplete) {
    const newBook = {
      id: +new Date(),
      title,
      author,
      year: parseInt(year),
      isComplete,
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
    bookForm.reset();
  }

  // Function untuk memindahkan buku
  function moveBook(bookId) {
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      books[index].isComplete = !books[index].isComplete;
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    }
  }

  // Function untuk menghapus buku
  function deleteBook(bookId) {
    books = books.filter((book) => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  }

  // Event listener untuk submit
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const year = yearInput.value.trim();
    const isComplete = isCompleteCheckbox.checked;
    if (title && author && year) {
      addBook(title, author, year, isComplete);
    } else {
      alert("Mohon isi semua kolom");
    }
  });

  // Initial rendering of books
  renderBooks();
});
