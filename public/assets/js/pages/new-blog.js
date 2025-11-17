const URL = "http://localhost:6969";

const newBlogFormEl = document.getElementById("newBlogForm");

newBlogFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const values = {
    title: newBlogFormEl.title.value,
    category: newBlogFormEl.category.value,
    content: newBlogFormEl.content.value,
    user_id: localStorage.getItem("user_id"),
  };

  createNewBlog(values);

  window.location.href = "/pages/account.html";
});

async function createNewBlog(blog) {
  const res = await fetch(`${URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(blog),
  });

  const data = await res.json();
}
