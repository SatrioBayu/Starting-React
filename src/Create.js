import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Satrio Bayu");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setLoading(true);
    setTimeout(() => {
      fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(blog),
      }).then(() => {
        setLoading(false);
        history.push("/");
      });
    }, 1000);
  };

  return (
    <div className="create">
      <h2>Add new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Blog Body</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
        <label>Blog Author</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Satrio Bayu">Bayu</option>
          <option value="Fauziyah Afa">Afa</option>
        </select>
        {!loading && <button>Add Blog</button>}
        {loading && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
