import { showFailedMessage } from "../helpers/showFailureMsg.js";

const URL = "";

const newBlogFormEl = document.getElementById("newBlogForm");

newBlogFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const values = {
    title: newBlogFormEl.title.value,
    category: newBlogFormEl.category.value,
    content: newBlogFormEl.content.value,
    user_id: localStorage.getItem("user_id"),
  };

  const { status, message } = await createNewBlog(values);

  if (status == "Error") {
    showFailedMessage(message);
    return;
  }

  sessionStorage.setItem("blogCreated", "true");
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
  return data;
}
