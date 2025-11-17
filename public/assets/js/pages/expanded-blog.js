import { formatDate } from "../helpers/formatDate.js";

const URL = "http://localhost:6969";
const params = new URLSearchParams(window.location.search);
const blogID = params.get("id");

async function fetchSingleBlog() {
  try {
    const res = await fetch(`${URL}/blogs/${blogID}`);

    if (!res.ok) {
      throw new Error("Failed to fetch resource");
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderSingleBlog(blog) {
  const blogView = {
    title: document.getElementById("title"),
    date: document.getElementById("date"),
    category: document.getElementById("category"),
    content: document.getElementById("content"),
    author: document.getElementById("author"),
  };

  blogView.title.textContent = blog.title;
  blogView.date.textContent = `Created: ${formatDate(blog.createdAt)}`;
  blogView.category.textContent = blog.category;
  blogView.content.textContent = blog.content;
  blogView.author.textContent = `Author: ${blog.User.name}`;
}

(async () => {
  const blogToRender = await fetchSingleBlog();

  renderSingleBlog(blogToRender);

  const backBtnEl = document.getElementById("back-btn");

  const previousPage = sessionStorage.getItem("previousPage");

  backBtnEl.href = previousPage || "/pages/blogs.html";
})();
