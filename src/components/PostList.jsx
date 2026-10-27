import Post from "./Post.jsx";

export default function PostList({ posts }) {
  return (
    <section className="post-list" aria-label="Posts">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} body={post.body} />
      ))}
    </section>
  );
}
