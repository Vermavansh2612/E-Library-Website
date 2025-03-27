

 const booksData = [
      { 
        id: 1, 
        title: "Living in the Light: A Guide to Personal Transformation", 
        author: "Shakti Gawain", 
        category: "Self-Improvement", 
        cover: "assets/book-1.jpg", 
        pdfUrl: "pdf/book-1.pdf", 
        popularity: 85,
        published: "1986-01-01"
      },
      { 
        id: 2, 
        title: "Data Analysis with Python", 
        author: "Peter Morgans", 
        category: "Technology", 
        cover: "assets/book-2.jpeg", 
        pdfUrl: "pdf/book-2.pdf", 
        popularity: 90,
        published: "2020-05-15"
      },
      { 
        id: 3, 
        title: "The Girl with the Dragon Tattoos", 
        author: "Stieg Larson", 
        category: "Fiction", 
        cover: "assets/book-3.jpg", 
        pdfUrl: "pdf/book-3.pdf", 
        popularity: 85,
        published: "2005-08-27"
      },
      { 
        id: 4, 
        title: "Resisting Happiness", 
        author: "Matthew Kelly", 
        category: "Self-Improvement", 
        cover: "assets/book-4.png",
        pdfUrl: "pdf/book-4.pdf",
        popularity: 88,
        published: "2006-03-15"
      },
      { 
        id: 5, 
        title: "The Secret Science of Numerology: The Hidden Meaning of Numbers and Letters", 
        author: "Shirley Blackwell Lawrence", 
        category: "Numerology", 
        cover: "assets/book-5.jpg", 
        pdfUrl: "pdf/book-5.pdf", 
        popularity: 80,
        published: "1999-07-01"
      },
      { 
        id: 6, 
        title: "Handbook of Medicinal Herbs", 
        author: "James A. Duke", 
        category: "Health & Fitness", 
        cover: "assets/book-6.jpg", 
        pdfUrl: "pdf/book-6.pdf", 
        popularity: 82,
        published: "2004-09-10"
      },
      { 
        id: 7, 
        title: "Five Point Someone", 
        author: "Chetan Bhagat", 
        category: "Fiction", 
        cover: "assets/book-7.jpg", 
        pdfUrl: "pdf/book-7.pdf", 
        popularity: 82,
        published: "2004-06-01"
      },
      { 
        id: 8, 
        title: "Data Structures in Java", 
        author: "John R. Hubbard", 
        category: "Technology", 
        cover: "assets/book-8.jpg", 
        pdfUrl: "pdf/book-8.pdf", 
        popularity: 82,
        published: "2010-09-15"
      },
      { 
        id: 9, 
        title: "Genius Foods: Become Smarter, Happier, and More Productive While Protecting Your Brain for Life", 
        author: "Max Lugavere", 
        category: "Health & Fitness", 
        cover: "assets/book-9.jpg", 
        pdfUrl: "pdf/book-9.pdf", 
        popularity: 82,
        published: "2018-06-01"
      },
    ];
    
    // Initially, show all books
    let filteredBooks = [...booksData];
    const bookListContainer = document.getElementById('book-list');
    const searchInputEl = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // Function to display books with "Read Book" functionality (opens in new tab)
    function displayBooks(books) {
      bookListContainer.innerHTML = "";
      if (books.length === 0) {
        bookListContainer.innerHTML = "<p style='text-align:center;'>No books found.</p>";
        return;
      }
      books.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-item";
        bookItem.innerHTML = `
          <img src="${book.cover}" alt="Cover of '${book.title}'" class="book-image"/>
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <p class="book-published">Published: ${book.published}</p>
          <a href="${book.pdfUrl}" target="_blank" class="read-button">Read Book</a>
        `;
        bookListContainer.appendChild(bookItem);
      });
    }
    
    // Filter books by search query and selected category
    function filterBooks() {
      const query = searchInputEl.value.trim().toLowerCase();
      let selectedCategory = "All";
      const activeDesktop = document.querySelector(".dropdown-menu .dropdown-item.active");
      const activeMobile = document.querySelector(".mobile-dropdown-menu .mobile-dropdown-item.active");
      if (activeDesktop) {
        selectedCategory = activeDesktop.textContent;
      } else if (activeMobile) {
        selectedCategory = activeMobile.textContent;
      }
      filteredBooks = booksData.filter(book => {
        const matchesQuery = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
        const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
        return matchesQuery && matchesCategory;
      });
      displayBooks(filteredBooks);
    }
    
    // Search event listeners
    searchButton.addEventListener("click", filterBooks);
    searchInputEl.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        filterBooks();
      }
    });
    
    // Desktop navigation functionality
    document.querySelectorAll(".desktop-nav .nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const action = link.getAttribute("data-action");
        if (action === "home") {
          filteredBooks = [...booksData];
        } else if (action === "popular") {
          filteredBooks = [...booksData].sort((a, b) => b.popularity - a.popularity);
        } else if (action === "latest") {
          filteredBooks = [...booksData].sort((a, b) => new Date(b.published) - new Date(a.published));
        } else if (action === "contact") {
          alert("Contact us at vermavansh2612@gmail.com");
          return;
        }
        displayBooks(filteredBooks);
      });
    });
    
    // Mobile navigation functionality
    document.querySelectorAll(".mobile-menu .mobile-nav-link, .mobile-menu button").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const action = link.getAttribute("data-action");
        if (action === "home") {
          filteredBooks = [...booksData];
        } else if (action === "popular") {
          filteredBooks = [...booksData].sort((a, b) => b.popularity - a.popularity);
        } else if (action === "latest") {
          filteredBooks = [...booksData].sort((a, b) => new Date(b.published) - new Date(a.published));
        } else if (action === "contact") {
          alert("Contact us at vermavansh2612@gmail.com");
          return;
        }
        displayBooks(filteredBooks);
        mobileMenu.style.display = "none";
      });
    });
    
    // Desktop Category Dropdown Toggle
    const categoriesToggle = document.getElementById("categories-toggle");
    const categoriesMenu = document.getElementById("categories-menu");
    categoriesToggle.addEventListener("click", () => {
      categoriesMenu.style.display = categoriesMenu.style.display === "block" ? "none" : "block";
    });
    
    // Desktop Dropdown Category Selection
    document.querySelectorAll(".dropdown-menu .dropdown-item").forEach(item => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".dropdown-menu .dropdown-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        categoriesMenu.style.display = "none";
        filterBooks();
      });
    });
    
    // Mobile Dropdown Category Selection
    document.querySelectorAll(".mobile-dropdown-menu .mobile-dropdown-item").forEach(item => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".mobile-dropdown-menu .mobile-dropdown-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        filterBooks();
        mobileCategoriesMenu.style.display = "none";
      });
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    menuToggle.addEventListener("click", () => {
      mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
    });
    
    // Mobile Category Dropdown Toggle
    const mobileCategoriesToggle = document.getElementById("mobile-categories-toggle");
    const mobileCategoriesMenu = document.getElementById("mobile-categories-menu");
    mobileCategoriesToggle.addEventListener("click", () => {
      mobileCategoriesMenu.style.display = mobileCategoriesMenu.style.display === "block" ? "none" : "block";
    });
    
    // Initially display all books
    displayBooks(booksData);
