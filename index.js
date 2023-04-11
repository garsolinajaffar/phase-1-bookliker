document.addEventListener("DOMContentLoaded", function() {
    const booksUrl = "http://localhost:3000/books"
    const bookList = document.querySelector('#list')
    const showPanel = document.querySelector('#show-panel')
  
    // fetch and render all books
    fetch(booksUrl)
      .then(resp => resp.json())
      .then(books => books.forEach(renderBook))
  
    function renderBook(book) {
      const bookItem = document.createElement('li')
      bookItem.innerText = book.title
      bookItem.addEventListener('click', () => showBookDetails(book))
      bookList.appendChild(bookItem)
    }
  
    function showBookDetails(book) {
      showPanel.innerHTML = ""
      const bookTitle = document.createElement('h2')
      bookTitle.innerText = book.title
  
      const bookImg = document.createElement('img')
      bookImg.src = book.img_url
  
      const bookDescription = document.createElement('p')
      bookDescription.innerText = book.description
  
      const likeButton = document.createElement('button')
      likeButton.innerText = "Like"
      likeButton.addEventListener('click', () => likeBook(book))
  
      const likedBy = document.createElement('ul')
      book.users.forEach(user => {
        const likedByUser = document.createElement('li')
        likedByUser.innerText = user.username
        likedBy.appendChild(likedByUser)
      })
  
      showPanel.append(bookTitle, bookImg, bookDescription, likeButton, likedBy)
    }
  
    function likeBook(book) {
      if (book.users.some(user => user.id === 1)) {
        alert("You've already liked this book!")
      } else {
        const users = [...book.users, {"id":1, "username":"pouros"}]
        const configObject = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ users })
        }
  
        fetch(`${booksUrl}/${book.id}`, configObject)
          .then(resp => resp.json())
          .then(updatedBook => showBookDetails(updatedBook))
      }
    }
  })
  