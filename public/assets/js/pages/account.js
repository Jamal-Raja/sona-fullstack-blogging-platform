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
