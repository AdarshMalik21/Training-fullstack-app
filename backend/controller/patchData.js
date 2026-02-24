// import fs from 'fs'

// export default function patch(req, res) {
//   const id = parseInt(req.params.id);
//   const updates = req.body;

//   fs.readFile("./data.txt", "utf-8", (err, data) => {
//     let todos = [];

//     if (!err && data) {
//       try {
//         const parsed = JSON.parse(data);
//         todos = Array.isArray(parsed) ? parsed : [];
//       } catch (parseErr) {
//         todos = [];
//       }
//     }

//     const todoIndex = todos.findIndex((todo) => todo.id === id);

//     if (todoIndex === -1) {
//       res.status(404).json({ error: "Todo not found" });
//       return;
//     }

//     const updatedTodo = { ...todos[todoIndex], ...updates };
//     todos[todoIndex] = updatedTodo;

//     fs.writeFile("./data.txt", JSON.stringify(todos), (writeErr) => {
//       if (writeErr) {
//         res.status(500).json({ error: "Failed to update todo" });
//         return;
//       }
//       res.json({ message: "Todo updated", data: updatedTodo });
//     });
//   });
// }

import { Todo } from "../Models/todo.models.js";

export default async function patch(req, res) {
  try {
    const id = req.params.id;
    const { isCompleted } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: { isCompleted: isCompleted } },
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo updated successfully", data: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the data..." });
  }
}
