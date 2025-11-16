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

  console.log("VALUES: ", values);

  createNewBlog(values);
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
  console.log(data);
}
