import { useEffect, useState } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {

    const fetchTodos = async () => {
      try {

        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const data = await res.json();
        setTodos(data);

      } catch (err) {

        setError("Failed to fetch todos");

      } finally {

        setLoading(false);

      }
    };

    fetchTodos();

  }, []);

  const handleAddTodo = async (e) => {

    e.preventDefault();

    if (!newTodo.trim()) return;

    try {

      setSubmitting(true);

      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false
        })
      });

      const data = await res.json();

      setTodos([data, ...todos]);
      setNewTodo("");

    } catch (err) {

      setError("Failed to add todo");

    } finally {

      setSubmitting(false);

    }

  };

  const handleDelete = async (id) => {

    try {

      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.id !== id));

    } catch {

      setError("Delete failed");

    }

  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>

      <h2>Todo CRUD</h2>

      <form onSubmit={handleAddTodo}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add todo"
        />

        <button disabled={submitting}>
          {submitting ? "Adding..." : "Add"}
        </button>
      </form>

      {todos.map(todo => (
        <div key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default App;