import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function App() {
  const [posts, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPost, setFilterPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPost(data);
      setFilterPost(data);
    }
    fetchPost();
  }, []);

  useEffect(() => {
    const result = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilterPost(result);
  }, [search, posts]);
  return (
    <div>
      <h2>Search Posts</h2>
      <input type="text" placeholder='Search title...' value={search} onChange={(e) => setSearch(e.target.value)} />
      {filteredPost.map((post) => (
        <div key={post.id}>
          <h4>Title: {post.title}</h4>
          <h4>Body: {post.body}</h4>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default App