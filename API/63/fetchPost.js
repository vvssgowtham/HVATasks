const fetchPosts = async () => {
     try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                  method: "GET",
                  headers: {
                         "Content-Type": "application/json"
                  }
            });
            const results = await response.json();
            return results
     } catch (error) {
          return error;
     }
}

fetchPosts().then((posts) => {
     const postsContainer = document.getElementById("posts");
     posts.forEach(post => {
         const div = document.createElement("div");
         div.innerHTML = `
             <h3>${post.title}</h3>
             <p><strong>User ID:</strong> ${post.userId}</p>
             <p><strong>Post ID:</strong> ${post.id}</p>
             <p>${post.body}</p>
             <hr>
         `;
         postsContainer.appendChild(div);
     });
 }).catch(error => {
     console.log("Error:", error);
 });