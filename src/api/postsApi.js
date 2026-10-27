const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts(signal) {
  const response = await fetch(POSTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load posts (HTTP ${response.status}).`);
  }

 const posts = await response.json();

if (!Array.isArray(posts)) {
  throw new Error("The posts API returned an invalid response.");
}

return posts;
}
