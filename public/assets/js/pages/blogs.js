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
  const { data: allBlogs } = await fetchAllBlogs(filter);

  blogContainerEl.innerHTML = allBlogs
    .map((blog) => {
      return `
      <li id="${blog.blog_id}">
        <div>
            <div class="title-and-author-container">                
                    <h1>${blog.title}</h1>                
                <p>Author: ${blog.user_id}</p>
            </div>
            <p>Created: ${formatDate(blog.createdAt)}</p>
        </div>
        <p>${blog.content}</p>
    </li>
      `;
    })
    .join("");
}

renderAllBlogs();
