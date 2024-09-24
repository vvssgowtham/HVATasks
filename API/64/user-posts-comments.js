const apiCall = async (userID) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const fetchComments = async (postID) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

const buttonClicked = async () => {
  const userID = document.getElementById("userid").value;

  if (!userID) {
    alert("Please enter a valid User ID.");
    return;
  }

  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  //Fetching posts by userID
  const posts = await apiCall(userID);

  posts.forEach(async (post) => {
    const postDiv = document.createElement("div");
    console.log(post);
    postDiv.innerHTML = `
         <h2>${post.title}</h2>
         <p><strong>Post ID:</strong> ${post.id}</p>
         <p>${post.body}</p>
         <h3>Comments:</h3>
         <div id="comments-${post.id}">Loading comments...</div>
         <hr>
     `;
    postsContainer.appendChild(postDiv);

    // fetching and displaying comments for each post

    const comments = await fetchComments(post.id);
    console.log(comments);
    const commentsDiv = document.getElementById(`comments-${post.id}`);
    if (comments.length > 0) {
      commentsDiv.innerHTML = comments
        .map(
          (comment) => `
                <p><strong>${comment.name}:</strong> ${comment.body}</p>
            `
        )
        .join("");
    } else {
      commentsDiv.innerHTML = "<p>No comments available for this post.</p>";
    }
  });
};

document.querySelector("button").addEventListener("click", buttonClicked);
