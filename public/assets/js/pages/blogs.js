import { formatDate } from "../helpers/formatDate.js";

const URL = "http://localhost:6969";

async function fetchAllBlogs(filter = null) {
  try {
    const res = filter
      ? await fetch(`${URL}/blogs?filter=${filter}`)
      : await fetch(`${URL}/blogs`);

    if (!res.ok) {
      throw new Error("Failed to fetch resource");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function renderAllBlogs(filter = null) {
  const blogContainerEl = document.getElementById("blogsUl");

  if (!blogContainerEl) return;

  const { data: allBlogs } = await fetchAllBlogs(filter);

  blogContainerEl.innerHTML = allBlogs
    .map((blog) => {
      const cat = blog.category.toLowerCase();

      return `
      <li class="blog-card fancy-card" id="${blog.blog_id}">
        
        <div class="blog-card-top">
          <span class="blog-category category-${cat}">
            ${blog.category}
          </span>
        </div>

        <h2 class="blog-title">${blog.title}</h2>

        <p class="blog-meta">
          ${formatDate(blog.createdAt)} — ${blog.User.name}
        </p>

        <p class="blog-excerpt">${blog.content}</p>

      </li>
    `;
    })
    .join("");
}

renderAllBlogs();

// ========== BLOG FILTER BUTTONS ==========
// Load all blogs or filtered blogs when filter buttons are clicked
document.querySelector(".blogs-header") &&
  document.querySelector(".blogs-header").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const filter = btn.dataset.filter;
    if (!filter) {
      renderAllBlogs();
    }

    renderAllBlogs(filter);
  });

// Handle blog expansion
const blogsUlEl = document.getElementById("blogsUl");
blogsUlEl.addEventListener("click", (e) => {
  const li = e.target.closest("li");

  if (!li || !blogsUlEl.contains(li)) return;

  const blogID = li.id;

  if (li && li.contains(e.target)) {
    window.sessionStorage.setItem("previousPage", window.location.pathname);
    window.location.href = `/pages/expanded-blog.html?id=${blogID}`;
  }
});
