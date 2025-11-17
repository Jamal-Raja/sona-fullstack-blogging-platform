import { formatDate } from "../helpers/formatDate.js";

const URL = "";
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

  const categoryClass = blog.category.toLowerCase();

  document.getElementById("expanded-blog-container").innerHTML = `
  <a id="back-btn" href="">BACK</a>

  <h1 id="title" class="expanded-title">${blog.title}</h1>

  <p id="meta" class="expanded-meta">
    ${formatDate(blog.createdAt)} - ${blog.User.name}
  </p>

  <span id="category" class="blog-category category-${categoryClass}">
    ${blog.category}
  </span>

  <p id="content" class="expanded-content">
    ${blog.content}
  </p>
`;
}

(async () => {
  const blogToRender = await fetchSingleBlog();

  renderSingleBlog(blogToRender);

  const backBtnEl = document.getElementById("back-btn");

  const previousPage = sessionStorage.getItem("previousPage");

  backBtnEl.href = previousPage || "/pages/blogs.html";
})();
