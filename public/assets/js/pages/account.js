import { formatDate } from "../helpers/formatDate.js";
import { showSuccessMessage } from "../helpers/showSuccessMsg.js";

const URL = "";

async function fetchUsersBlogs() {
  try {
    const res = await fetch(`${URL}/users/${localStorage.getItem("user_id")}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch resource");
    }
    const { data: usersBlogs } = await res.json();

    return usersBlogs;
  } catch (error) {
    console.error(error);
  }
}

async function deleteBlog(blog_id) {
  try {
    const res = await fetch(`${URL}/blogs/${blog_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch resource");
    }
  } catch (error) {
    console.error(error);
  }
}

async function renderUsersBlogs() {
  const blogContainerEl = document.getElementById("UsersblogsUl");

  if (!blogContainerEl) return;

  const allBlogs = await fetchUsersBlogs();

  blogContainerEl.innerHTML = allBlogs
    .map((blog) => {
      const cat = blog.category.toLowerCase();

      return `
      <li class="account-blog-card" id="${blog.blog_id}">

        <div class="blog-card-top">
          <span class="blog-category category-${cat}">
            ${blog.category}
          </span>
        </div>

        <h2 class="account-blog-title">${blog.title}</h2>

        <p class="account-blog-meta">
          ${formatDate(blog.createdAt)} — ${blog.User.name}
        </p>

        <p class="account-blog-excerpt">${blog.content}</p>

        <div class="account-blog-controls">
          <button class="control-btn edit-btn">Edit</button>
          <button class="control-btn delete-btn">Delete</button>
        </div>

      </li>
    `;
    })
    .join("");
}

renderUsersBlogs();

const blogsUlEl = document.getElementById("UsersblogsUl");
blogsUlEl.addEventListener("click", (e) => {
  const li = e.target.closest("li");

  if (!li || !blogsUlEl.contains(li)) return;

  const blogID = li.id;

  if (e.target.matches(".edit-btn")) {
    window.location.href = `/pages/update-blog.html?id=${blogID}`;
    return;
  }
  if (e.target.matches(".delete-btn")) {
    deleteBlog(blogID);
    (async () => {
      await renderUsersBlogs();
      showSuccessMessage("Your blog has been deelted successfully!");
    })();

    return;
  }
  if (li && li.contains(e.target)) {
    // store previous page in session storage (to ensure back btn works properly)
    window.sessionStorage.setItem("previousPage", window.location.pathname);
    window.location.href = `/pages/expanded-blog.html?id=${blogID}`;
  }
});

// ========== SHOW SUCCESS MESSAGE IF BLOG CREATED ==========
(() => {
  const blogCreated = sessionStorage.getItem("blogCreated");
  const blogUpdated = sessionStorage.getItem("blogUpdated");

  if (blogCreated) {
    showSuccessMessage("Your blog has been published successfully!");
    sessionStorage.removeItem("blogCreated");
  }

  if (blogUpdated) {
    showSuccessMessage("Your blog has been updated successfully!");
    sessionStorage.removeItem("blogUpdated");
  }
})();
