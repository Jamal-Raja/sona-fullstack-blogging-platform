import { formatDate } from "../helpers/formatDate.js";

const URL = "http://localhost:6969";

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
      return `
      <li id="${blog.blog_id}">
        <div>
            <div class="title-container">
                <h1>${blog.title}</h1>
                <div class="blog-controls">
                  <p id="" class="control-btn edit-btn">Edit</p>
                  <p id="" class="control-btn delete-btn">Delete</p>
                </div>
            </div>
            <p>Created: ${formatDate(blog.createdAt)}</p>
        </div>
        <p>${blog.content}</p>
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
    })();

    return;
  }
  if (li && li.contains(e.target)) {
    // store previous page in session storage (to ensure back btn works properly)
    window.sessionStorage.setItem("previousPage", window.location.pathname);
    window.location.href = `/pages/expanded-blog.html?id=${blogID}`;
  }
});
