const URL = "http://localhost:6969";
const urlParams = new URLSearchParams(window.location.search);
const blogID = urlParams.get("id");

async function loadBlogDetails() {
  const res = await fetch(`${URL}/blogs/${blogID}`);

  const { data: blog } = await res.json();

  // Fill the form
  document.getElementById("title").value = blog.title;
  document.getElementById("category").value = blog.category;
  document.getElementById("content").value = blog.content;
}

async function updatedlog(blog) {
  const res = await fetch(`${URL}/blogs/${blogID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(blog),
  });

  const data = await res.json();

  console.log(data);
}

const updateFormEl = document.getElementById("updateBlogForm");

updateFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const updatedBlog = {
    category: updateFormEl.category.value,
    title: updateFormEl.title.value,
    content: updateFormEl.content.value,
  };

  updatedlog(updatedBlog);
  sessionStorage.setItem("blogUpdated", "true");
  window.location.href = "/pages/account.html";
});

addEventListener("DOMContentLoaded", loadBlogDetails());
