document.addEventListener('DOMContentLoaded', function(){

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
  
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        searchInput.focus();
      });
    }
  
    searchClose.addEventListener('click', function() {
      searchBar.style.visibility = 'hidden';
      searchBar.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    });
  
  
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
  
    // Handle form submission to create a new post
    postForm.addEventListener('submit', event => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(postForm); // Get form data
        const title = formData.get('title'); // Get post title
        const content = formData.get('content'); // Get post content
  
        // Send post data to the server using fetch API
        fetch('/posts', {
            method: 'POST', // HTTP POST method for creating new post
            headers: {
                'Content-Type': 'application/json' // Specify JSON content type
            },
            body: JSON.stringify({ title, content }) // Convert post data to JSON format
        })
        .then(response => response.json()) // Parse server response as JSON
        .then(newPost => {
            console.log('New post created:', newPost);
            // Optionally, you can redirect user to a different page or show a success message
            window.location.href = '/'; // Redirect to homepage
        })
        .catch(error => {
            console.error('Error creating new post:', error);
            alert('An error occurred while creating the new post. Please try again later.');
        });
    });
  });

  const postsContainer = document.getElementById('posts-container');

  // Function to fetch and display posts
  const fetchAndDisplayPosts = async () => {
      const response = await fetch('/api/posts');
      const posts = await response.json();
      postsContainer.innerHTML = '';
      posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.innerHTML = `
              <h2>${post.title}</h2>
              <p>${post.content}</p>
              <button onclick="deletePost('${post._id}')">Delete</button>
          `;
          postsContainer.appendChild(postElement);
      });
  };

  // Function to add a new post
  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      await fetch('/api/posts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, content })
      });
      fetchAndDisplayPosts();
      form.reset();
  });

  // Function to delete a post
  window.deletePost = async (postId) => {
      await fetch(`/api/posts/${postId}`, {
          method: 'DELETE'
      });
      fetchAndDisplayPosts();
  };

  // Initial fetch and display of posts
  fetchAndDisplayPosts();
  