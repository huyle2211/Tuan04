import React, { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUsers(data);
  //     });
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>User List</h2>
      {users.map((users) => (
        <div key={users.id}>
          <p>Name: {users.name}</p>
          <p>Email: {users.email}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default App