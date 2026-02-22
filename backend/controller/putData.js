import fs from 'fs';


export default function put(req, res) {


  const index = parseInt(req.params.index); // Get index from URL parameter

  fs.readFile("./data.txt", "utf-8", (err, data) => {
    let todos = [];

    if (!err && data) {
      try {
        const parsed = JSON.parse(data);
        todos = Array.isArray(parsed) ? parsed : [];
      } catch (parseErr) {
        todos = [];
      }
    }

    // Check if index is valid
    if (index < 0 || index >= todos.length) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    // Toggle the isCompleted status
    todos[index].isCompleted = !todos[index].isCompleted;

    // Save updated todos back to file
    fs.writeFile("./data.txt", JSON.stringify(todos), (writeErr) => {
      if (writeErr) {
        res.status(500).json({ error: "Failed to update todo" });
        return;
      }
      res.json({ message: "Todo updated", data: todos[index] });
    });
  });
}
