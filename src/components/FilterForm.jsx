export default function FilterForm({ filter, onFilterChange }) {
  return (
    <form className="filter-form" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="post-filter">Filter posts by title</label>
      <input
        id="post-filter"
        type="search"
        value={filter}
        onChange={(event) => onFilterChange(event.target.value)}
        placeholder="Start typing a title..."
      />
      {filter && (
  <button type="button" onClick={() => onFilterChange("")}>
    Clear filter
  </button>
)}
    </form>
  );
}
