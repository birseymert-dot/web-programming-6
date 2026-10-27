# Post Dashboard

A Vite and React application that loads posts from JSONPlaceholder, supports title filtering, and shows loading, error, empty, and no-match states.

## File organization

- `src/api/postsApi.js` contains the Fetch API request and HTTP error handling.
- `src/reducer/postsReducer.js` defines the initial async state and the pure `FETCH_START`, `FETCH_SUCCESS`, and `FETCH_ERROR` transitions.
- `src/components/Post.jsx` displays one post using props.
- `src/components/PostList.jsx` renders posts with `.map()` and each post's stable `id` as its key.
- `src/components/FilterForm.jsx` provides the controlled title filter.
- `src/App.jsx` coordinates reducer state, fetches posts in `useEffect`, aborts the request during cleanup, and derives filtered posts during render.
- `src/main.jsx` mounts the app. `src/App.css` contains the page styles.
- `index.html`, `vite.config.js`, and `package.json` configure the Vite project.

## Run locally

```bash
npm install
npm run dev
```

## Challenges faced

- Keeping network work out of the reducer and render means the effect starts the request while the reducer only describes state transitions.
- Aborting the request in the effect cleanup prevents a finished or unmounted view from handling an obsolete request.
- The filter value is state, but the filtered post list is derived from the source posts on each render instead of being stored separately.
- Handling loading, request errors, an empty response, and a filter with no matches keeps each screen state explicit.

The project uses React hooks and the browser Fetch API without external data or UI libraries, Context, Redux, Zustand, Suspense, or custom hooks.
