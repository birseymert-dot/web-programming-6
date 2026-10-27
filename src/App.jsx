import { useEffect, useReducer, useState } from "react";
import { fetchPosts } from "./api/postsApi.js";
import FilterForm from "./components/FilterForm.jsx";
import PostList from "./components/PostList.jsx";
import { initialPostsState, postsReducer } from "./reducer/postsReducer.js";

export default function App() {
  const [postsState, dispatch] = useReducer(postsReducer, initialPostsState);
  const [filter, setFilter] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: "FETCH_START" });

      try {
        const posts = await fetchPosts(controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: posts });
      } catch (error) {
        if (!controller.signal.aborted) {
          dispatch({
            type: "FETCH_ERROR",
            payload: error instanceof Error ? error.message : "Something went wrong.",
          });
        }
      }
    }

    loadPosts();
    return () => controller.abort();
  },[retryCount]);

  const normalizedFilter = filter.trim().toLowerCase();
  const hasLoadedPosts = postsState.posts !== initialPostsState.posts;
  const filteredPosts = postsState.posts.filter((post) =>
    post.title.toLowerCase().includes(normalizedFilter),
  );

  return (
    <main className="dashboard" aria-busy={postsState.loading}>
      <header className="page-header">
        <p className="eyebrow">CONTENT OVERVIEW</p>
        <h1>Post Dashboard</h1>
        <p className="intro">Browse and filter posts loaded from the demo API.</p>
      </header>

      <FilterForm filter={filter} onFilterChange={setFilter} />

      {(postsState.loading || (!hasLoadedPosts && !postsState.error)) && (
        <p className="status" role="status">Loading posts...</p>
      )}
       {!postsState.loading && postsState.error && (
     <p className="status error" role="alert">
       Could not load posts: {postsState.error}
     </p>
      )}
      {!postsState.loading && !postsState.error && hasLoadedPosts && postsState.posts.length === 0 && (
        <p className="status" role="status">No posts found.</p>
      )}
      {!postsState.loading && !postsState.error && postsState.posts.length > 0 &&
        filteredPosts.length === 0 && (
          <p className="status" role="status">No posts match your filter.</p>
        )}
      {!postsState.loading && !postsState.error && filteredPosts.length > 0 && (
        <>
          <p className="result-count" aria-live="polite">
            Showing {filteredPosts.length} of {postsState.posts.length} posts
          </p>
          <PostList posts={filteredPosts} />
        </>
      )}
    </main>
  );
}
