import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function App() {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const fetchUsers = async () => {
      if (userId < 1 || userId > 10) {
        setError("User not found");
        setUsers(null);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        setUsers(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [userId]);
  return (
    <div>
      <h2>Dynamic Fetch</h2>
      <input type="number" placeholder='Nhập userId (1-10)' value={userId} onChange={(e) => setUserId(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users && (
        <div>
          <p>Name: {users.name}</p>
          <p>Phone: {users.phone}</p>
          <p>Website: {users.website}</p>
        </div>
      )}
    </div >
  )
}

export default App