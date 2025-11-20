import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "./todos.json";

function loadTodos() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(FILE));
}

function saveTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});


app.get("/todos", (req, res) => {
  const todos = loadTodos();
  res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a non-empty string" });
  }

  const todos = loadTodos();
  const newTodo = {
    id: Date.now(),
    title,
    completed: completed === true ? true : false,
  };

  todos.push(newTodo);
  saveTodos(todos);

  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (title !== undefined) {
    if (typeof title !== "string") {
      return res.status(400).json({ error: "Title must be a string" });
    }
    todo.title = title;
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Completed must be a boolean" });
    }
    todo.completed = completed;
  }

  saveTodos(todos);
  res.status(200).json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todos = loadTodos();
  const newTodos = todos.filter((t) => t.id !== id);

  if (newTodos.length === todos.length) {
    return res.status(404).json({ error: "Todo not found" });
  }

  saveTodos(newTodos);
  res.status(200).json({ message: "Todo deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
